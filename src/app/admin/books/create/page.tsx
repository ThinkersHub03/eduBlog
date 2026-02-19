'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, BookPlus, FileText, Loader2, Upload, X } from "lucide-react"
import Link from "next/link"

export default function CreateBookPage() {
    const [title, setTitle] = useState('')
    const [classLevel, setClassLevel] = useState('')
    const [subject, setSubject] = useState('')
    const [board, setBoard] = useState('')

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)
    const [uploading, setUploading] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileError(null)
        const file = e.target.files?.[0] ?? null

        if (!file) {
            setSelectedFile(null)
            return
        }

        if (file.type !== 'application/pdf') {
            setFileError('Invalid file type. Only PDF files are allowed.')
            setSelectedFile(null)
            e.target.value = ''
            return
        }

        setSelectedFile(file)
    }

    const clearFile = () => {
        setSelectedFile(null)
        setFileError(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async () => {
        setFormError(null)
        setFileError(null)

        if (!title.trim() || !classLevel.trim() || !subject.trim() || !board.trim()) {
            setFormError('Please fill in all required fields.')
            return
        }

        if (!selectedFile) {
            setFileError('Please select a PDF file to upload.')
            return
        }

        setUploading(true)

        try {
            // Step 1: Upload PDF to Supabase Storage
            const timestamp = Date.now()
            const safeName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')
            const filePath = `${timestamp}-${safeName}`

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('books')
                .upload(filePath, selectedFile, {
                    contentType: 'application/pdf',
                    upsert: false,
                })


            if (uploadError) {
                console.error('[books/create] Storage upload error:', uploadError)
                setFormError(`Upload failed: ${uploadError.message}`)
                setUploading(false)
                return
            }


            // Step 2: Get public URL
            const { data: urlData } = supabase.storage
                .from('books')
                .getPublicUrl(filePath)

            console.log('[books/create] File URL:', urlData.publicUrl)
            const file_url = urlData.publicUrl

            // Step 3: Insert into books table
            const { error: insertError } = await supabase.from('books').insert({
                title: title.trim(),
                class_level: classLevel.trim(),
                subject: subject.trim(),
                board: board.trim(),
                file_url,
            })


            if (insertError) {
                console.error('[books/create] DB insert error:', insertError)
                setFormError(`Database error: ${insertError.message}`)
                setUploading(false)
                return
            }

            router.push('/admin/books')
            router.refresh()

        } catch (err) {
            console.error('[books/create] Unexpected error:', err)
            setFormError('An unexpected error occurred. Please try again.')
            setUploading(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 py-6">
            <Link
                href="/admin/books"
                className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Library
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">New Publication</h2>
                <p className="text-gray-500 font-medium">Register a new educational resource in the digital catalog.</p>
            </div>

            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-8 border-b border-gray-50 pt-8 px-8">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                            <BookPlus className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-black text-gray-900">Book Details</CardTitle>
                            <CardDescription className="text-gray-500 font-medium pt-1">
                                Provide metadata and upload the PDF for this book.
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="pt-10 px-8 pb-10">
                    <div className="space-y-8">

                        {/* Fields */}
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
                                    disabled={uploading}
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
                                    disabled={uploading}
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
                                    disabled={uploading}
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
                                    disabled={uploading}
                                />
                            </div>
                        </div>

                        {/* PDF Upload */}
                        <div className="p-6 rounded-3xl bg-indigo-50/50 border border-indigo-100 space-y-4">
                            <h4 className="text-sm font-black text-indigo-900 uppercase tracking-widest flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                PDF Upload
                            </h4>

                            {/* Always-rendered hidden file input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="hidden"
                            />

                            {!selectedFile ? (
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={uploading}
                                    className="w-full group flex flex-col items-center justify-center gap-3 border-2 border-dashed border-indigo-200 rounded-2xl p-10 bg-white hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    <div className="bg-indigo-50 p-4 rounded-2xl group-hover:bg-indigo-100 transition-colors">
                                        <FileText className="h-8 w-8 text-indigo-500" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-bold text-indigo-700">Click to select PDF</p>
                                        <p className="text-xs text-indigo-400 mt-1">Only PDF files are allowed</p>
                                    </div>
                                </button>
                            ) : (
                                <div className="flex items-center justify-between gap-4 bg-white border border-indigo-100 rounded-2xl px-5 py-4 shadow-sm">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <div className="bg-indigo-50 p-2 rounded-xl shrink-0">
                                            <FileText className="h-5 w-5 text-indigo-600" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-800 truncate">{selectedFile.name}</p>
                                            <p className="text-xs text-gray-400 mt-0.5">
                                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB · PDF
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={clearFile}
                                        disabled={uploading}
                                        className="shrink-0 p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                        style={{ pointerEvents: uploading ? 'none' : 'auto' }}
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}

                            {fileError && (
                                <p className="text-sm font-medium text-red-500 ml-1">{fileError}</p>
                            )}
                        </div>

                        {/* Global error */}
                        {formError && (
                            <div className="rounded-2xl bg-red-50 border border-red-100 px-5 py-4">
                                <p className="text-sm font-semibold text-red-600">{formError}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <p className="text-xs text-gray-400 font-medium">
                                All fields marked <span className="text-red-500">*</span> are required
                            </p>
                            <div className="flex gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    disabled={uploading}
                                    className="h-12 px-8 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50"
                                    style={{ pointerEvents: uploading ? 'none' : 'auto' }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={uploading}
                                    className="h-12 px-10 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all uppercase tracking-tight text-white disabled:opacity-60"
                                    style={{ pointerEvents: uploading ? 'none' : 'auto' }}
                                >
                                    {uploading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Uploading...
                                        </span>
                                    ) : (
                                        'Add to Catalog'
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
