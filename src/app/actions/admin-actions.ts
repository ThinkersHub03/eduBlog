'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

async function assertAdmin() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { supabase, error: 'Unauthorized' as const }

    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') return { supabase, error: 'Forbidden' }

    return { supabase, error: null }
}

export async function deleteRecord(table: string, id: string, path: string) {
    const { supabase, error: authError } = await assertAdmin()
    if (authError) return { error: authError }

    const { error } = await supabase.from(table).delete().eq('id', id)

    if (error) {
        console.error(`Error deleting from ${table}:`, error)
        return { error: error.message }
    }

    revalidatePath(path)
    return { success: true }
}

export async function deleteBook(id: string, path: string) {
    const { supabase, error: authError } = await assertAdmin()
    if (authError) return { error: authError }

    const { data: book, error: fetchError } = await supabase
        .from('books')
        .select('file_url')
        .eq('id', id)
        .single()

    if (fetchError || !book) {
        return { error: fetchError?.message ?? 'Book not found' }
    }

    if (book.file_url) {
        const storagePathMatch = book.file_url.match(/\/object\/public\/books\/(.+)$/)
        const storagePath = storagePathMatch?.[1]

        if (storagePath) {
            const { error: storageError } = await supabase.storage
                .from('books')
                .remove([decodeURIComponent(storagePath)])

            if (storageError) {
                console.error('Storage delete error:', storageError)
                return { error: `File deletion failed: ${storageError.message}. Database record was NOT deleted.` }
            }
        }
    }

    const { error: dbError } = await supabase.from('books').delete().eq('id', id)

    if (dbError) {
        console.error('DB delete error:', dbError)
        return { error: dbError.message }
    }

    revalidatePath(path)
    return { success: true }
}

export async function deletePastPaper(id: string, path: string) {
    const { supabase, error: authError } = await assertAdmin()
    if (authError) return { error: authError }

    const { data: pastPaper, error: fetchError } = await supabase
        .from('past_papers')
        .select('file_url')
        .eq('id', id)
        .single()

    if (fetchError || !pastPaper) {
        return { error: fetchError?.message ?? 'Past paper not found' }
    }

    if (pastPaper.file_url) {
        const storagePathMatch = pastPaper.file_url.match(/\/object\/public\/past-papers\/(.+)$/)
        const storagePath = storagePathMatch?.[1]

        if (!storagePath) {
            return { error: 'Could not extract file path from past paper URL.' }
        }

        const { error: storageError } = await supabase.storage
            .from('past-papers')
            .remove([decodeURIComponent(storagePath)])

        if (storageError) {
            console.error('Storage delete error:', storageError)
            return { error: `File deletion failed: ${storageError.message}. Database record was NOT deleted.` }
        }
    }

    const { error: dbError } = await supabase
        .from('past_papers')
        .delete()
        .eq('id', id)

    if (dbError) {
        console.error('DB delete error:', dbError)
        return { error: dbError.message }
    }

    revalidatePath(path)
    return { success: true }
}

export async function updateBook(
    id: string,
    fields: { title: string; class_level: string; subject: string; board: string },
    path: string
) {
    const { supabase, error: authError } = await assertAdmin()
    if (authError) return { error: authError }

    const { error } = await supabase
        .from('books')
        .update(fields)
        .eq('id', id)

    if (error) {
        console.error('Book update error:', error)
        return { error: error.message }
    }

    revalidatePath(path)
    return { success: true }
}
