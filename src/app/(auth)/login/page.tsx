'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/lib/hooks/useAuth"

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const supabase = createClient()
    const { login } = useAuth()

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await login(email, password)
            router.push('/dashboard')
            router.refresh()
        } catch (err: any) {
            setError(err.message || 'Failed to login')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${location.origin}/auth/callback`,
            },
        })
    }

    return (
        <Card className="border-none shadow-premium bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden p-2">
            <CardHeader className="space-y-2 pb-8 text-center pt-8">
                <CardTitle className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</CardTitle>
                <CardDescription className="text-gray-500 font-medium">
                    Log in to your student dashboard to continue.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 px-6">
                <Button
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="h-12 rounded-2xl border-gray-100 bg-white hover:bg-gray-50 font-bold transition-all shadow-sm flex items-center justify-center gap-3"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Google Account
                </Button>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-100" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-3 text-gray-400 font-bold tracking-widest">
                            Or Secure Email
                        </span>
                    </div>
                </div>

                <form onSubmit={handleEmailLogin} className="grid gap-5">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm font-medium">
                            {error}
                        </div>
                    )}
                    <div className="grid gap-2">
                        <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="e.g. ali@eduportal.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary-100 transition-all font-medium"
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between ml-1">
                            <label htmlFor="password" className="text-sm font-bold text-gray-700">Password</label>
                            <Link href="#" className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors">Recover Account?</Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary-100 transition-all font-medium"
                        />
                    </div>
                    <Button
                        className="w-full h-12 rounded-2xl font-black text-lg mt-3 shadow-xl shadow-primary-200 bg-primary-600 hover:bg-primary-700 transition-all tracking-tight"
                        disabled={loading}
                    >
                        {loading ? 'Authenticating...' : 'Sign In Now'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="bg-gray-50/10 backdrop-blur-sm border-t border-gray-50 py-8 mt-4">
                <p className="text-center text-sm text-gray-500 w-full font-medium">
                    New to EduPortal?{' '}
                    <Link href="/register" className="font-black text-primary-600 hover:text-primary-700 transition-colors decoration-2 underline-offset-4 hover:underline">
                        Create Your Account
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}
