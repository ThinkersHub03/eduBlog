import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    response = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Get user session
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const path = request.nextUrl.pathname

    // Admin-only routes - protect all /admin routes and sub-routes
    const isAdminRoute = path.startsWith('/admin')

    // Protected routes that require authentication
    const protectedRoutes = ['/dashboard', '/profile']
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

    // Handle admin routes first (highest priority)
    if (isAdminRoute) {
        // If not authenticated, redirect to login
        if (!user) {
            const redirectUrl = new URL('/login', request.url)
            redirectUrl.searchParams.set('redirectTo', path)
            return NextResponse.redirect(redirectUrl)
        }

        // If authenticated, check if user has admin role
        const { data: profile } = await supabase
            .from('users')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            // Redirect non-admin users to dashboard
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }

        // User is authenticated and is admin, allow access
        return response
    }

    // Handle other protected routes
    if (isProtectedRoute && !user) {
        const redirectUrl = new URL('/login', request.url)
        redirectUrl.searchParams.set('redirectTo', path)
        return NextResponse.redirect(redirectUrl)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
