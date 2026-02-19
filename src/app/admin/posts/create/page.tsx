'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TiptapEditor } from "@/components/tiptap-editor"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/file-upload"

export default function CreatePostPage() {
    const [loading, setLoading] = useState(false)
    const [content, setContent] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const generateSlug = (title: string) => {
        return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string

        // Auto-generate slug if not provided/modified (simplified logic here)
        const slug = generateSlug(title) + '-' + Date.now().toString().slice(-4)

        const data = {
            title,
            slug,
            content: content,
            featured_image: imageUrl,
            published: true // Default to published for now
        }

        const { error } = await supabase.from('posts').insert(data)

        if (error) {
            alert(error.message)
        } else {
            router.push('/admin/posts')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Write New Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-2">
                            <label htmlFor="title" className="text-sm font-medium">Title</label>
                            <Input id="title" name="title" required placeholder="Enter post title" />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Featured Image</label>
                            <FileUpload onUpload={setImageUrl} folder="blog-images" />
                            {imageUrl && <img src={imageUrl} alt="Preview" className="h-40 w-full object-cover rounded-md" />}
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Content</label>
                            <TiptapEditor content={content} onChange={setContent} />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Publishing...' : 'Publish Post'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
