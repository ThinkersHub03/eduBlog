import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bookmark, Bell, Search, Zap, Star, ShieldCheck, ArrowRight, BookOpen, Briefcase, GraduationCap, FileText, Users, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch profile with role
    const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.id)
        .single()

    const isAdmin = profile?.role === 'admin'

    return (
        <div className="space-y-10 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h2 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        Hello, <span className="text-primary-600">{profile?.full_name?.split(' ')[0] || 'Scholar'}</span>!
                    </h2>
                    <p className="text-gray-500 text-lg font-medium">
                        {isAdmin ? 'Manage your platform from here' : 'Ready to continue your learning journey today?'}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-primary-50 px-4 py-2 rounded-2xl border border-primary-100 flex items-center gap-2">
                        <ShieldCheck className="h-5 w-5 text-primary-600" />
                        <span className="text-sm font-bold text-primary-900 uppercase tracking-wider">{profile?.role || 'User'}</span>
                    </div>
                </div>
            </div>

            {/* Admin Section */}
            {isAdmin && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="h-8 w-1 bg-primary-600 rounded-full" />
                            Admin Controls
                        </h3>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Link href="/admin/books" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <BookOpen className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Manage Books</h4>
                                    <p className="text-xs text-gray-500">Add, edit, delete books</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 transition-all" />
                        </Link>

                        <Link href="/admin/pastpapers" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-green-50 p-3 rounded-2xl text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Manage Past Papers</h4>
                                    <p className="text-xs text-gray-500">Add, edit, delete past papers</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-green-600 transition-all" />
                        </Link>

                        <Link href="/admin/institutions" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-purple-50 p-3 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all">
                                    <GraduationCap className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Manage Institutions</h4>
                                    <p className="text-xs text-gray-500">Add, edit, delete institutions</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-purple-600 transition-all" />
                        </Link>

                        <Link href="/admin/jobs" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-orange-50 p-3 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Manage Jobs</h4>
                                    <p className="text-xs text-gray-500">Add, edit, delete jobs</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-orange-600 transition-all" />
                        </Link>

                        <Link href="/admin/competitions" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-yellow-50 p-3 rounded-2xl text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition-all">
                                    <Trophy className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Manage Competitions</h4>
                                    <p className="text-xs text-gray-500">Add, edit, delete competitions</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-yellow-600 transition-all" />
                        </Link>

                        <Link href="/admin/users" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-red-50 p-3 rounded-2xl text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Manage Users</h4>
                                    <p className="text-xs text-gray-500">View and manage user roles</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-red-600 transition-all" />
                        </Link>
                    </div>
                </div>
            )}

            {/* User Section - Always visible */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Stats / Status Cards */}
                <Card className="border-none shadow-premium rounded-3xl overflow-hidden group bg-linear-to-br from-primary-600 to-primary-700 text-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-bold text-primary-100 uppercase tracking-widest opacity-80">
                            Account Integrity
                        </CardTitle>
                        <Zap className="h-5 w-5 text-primary-200" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">Verified</div>
                        <p className="text-sm text-primary-100/70 mt-1">Full access to community features</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-premium rounded-3xl overflow-hidden group bg-white border border-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Learning Streak
                        </CardTitle>
                        <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-gray-900">12 Days</div>
                        <div className="mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[70%]" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-premium rounded-3xl overflow-hidden group bg-white border border-gray-100">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Notifications
                        </CardTitle>
                        <Bell className="h-5 w-5 text-primary-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-gray-900">0 New</div>
                        <p className="text-sm text-gray-500 mt-1">You are all caught up!</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <div className="h-8 w-1 bg-primary-600 rounded-full" />
                            Jump Back In
                        </h3>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <Link href="/institutions" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-50 p-3 rounded-2xl text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                    <Search className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Find Institutions</h4>
                                    <p className="text-xs text-gray-500">Search top colleges</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-primary-600 transition-all" />
                        </Link>

                        <Link href="/pastpapers" className="flex items-center justify-between p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-premium hover:border-primary-100 transition-all group">
                            <div className="flex items-center gap-4">
                                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    <Bookmark className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900">Past Papers</h4>
                                    <p className="text-xs text-gray-500">Review your history</p>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-blue-600 transition-all" />
                        </Link>
                    </div>
                </div>

                <Card className="border-none shadow-premium rounded-3xl overflow-hidden bg-primary-50 border-primary-100 flex flex-col justify-center text-center p-8 space-y-6">
                    <div className="bg-white p-4 rounded-full w-fit mx-auto shadow-sm">
                        <Star className="h-8 w-8 text-primary-600 fill-primary-600" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Unlock Excellence</h3>
                        <p className="text-gray-500 text-sm font-medium">Get exclusive access to premium study resources and real-time alerts.</p>
                    </div>
                    <Button className="w-full bg-primary-600 text-white hover:bg-primary-700 font-bold rounded-2xl h-12 shadow-lg shadow-primary-200 border-0">
                        Upgrade to Premium
                    </Button>
                </Card>
            </div>
        </div>
    )
}
