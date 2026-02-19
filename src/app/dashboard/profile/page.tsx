'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { User, Mail, Shield, AlertTriangle, CheckCircle2 } from "lucide-react"

export default function ProfilePage() {
    const [fullName, setFullName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserEmail(user.email || '')
                const { data } = await supabase.from('users').select('full_name').eq('id', user.id).single()
                if (data) setFullName(data.full_name || '')
            }
        }
        getProfile()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setSuccess(false)
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            const { error } = await supabase
                .from('users')
                .update({ full_name: fullName })
                .eq('id', user.id)

            if (error) {
                alert('Connection error. Please try again.')
            } else {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 3000)
                router.refresh()
            }
        }
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10 py-6">
            <div className="space-y-1">
                <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Profile Settings</h2>
                <p className="text-gray-500 text-lg font-medium">Control your personal data and account visibility.</p>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-8 rounded-3xl bg-white shadow-premium border border-gray-100 text-center space-y-4">
                        <div className="h-24 w-24 bg-primary-50 rounded-full mx-auto flex items-center justify-center text-primary-600 relative">
                            <User className="h-12 w-12" />
                            <div className="absolute bottom-1 right-1 h-6 w-6 bg-green-500 border-4 border-white rounded-full" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">{fullName || 'Educator'}</h3>
                            <p className="text-sm text-gray-500 font-medium">{userEmail}</p>
                        </div>
                        <div className="pt-4 border-t border-gray-50 grid grid-cols-2 gap-2 text-xs font-bold uppercase tracking-widest">
                            <div className="bg-gray-50 p-2 rounded-xl text-gray-400">Student</div>
                            <div className="bg-primary-50 p-2 rounded-xl text-primary-600">Active</div>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-primary-900 text-white space-y-4 shadow-xl">
                        <h4 className="font-bold flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary-400" />
                            Privacy Pro
                        </h4>
                        <p className="text-xs text-primary-100/70 leading-relaxed font-medium">
                            Your data is encrypted and never shared with third-party advertisers. We value your academic privacy.
                        </p>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-white">
                        <CardHeader className="pb-6 border-b border-gray-50 pt-8 px-8">
                            <CardTitle className="text-xl font-black text-gray-900">Personal Details</CardTitle>
                            <CardDescription className="text-gray-500 font-medium">
                                Update your name and contact preferences.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8 px-8">
                            <form onSubmit={handleUpdate} className="grid gap-8">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="fullName" className="text-sm font-bold text-gray-700 ml-1">Display Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                                            <Input
                                                id="fullName"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="e.g. Ali Ahmed"
                                                className="h-12 pl-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white focus:ring-primary-100 transition-all font-medium"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-gray-700 ml-1 opacity-50">Email Address</label>
                                        <div className="relative group grayscale">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                disabled
                                                value={userEmail}
                                                className="h-12 pl-12 rounded-2xl border-gray-100 bg-gray-100 text-gray-400 cursor-not-allowed font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-gray-50 gap-4">
                                    <div className="flex-1">
                                        {success && (
                                            <div className="flex items-center gap-2 text-green-600 font-bold text-sm animate-in fade-in slide-in-from-left-2">
                                                <CheckCircle2 className="h-4 w-4" />
                                                Changes saved successfully!
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        disabled={loading}
                                        className="h-12 px-10 rounded-2xl font-black shadow-xl shadow-primary-200 bg-primary-600 hover:bg-primary-700 transition-all text-white uppercase tracking-tight"
                                    >
                                        {loading ? 'Processing...' : 'Save Profile'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg bg-red-50/30 rounded-3xl overflow-hidden border-2 border-dashed border-red-100">
                        <CardContent className="py-8 px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="space-y-2 text-center md:text-left">
                                <h3 className="text-lg font-black text-red-900 flex items-center justify-center md:justify-start gap-2 uppercase tracking-tight">
                                    <AlertTriangle className="h-5 w-5" />
                                    Danger Zone
                                </h3>
                                <p className="text-sm text-red-600/80 font-medium">Deactivating your account will erase all your history and saved downloads permanently.</p>
                            </div>
                            <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-600 hover:text-white rounded-2xl font-black h-12 px-8 transition-all hover:shadow-lg hover:shadow-red-100">
                                Close Account
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
