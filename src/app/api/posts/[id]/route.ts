import sanitizeHtml from 'sanitize-html'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { PostValidator, PostPayload } from '@/lib/validators/post.validator'
import { slugSegment } from '@/lib/pastpapers'
import { extractBlogPath, deleteBlogFiles } from '@/lib/supabase/storage'

function json(data: any, status = 200) {
    return NextResponse.json(data, { status })
}

// GET post by id (admin only or published)
export async function GET(request: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data, error } = await supabase.from('posts').select('*').eq('id', id).single()
    if (error) {
        return json({ success: false, error: 'Not found' }, 404)
    }

    // if not published, only allow admin
    if (!data.published) {
        const { data: { user } } = await supabase.auth.getUser()
        const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', user?.id)
            .single()
        if (profile?.role !== 'admin') {
            return json({ success: false, error: 'Not found' }, 404)
        }
    }

    return json({ success: true, data })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
    const { id } = await params
    const body: PostPayload = await request.json()
    const parse = PostValidator.safeParse(body)
    if (!parse.success) {
        return json({ success: false, error: parse.error.message }, 400)
    }
    let validated = parse.data

    // sanitize text
    validated = {
        ...validated,
        content: validated.content.map((b) => {
            if (b.type === 'paragraph' || b.type === 'heading') {
                return {
                    ...b,
                    data: {
                        ...b.data,
                        text: sanitizeHtml(b.data.text, {
                            allowedTags: ['a', 'strong', 'em', 'u'],
                            allowedAttributes: { a: ['href', 'target', 'rel'] },
                            allowedSchemes: ['http', 'https', 'mailto'],
                        }),
                    },
                }
            }
            return b
        }) as typeof validated.content,
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return json({ success: false, error: 'Unauthorized' }, 401)
    }
    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
    if (profile?.role !== 'admin') {
        return json({ success: false, error: 'Forbidden' }, 403)
    }

    let slug = validated.slug || slugSegment(validated.title)
    // ensure unique (ignore self)
    const { data: existing } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .single()
    if (existing && existing.id !== id) {
        return json({ success: false, error: 'Slug already in use' }, 400)
    }

    const { error } = await supabase
        .from('posts')
        .update({
            title: validated.title,
            slug,
            content: validated.content,
            featured_image: validated.featured_image || null,
            published: validated.published ?? false,
        })
        .eq('id', id)

    if (error) {
        return json({ success: false, error: error.message }, 500)
    }

    // revalidate listing and the individual post path
    try {
        revalidatePath('/blog')
        revalidatePath(`/blog/${slug}`)
    } catch {}

    return json({ success: true })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } | Promise<{ id: string }> }) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return json({ success: false, error: 'Unauthorized' }, 401)
    }
    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()
    if (profile?.role !== 'admin') {
        return json({ success: false, error: 'Forbidden' }, 403)
    }

    // fetch post to know what files to delete
    const { data: post, error: fetchErr } = await supabase.from('posts').select('*').eq('id', id).single()
    if (fetchErr || !post) {
        return json({ success: false, error: 'Not found' }, 404)
    }

    // gather paths from content images/files and featured_image if in blog bucket
    const pathsToRemove: string[] = []
    if (Array.isArray(post.content)) {
        for (const b of post.content) {
            if (b.type === 'image' || b.type === 'file') {
                const path = extractBlogPath(b.data.url)
                if (path) pathsToRemove.push(path)
            }
        }
    }
    if (post.featured_image) {
        const path = extractBlogPath(post.featured_image)
        if (path) pathsToRemove.push(path)
    }
    if (pathsToRemove.length) {
        try {
            await deleteBlogFiles(pathsToRemove)
        } catch {
            // log and continue
        }
    }

    const { error: delErr } = await supabase.from('posts').delete().eq('id', id)
    if (delErr) {
        return json({ success: false, error: delErr.message }, 500)
    }

    try {
        revalidatePath('/blog')
    } catch {}

    return json({ success: true })
}
