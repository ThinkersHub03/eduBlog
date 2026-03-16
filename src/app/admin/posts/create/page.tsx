'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { slugify } from '@/lib/pastpapers'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileUpload } from "@/components/file-upload"
import { BlockEditor } from "@/components/block-editor"
import { PostBlock } from "@/lib/types/post"

export default function CreatePostPage() {
    const [loading, setLoading] = useState(false)
    const [blocks, setBlocks] = useState<PostBlock[]>([])
    const [imageUrl, setImageUrl] = useState('')
    const router = useRouter()

    const generateSlug = (title: string) => slugify(title)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        const formData = new FormData(e.currentTarget)
        const title = formData.get('title') as string
        let slug = (formData.get('slug') as string) || generateSlug(title)

        // attach timestamp to guarantee uniqueness when auto-generated
        if (!formData.get('slug')) {
            slug = `${slug}-${Date.now().toString().slice(-4)}`
        }

        const payload = {
            title,
            slug,
            content: blocks,
            featured_image: imageUrl || null,
            published: true,
        }

        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            })
            const json = await res.json()
            if (!json.success) {
                alert(json.error || 'An error occurred')
            } else {
                router.push('/admin/posts')
                router.refresh()
            }
        } catch (err) {
            console.error(err)
            alert('Network error creating post')
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
                            <label htmlFor="slug" className="text-sm font-medium">Slug (optional)</label>
                            <Input id="slug" name="slug" placeholder="Leave blank to auto-generate" />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Featured Image</label>
                            <FileUpload onUpload={setImageUrl} folder="images" bucket="blogs" />
                            {imageUrl && <img src={imageUrl} alt="Preview" className="h-40 w-full object-cover rounded-md" />}
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium">Content</label>
                            <BlockEditor blocks={blocks} onChange={setBlocks} />
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
