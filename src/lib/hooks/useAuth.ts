import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks'
import { setUser, clearUser } from '@/lib/redux/slices/authSlice'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import type { UserRole } from '@/lib/redux/slices/authSlice'

export function useAuth() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const supabase = createClient()
    const { user, role, isAuthenticated, loading } = useAppSelector((state) => state.auth)

    const login = async (email: string, password: string) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            throw error
        }

        if (data.user) {
            // Fetch user role from database
            const { data: profile } = await supabase
                .from('users')
                .select('role')
                .eq('id', data.user.id)
                .single()

            const userRole: UserRole = profile?.role || 'user'
            dispatch(setUser({ user: data.user, role: userRole }))
        }

        return data
    }

    const logout = async () => {
        await supabase.auth.signOut()
        dispatch(clearUser())
        router.push('/')
        router.refresh()
    }

    const isAdmin = () => {
        return role === 'admin'
    }

    return {
        user,
        role,
        isAuthenticated,
        loading,
        login,
        logout,
        isAdmin,
    }
}
