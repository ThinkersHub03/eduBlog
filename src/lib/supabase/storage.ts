import { createBrowserClient } from '@supabase/ssr'

// helper to build a supabase client for browser/server when needed
export function createStorageClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
}

/**
 * Utility to extract a path inside the `blog` bucket from a public URL.
 * Returns null if the URL is not for the blog bucket.
 */
export function extractBlogPath(url: string): string | null {
    const match = url.match(/\/storage\/v1\/object\/public\/blog\/(.+)$/)
    return match ? decodeURIComponent(match[1]) : null
}

/**
 * Delete one or more files from the blog bucket. Paths should be relative
 * inside the bucket (e.g. "images/abc.png").
 */
export async function deleteBlogFiles(paths: string[]) {
    const client = createStorageClient()
    const { error } = await client.storage.from('blog').remove(paths)
    if (error) {
        console.error('Error deleting blog storage files', error)
        throw error
    }
}
