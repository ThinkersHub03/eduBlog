'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function updateUserRole(userId: string, newRole: 'user' | 'admin') {
    const supabase = await createClient()

    // 1. Verify current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data: currentUserProfile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    if (currentUserProfile?.role !== 'admin') {
        return { error: 'Forbidden: Admins only' }
    }

    // 2. Update target user role
    const { error } = await supabase
        .from('users')
        .update({ role: newRole })
        .eq('id', userId)

    if (error) {
        console.error('Error updating role:', error)
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return { success: true }
}
