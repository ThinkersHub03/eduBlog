'use client'

import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useRef, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, FileText, Upload, Loader2, X, AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface BookData {
    id: string
    title: string
    class_level: string
    subject: string
    board: string
    file_url: string
    created_at: string
}

export default function EditBookPage() {
    const { id } = useParams<{ id: string }>()
    const router = useRouter()
    const supabase = createClient()
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Fetch state
    const [fetching, setFetching] = useState(true)
    const [fetchError, setFetchError] = useState<string | null>(null)

    // Form fields
    const [title, setTitle] = useState('')
    const [classLevel, setClassLevel] = useState('')
    const [subject, setSubject] = useState('')
    const [board, setBoard] = useState('')
    const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null)

    // New PDF upload
    const [newFile, setNewFile] = useState<File | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)

    // Submission state
    const [submitting, setSubmitting] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    // ── Fetch book data ─────────────────────────────────────────────────────────

    useEffect(() => {
        async function fetchBook() {
            setFetching(true)
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .eq('id', id)
                .single()

            if (error || !data) {
                setFetchError(error?.message ?? 'Book not found.')
                setFetching(false)
                return
            }

            const book = data as BookData
            setTitle(book.title ?? '')
            setClassLevel(book.class_level ?? '')
            setSubject(book.subject ?? '')
            setBoard(book.board ?? '')
            setCurrentFileUrl(book.file_url ?? null)
            setFetching(false)
        }

        fetchBook()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    // ── File picker ─────────────────────────────────────────────────────────────

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null)
        const file = e.target.files?.[0] ?? null

        if (!file) {
            setNewFile(null)
            return
        }

        if (file.type !== 'application/pdf') {
            setFileError('Invalid file type. Only PDF files are allowed.')
            setNewFile(null)
            e.target.value = ''
            return
        }

        setNewFile(file)
    }

    const clearNewFile = () => {
        setNewFile(null)
        setFileError(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    // ── Submit ──────────────────────────────────────────────────────────────────

    const handleSubmit = async () => {
        setFormError(null)
        setSuccess(false)

        if (!title.trim() || !classLevel.trim() || !subject.trim() || !board.trim()) {
            setFormError('Please fill in all required fields.')
            return
        }

        setSubmitting(true)

        try {
            let file_url = currentFileUrl

            // If user chose a new PDF: delete old, upload new
            if (newFile) {
                // Delete old file from storage
                if (currentFileUrl) {
                    const oldPathMatch = currentFileUrl.match(/\/object\/public\/books\/(.+)$/)
                    const oldStoragePath = oldPathMatch?.[1]
                    if (oldStoragePath) {
                        await supabase.storage
                            .from('books')
                            .remove([decodeURIComponent(oldStoragePath)])
                        // Non-fatal: continue even if old file delete fails
                    }
                }

                // Upload new file
                const timestamp = Date.now()
                const safeName = newFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
                const filePath = `${timestamp}-${safeName}`

                const { error: uploadError } = await supabase.storage
                    .from('books')
                    .upload(filePath, newFile, {
                        contentType: 'application/pdf',
                        upsert: false,
                    })

                if (uploadError) {
                    setFormError(`PDF upload failed: ${uploadError.message}`)
                    setSubmitting(false)
                    return
                }

                const { data: urlData } = supabase.storage.from('books').getPublicUrl(filePath)
                file_url = urlData.publicUrl
            }

            // Update database record
            const { error: updateError } = await supabase
                .from('books')
                .update({
                    title: title.trim(),
                    class_level: classLevel.trim(),
                    subject: subject.trim(),
                    board: board.trim(),
                    file_url,
                })
                .eq('id', id)

            if (updateError) {
                setFormError(`Update failed: ${updateError.message}`)
                setSubmitting(false)
                return
            }

            setSuccess(true)
            setTimeout(() => {
                router.push('/admin/books')
                router.refresh()
            }, 800)

        } catch (err) {
            console.error('[books/edit] Unexpected error:', err)
            setFormError('An unexpected error occurred. Please try again.')
            setSubmitting(false)
        }
    }

    // ── Current file display name ────────────────────────────────────────────────

    const currentFileName = currentFileUrl
        ? decodeURIComponent(currentFileUrl.split('/').pop() ?? 'Current PDF')
        : null

    // ── Render ──────────────────────────────────────────────────────────────────

    if (fetching) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <Loader2 className="h-8 w-8 text-primary-400 animate-spin mx-auto mb-4" />
                <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">Loading book data...</p>
            </div>
        )
    }

    if (fetchError) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
                <AlertCircle className="h-10 w-10 text-red-400 mx-auto" />
                <p className="font-bold text-red-600">{fetchError}</p>
                <Link href="/admin/books" className="inline-flex items-center gap-2 text-sm text-primary-600 font-bold">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Library
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <Link
                href="/admin/books"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Return to Library
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Edit Publication</h2>
                <p className="text-gray-500 font-medium">Update the metadata and file for this book.</p>
            </div>

            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-8 border-b border-gray-50 pt-8 px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                                <Save className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-gray-900">Modify Book Data</CardTitle>
                                <CardDescription className="text-gray-500 font-medium pt-1">
                                    ID: <span className="font-mono text-xs">{id}</span>
                                </CardDescription>
                            </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 text-xs font-black text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-100">
                            <AlertCircle className="h-3.5 w-3.5" />
                            Live Updates
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-10 px-8 pb-10">
                    <div className="space-y-8">

                        {/* ── Form fields ── */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="title" className="text-sm font-bold text-gray-700 ml-1">
                                    Book Title <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder="e.g. Modern Physics for Beginners"
                                    className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                                    disabled={submitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="class_level" className="text-sm font-bold text-gray-700 ml-1">
                                    Class Level <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="class_level"
                                    value={classLevel}
                                    onChange={e => setClassLevel(e.target.value)}
                                    placeholder="e.g. Class 10, Grade 5"
                                    className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                                    disabled={submitting}
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-bold text-gray-700 ml-1">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="subject"
                                    value={subject}
                                    onChange={e => setSubject(e.target.value)}
                                    placeholder="e.g. Physics, Mathematics"
                                    className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                                    disabled={submitting}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label htmlFor="board" className="text-sm font-bold text-gray-700 ml-1">
                                    Board <span className="text-red-500">*</span>
                                </label>
                                <Input
                                    id="board"
                                    value={board}
                                    onChange={e => setBoard(e.target.value)}
                                    placeholder="e.g. Federal Board, Punjab Board, Cambridge"
                                    className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all"
                                    disabled={submitting}
                                />
                            </div>
                        </div>

                        {/* ── PDF Section ── */}
                        <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 space-y-4">
                            <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                PDF File
                            </h4>

                            {/* Current file */}
                            {currentFileName && !newFile && (
                                <div className="flex items-center gap-3 bg-white border border-indigo-100 rounded-2xl px-4 py-3">
                                    <div className="bg-indigo-50 p-2 rounded-xl shrink-0">
                                        <FileText className="h-4 w-4 text-indigo-500" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">Current File</p>
                                        <p className="text-sm font-bold text-gray-700 truncate">{currentFileName}</p>
                                    </div>
                                </div>
                            )}

                            {/* Hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {/* New file picker / preview */}
                            {!newFile ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={submitting}
                                    className="w-full flex items-center justify-center gap-3 border-2 border-dashed border-indigo-200 rounded-2xl p-5 bg-white hover:border-indigo-400 hover:bg-indigo-50/30 transition-all disabled:opacity-60"
                                >
                                    <Upload className="h-5 w-5 text-indigo-400" />
                                    <div className="text-left">
                                        <p className="text-sm font-bold text-indigo-700">
                                            {currentFileName ? 'Replace PDF (optional)' : 'Upload PDF'}
                                        </p>
                                        <p className="text-xs text-indigo-400">Only PDF files are allowed</p>
                                    </div>
                                </button>
                            ) : (
                                <div className="flex items-center justify-between gap-4 bg-white border border-indigo-100 rounded-2xl px-5 py-4 shadow-sm">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="bg-indigo-50 p-2 rounded-xl shrink-0">
                                            <FileText className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-0.5">New File</p>
                                            <p className="text-sm font-bold text-gray-800 truncate">{newFile.name}</p>
                                            <p className="text-xs text-gray-400">
                                                {(newFile.size / 1024 / 1024).toFixed(2)} MB · PDF
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearNewFile}
                                        disabled={submitting}
                                        className="shrink-0 p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {fileError && (
                                <p className="text-sm font-medium text-red-500 ml-1">{fileError}</p>
                            )}
                        </div>

                        {/* ── Errors / Success ── */}
                        {formError && (
                            <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4 flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-semibold text-red-600">{formError}</p>
                            </div>
                        )}

                        {success && (
                            <div className="rounded-2xl bg-green-50 border border-green-100 px-5 py-4 flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                                <p className="text-sm font-semibold text-green-700">Book updated successfully! Redirecting...</p>
                            </div>
                        )}

                        {/* ── Actions ── */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <p className="text-xs text-gray-400 font-medium">
                                All fields marked <span className="text-red-500">*</span> are required
                            </p>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    disabled={submitting}
                                    className="h-12 px-8 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                >
                                    Discard
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={submitting || success}
                                    className="h-12 px-10 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all uppercase tracking-tight text-white flex items-center gap-2"
                                    style={{ pointerEvents: (submitting || success) ? 'none' : 'auto' }}
                                >
                                    {submitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : success ? (
                                        <>
                                            <CheckCircle2 className="h-4 w-4" />
                                            Saved!
                                        </>
                                    ) : (
                                        'Apply Changes'
                                    )}
                                </button>
                            </div>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
