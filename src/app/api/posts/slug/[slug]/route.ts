import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

function json(data: any, status = 200) {
    return NextResponse.json(data, { status })
}

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const supabase = await createClient()
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', params.slug)
        .eq('published', true)
        .single()

    if (error || !post) {
        return json({ success: false, error: 'Not found' }, 404)
    }

    return json({ success: true, data: post })
}
