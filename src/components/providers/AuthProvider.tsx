'use client'

import { useEffect } from 'react'
import { useAppDispatch } from '@/lib/redux/hooks'
import {
    setCredentials,
    logout,
    setLoading,
} from '@/lib/redux/slices/authSlice'
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

            const {
                data: { session },
            } = await supabase.auth.getSession()

            if (session?.user && session.access_token) {
                // Fetch user role from database
                const { data: profile } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()

                const userRole: UserRole = profile?.role || 'user'
                dispatch(
                    setCredentials({
                        user: session.user,
                        role: userRole,
                        accessToken: session.access_token,
                    })
                )
            } else {
                dispatch(logout())
            }
        }

        checkSession()

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user && session.access_token) {
                // Fetch user role from database
                const { data: profile } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()

                const userRole: UserRole = profile?.role || 'user'
                dispatch(
                    setCredentials({
                        user: session.user,
                        role: userRole,
                        accessToken: session.access_token,
                    })
                )
            } else {
                dispatch(logout())
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [dispatch, supabase])

    return <>{children}</>
}
