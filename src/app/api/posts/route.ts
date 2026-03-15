import sanitizeHtml from 'sanitize-html'
import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { PostValidator, PostPayload } from '@/lib/validators/post.validator'
import { slugSegment } from '@/lib/pastpapers'

// helper response wrappers
function json(data: any, status = 200) {
    return NextResponse.json(data, { status })
}

export async function GET(request: NextRequest) {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || '1')
    const limit = Number(url.searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    const supabase = await createClient()
    const { data, error, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('published', true)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        return json({ success: false, error: error.message }, 500)
    }

    return json({
        success: true,
        data: {
            posts: data,
            page,
            limit,
            total: count,
            totalPages: count ? Math.ceil(count / limit) : 0,
        },
    })
}

export async function POST(request: NextRequest) {
    const body: PostPayload = await request.json()

    // basic shape validation
    const parse = PostValidator.safeParse(body)
    if (!parse.success) {
        return json({ success: false, error: parse.error.message }, 400)
    }
    let validated = parse.data

    // sanitize paragraph/heading HTML
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
                            allowedAttributes: {
                                a: ['href', 'target', 'rel'],
                            },
                            allowedSchemes: ['http', 'https', 'mailto'],
                        }),
                    },
                }
            }
            return b
        }) as typeof validated.content,
    }

    // auth & admin check
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

    // slug logic
    let slug = validated.slug || slugSegment(validated.title)
    // enforce uniqueness
    const { data: existing } = await supabase
        .from('posts')
        .select('id')
        .eq('slug', slug)
        .single()
    if (existing) {
        return json({ success: false, error: 'Slug already in use' }, 400)
    }

    const toInsert = {
        title: validated.title,
        slug,
        content: validated.content,
        featured_image: validated.featured_image || null,
        published: validated.published ?? false,
    }

    const { error } = await supabase.from('posts').insert(toInsert)
    if (error) {
        return json({ success: false, error: error.message }, 500)
    }

    // revalidate listing
    try { revalidatePath('/blog') } catch {};
    return json({ success: true })
}
