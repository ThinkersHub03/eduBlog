'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, FileText, Loader2, Upload, X } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { PAST_PAPERS_BUCKET, buildPastPaperStoragePath, extractPastPapersStoragePath } from "@/lib/pastpapers"
import { toast } from "@/lib/toast"

interface PastPaperData {
    id: string
    subject: string
    year: number
    board: string
    class_level: string
    exam_shift: string
    is_solved: boolean
    file_url: string
}

export default function EditPastPaperPage() {
    const { id } = useParams<{ id: string }>()
    const supabase = createClient()
    const router = useRouter()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [paper, setPaper] = useState<PastPaperData | null>(null)
    const [file, setFile] = useState<File | null>(null)

    useEffect(() => {
        const fetchPaper = async () => {
            const { data, error } = await supabase
                .from('past_papers')
                .select('*')
                .eq('id', id)
                .single()

            if (error || !data) {
                toast.error(error?.message || 'Past paper not found.')
                router.push('/admin/pastpapers')
                return
            }

            setPaper(data as PastPaperData)
            setFetching(false)
        }

        fetchPaper()
    }, [id, router, supabase])

    const ensureAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return false
        const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
        return profile?.role === 'admin'
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!paper) return

        const parsedYear = Number(paper.year)
        if (!paper.subject.trim() || !paper.board.trim() || !paper.class_level.trim() || !paper.exam_shift.trim() || !Number.isInteger(parsedYear)) {
            toast.error('Please fill all fields correctly.')
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

            let nextFileUrl = paper.file_url
            let uploadedStoragePath: string | null = null

            if (file) {
                if (file.type !== 'application/pdf') {
                    toast.error('Only PDF files are allowed.')
                    setLoading(false)
                    return
                }

                const oldStoragePath = extractPastPapersStoragePath(paper.file_url)
                if (!oldStoragePath) {
                    toast.error('Could not resolve current file path for replacement.')
                    setLoading(false)
                    return
                }

                const { error: oldDeleteError } = await supabase.storage
                    .from(PAST_PAPERS_BUCKET)
                    .remove([oldStoragePath])

                if (oldDeleteError) {
                    toast.error(`Failed to delete old file: ${oldDeleteError.message}`)
                    setLoading(false)
                    return
                }

                uploadedStoragePath = buildPastPaperStoragePath({
                    board: paper.board,
                    classLevel: paper.class_level,
                    year: parsedYear,
                    originalFileName: file.name,
                })

                const { error: uploadError } = await supabase.storage
                    .from(PAST_PAPERS_BUCKET)
                    .upload(uploadedStoragePath, file, { contentType: 'application/pdf', upsert: false })

                if (uploadError) {
                    toast.error(`New file upload failed: ${uploadError.message}`)
                    setLoading(false)
                    return
                }

                const { data: urlData } = supabase.storage.from(PAST_PAPERS_BUCKET).getPublicUrl(uploadedStoragePath)
                nextFileUrl = urlData.publicUrl
            }

            const { error: updateError } = await supabase
                .from('past_papers')
                .update({
                    subject: paper.subject.trim(),
                    year: parsedYear,
                    board: paper.board.trim(),
                    class_level: paper.class_level.trim(),
                    exam_shift: paper.exam_shift.trim(),
                    is_solved: paper.is_solved,
                    file_url: nextFileUrl,
                })
                .eq('id', id)

            if (updateError) {
                if (uploadedStoragePath) {
                    await supabase.storage.from(PAST_PAPERS_BUCKET).remove([uploadedStoragePath])
                }
                toast.error(`Update failed: ${updateError.message}`)
                setLoading(false)
                return
            }

            toast.success('Past paper updated successfully.')
            router.push('/admin/pastpapers')
            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error('An unexpected error occurred.')
            setLoading(false)
        }
    }

    if (fetching || !paper) {
        return (
            <div className="py-20 text-center">
                <Loader2 className="h-7 w-7 animate-spin text-primary-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading past paper...</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto py-6 space-y-6">
            <Link href="/admin/pastpapers" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary-600">
                <ArrowLeft className="h-4 w-4" />
                Back to Past Papers
            </Link>

            <Card className="rounded-3xl">
                <CardHeader>
                    <CardTitle>Edit Past Paper</CardTitle>
                    <CardDescription>Update metadata and optionally replace the PDF file.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-5">
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Subject</label>
                                <Input value={paper.subject} onChange={(e) => setPaper({ ...paper, subject: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Year</label>
                                <Input
                                    inputMode="numeric"
                                    value={String(paper.year)}
                                    onChange={(e) => setPaper({ ...paper, year: Number(e.target.value) || 0 })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Board</label>
                                <Input value={paper.board} onChange={(e) => setPaper({ ...paper, board: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Class Level</label>
                                <Input value={paper.class_level} onChange={(e) => setPaper({ ...paper, class_level: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Exam Shift</label>
                                <Input value={paper.exam_shift} onChange={(e) => setPaper({ ...paper, exam_shift: e.target.value })} required />
                            </div>
                            <label className="flex items-center gap-2 text-sm font-semibold mt-8">
                                <input
                                    type="checkbox"
                                    checked={paper.is_solved}
                                    onChange={(e) => setPaper({ ...paper, is_solved: e.target.checked })}
                                />
                                Is Solved
                            </label>
                        </div>

                        <div className="rounded-2xl border border-dashed border-gray-300 p-4 space-y-2">
                            <p className="text-xs text-gray-500 break-all">Current file: {paper.file_url}</p>
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
                                    className="w-full rounded-xl bg-gray-50 border border-gray-200 p-4 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-100"
                                >
                                    <Upload className="h-4 w-4" />
                                    Replace PDF (optional)
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
                                        Saving...
                                    </span>
                                ) : (
                                    'Save Changes'
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
