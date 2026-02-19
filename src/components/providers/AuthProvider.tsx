'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/redux/hooks'
import { setUser, clearUser, setLoading } from '@/lib/redux/slices/authSlice'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/lib/redux/slices/authSlice'

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const dispatch = useAppDispatch()
    const supabase = createClient()

    useEffect(() => {
        // Check active session on mount
        const checkSession = async () => {
            dispatch(setLoading(true))

            const { data: { session } } = await supabase.auth.getSession()

            if (session?.user) {
                // Fetch user role from database
                const { data: profile } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()

                const userRole: UserRole = profile?.role || 'user'
                dispatch(setUser({ user: session.user, role: userRole }))
            } else {
                dispatch(clearUser())
            }
        }

        checkSession()

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                // Fetch user role from database
                const { data: profile } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()

                const userRole: UserRole = profile?.role || 'user'
                dispatch(setUser({ user: session.user, role: userRole }))
            } else {
                dispatch(clearUser())
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [dispatch, supabase])

    return <>{children}</>
}
