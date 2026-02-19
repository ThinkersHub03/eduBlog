import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Calendar, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const supabase = await createClient()
    const { data: post } = await supabase.from('posts').select('title').eq('slug', params.slug).single()

    return {
        title: post?.title || 'Post Not Found',
    }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const supabase = await createClient()
    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!post) {
        notFound()
    }

    return (
        <article className="container mx-auto px-4 py-8 max-w-4xl">
            <Link href="/blog" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-6 transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Blog
            </Link>

            <header className="space-y-4 mb-8 text-center">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1.5" />
                        {new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                    </div>
                    {/* Placeholder for author and read time if available in future */}
                    {/* <div className="flex items-center">
                        <User className="h-4 w-4 mr-1.5" />
                        EduPortal Team
                    </div> */}
                </div>
            </header>

            {post.featured_image && (
                <div className="mb-10 rounded-2xl overflow-hidden shadow-lg aspect-video relative bg-gray-100">
                    <img
                        src={post.featured_image}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}

            <div
                className="prose prose-lg prose-blue max-w-none 
                prose-headings:font-bold prose-headings:text-gray-900 
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-primary-600 hover:prose-a:text-primary-700
                prose-img:rounded-xl prose-img:shadow-md
                bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
    )
}
