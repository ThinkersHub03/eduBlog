'use client'

import Link from "next/link"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, FileText, Loader2, Upload, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PAST_PAPERS_BUCKET, buildPastPaperStoragePath } from "@/lib/pastpapers"
import { toast } from "@/lib/toast"

export default function CreatePastPaperPage() {
    const supabase = createClient()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [subject, setSubject] = useState('')
    const [year, setYear] = useState('')
    const [board, setBoard] = useState('')
    const [classLevel, setClassLevel] = useState('')
    const [examShift, setExamShift] = useState('morning')
    const [isSolved, setIsSolved] = useState(false)
    const [file, setFile] = useState<File | null>(null)
    const [loading, setLoading] = useState(false)

    const ensureAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return false
        const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
        return profile?.role === 'admin'
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const parsedYear = Number(year)
        if (!subject.trim() || !board.trim() || !classLevel.trim() || !examShift.trim() || !Number.isInteger(parsedYear)) {
            toast.error('Please fill all fields correctly.')
            return
        }
        if (!file) {
            toast.error('Please select a PDF file.')
            return
        }
        if (file.type !== 'application/pdf') {
            toast.error('Only PDF files are allowed.')
            return
        }

        setLoading(true)

        try {
            const admin = await ensureAdmin()
            if (!admin) {
                toast.error('You are not allowed to perform this action.')
                setLoading(false)
                return
            }

            const storagePath = buildPastPaperStoragePath({
                board,
                classLevel,
                year: parsedYear,
                originalFileName: file.name,
            })

            const { error: uploadError } = await supabase.storage
                .from(PAST_PAPERS_BUCKET)
                .upload(storagePath, file, {
                    contentType: 'application/pdf',
                    upsert: false,
                })

            if (uploadError) {
                toast.error(`Upload failed: ${uploadError.message}`)
                setLoading(false)
                return
            }

            const { data: urlData } = supabase.storage.from(PAST_PAPERS_BUCKET).getPublicUrl(storagePath)

            const { error: insertError } = await supabase.from('past_papers').insert({
                subject: subject.trim(),
                year: parsedYear,
                board: board.trim(),
                class_level: classLevel.trim(),
                exam_shift: examShift.trim(),
                is_solved: isSolved,
                file_url: urlData.publicUrl,
            })

            if (insertError) {
                await supabase.storage.from(PAST_PAPERS_BUCKET).remove([storagePath])
                toast.error(`Database insert failed: ${insertError.message}`)
                setLoading(false)
                return
            }

            toast.success('Past paper created successfully.')
            router.push('/admin/pastpapers')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error('An unexpected error occurred.')
            setLoading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto py-6 space-y-6">
            <Link href="/admin/pastpapers" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600">
                <ArrowLeft className="h-4 w-4" />
                Back to Past Papers
            </Link>

            <Card className="rounded-3xl">
                <CardHeader>
                    <CardTitle>Create Past Paper</CardTitle>
                    <CardDescription>Upload PDF first, then insert past_papers row.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold">Subject</label>
                                <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="year" className="text-sm font-semibold">Year</label>
                                <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} inputMode="numeric" required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="board" className="text-sm font-semibold">Board</label>
                                <Input id="board" value={board} onChange={(e) => setBoard(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="class_level" className="text-sm font-semibold">Class Level</label>
                                <Input id="class_level" value={classLevel} onChange={(e) => setClassLevel(e.target.value)} required />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="exam_shift" className="text-sm font-semibold">Exam Shift</label>
                                <Input id="exam_shift" value={examShift} onChange={(e) => setExamShift(e.target.value)} required />
                            </div>
                            <label className="flex items-center gap-2 text-sm font-semibold mt-8">
                                <input type="checkbox" checked={isSolved} onChange={(e) => setIsSolved(e.target.checked)} />
                                Is Solved
                            </label>
                        </div>

                        <div className="rounded-2xl border border-dashed border-gray-300 p-4">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                            />
                            {!file ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-full rounded-xl bg-gray-50 border border-gray-200 p-6 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-100"
                                >
                                    <Upload className="h-4 w-4" />
                                    Select PDF
                                </button>
                            ) : (
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <FileText className="h-4 w-4 text-primary-600" />
                                        <p className="text-sm truncate">{file.name}</p>
                                    </div>
                                    <button type="button" onClick={() => setFile(null)} className="p-1.5 rounded-lg hover:bg-gray-100">
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button type="button" variant="ghost" onClick={() => router.back()} disabled={loading}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? (
                                    <span className="inline-flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </span>
                                ) : (
                                    'Create Past Paper'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
