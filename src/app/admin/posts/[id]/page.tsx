'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { TiptapEditor } from "@/components/tiptap-editor"
import { createClient } from "@/lib/supabase/client"
import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { FileUpload } from "@/components/file-upload"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, FileEdit, Sparkles, Globe, Image as ImageIcon, Layout } from "lucide-react"
import Link from "next/link"

export default function EditPostPage() {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(true)
    const [post, setPost] = useState<any>(null)
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [published, setPublished] = useState(false)

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
            if (error) {
                alert("Error fetching post: " + error.message)
                router.push('/admin/posts')
            } else if (data) {
                setPost(data)
                setContent(data.content)
                setImageUrl(data.featured_image)
                setPublished(data.published)
            }
            setFetching(false)
        }
        fetchPost()
    }, [id, supabase, router])

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)

        const data = {
            title: formData.get('title') as string,
            slug: formData.get('slug') as string,
            content: content,
            featured_image: imageUrl,
            published: published
        }

        const { error } = await supabase.from('posts').update(data).eq('id', id)

        if (error) {
            alert(error.message)
        } else {
            router.push('/admin/posts')
            router.refresh()
        }
        setLoading(false)
    }

    if (fetching) return <div className="py-20 text-center font-bold text-gray-400 uppercase tracking-widest animate-pulse">Syncing Article...</div>

    return (
        <div className="max-w-5xl mx-auto space-y-8 py-6">
            <Link href="/admin/posts" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary-600 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Editorial Hub
            </Link>

            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Edit Article</h2>
                <p className="text-gray-500 font-medium">Refine your storytelling and optimize for search engines.</p>
            </div>

            <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                <CardHeader className="pb-8 border-b border-gray-50 pt-8 px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="bg-primary-50 p-3 rounded-2xl text-primary-600">
                                <FileEdit className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-xl font-black text-gray-900">Content Workshop</CardTitle>
                                <CardDescription className="text-gray-500 font-medium pt-1">ID: {id}</CardDescription>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-10 px-8">
                    <form onSubmit={handleUpdate} className="space-y-10">
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="title" className="text-sm font-bold text-gray-700 ml-1">Headline</label>
                                <Input id="title" name="title" defaultValue={post.title} required className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="slug" className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                    <Globe className="h-3.5 w-3.5 text-primary-600" />
                                    URL Slug
                                </label>
                                <Input id="slug" name="slug" defaultValue={post.slug} required className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all shadow-sm" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                <ImageIcon className="h-3.5 w-3.5 text-primary-600" />
                                Featured Image
                            </label>
                            <div className="grid md:grid-cols-[200px_1fr] gap-6 items-start">
                                <div className="aspect-video rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="h-8 w-8 text-gray-200" />
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <FileUpload onUpload={setImageUrl} folder="blog-images" />
                                    <p className="text-xs text-gray-400 font-medium leading-relaxed">Recommended size: 1200x630px. Max file size: 2MB.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1.5">
                                <Layout className="h-3.5 w-3.5 text-primary-600" />
                                Article Body
                            </label>
                            <div className="p-1 rounded-3xl border border-gray-100 bg-gray-50/30 overflow-hidden min-h-[400px]">
                                <TiptapEditor content={content} onChange={setContent} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                            <div className="flex items-center space-x-3 bg-gray-50/50 px-4 py-2 rounded-2xl border border-gray-100">
                                <Switch id="published" checked={published} onCheckedChange={setPublished} className="data-[state=checked]:bg-green-500" />
                                <label htmlFor="published" className="text-sm font-black text-gray-700 uppercase tracking-widest cursor-pointer">Published</label>
                            </div>
                            <div className="flex gap-4">
                                <Button type="button" variant="ghost" className="font-bold text-gray-500 rounded-2xl h-12 px-8" onClick={() => router.back()}>Discard</Button>
                                <Button type="submit" disabled={loading} className="h-12 px-10 rounded-2xl font-black bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-200 transition-all uppercase tracking-tight text-white border-0">
                                    {loading ? 'Publishing...' : 'Update Article'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
