import { createClient } from "@/lib/supabase/server"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { UserRoleSelect } from "./user-role-select"
import { Search, ShieldAlert, UserCheck, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"

export default async function AdminUsersPage() {
    const supabase = await createClient()

    // Fetch users from public.users table
    const { data: users } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">User Management</h2>
                    <p className="text-gray-500 font-medium">Oversee the platform's user base and manage administrative privileges.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-bold text-gray-600 uppercase tracking-widest">
                        {users?.length || 0} Registered Users
                    </span>
                </div>
            </div>

            <div className="glass p-6 rounded-3xl border border-gray-100 shadow-premium bg-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search users by name or ID..."
                            className="pl-12 h-12 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Identity</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Authorization</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Registration</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter text-right">Settings</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user.id} className="hover:bg-gray-50/30 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border-2 border-white shadow-sm ring-1 ring-gray-100">
                                                <AvatarImage src={user.avatar_url} />
                                                <AvatarFallback className="bg-primary-50 text-primary-600 font-black">
                                                    {user.full_name?.charAt(0) || 'U'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 leading-tight">{user.full_name || 'Anonymous User'}</span>
                                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{user.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {user.role === 'admin' ? (
                                            <Badge className="bg-indigo-600 text-white border-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest gap-1">
                                                <ShieldAlert className="h-3 w-3" />
                                                Administrator
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-gray-100 text-gray-600 border-0 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest gap-1">
                                                <UserCheck className="h-3 w-3" />
                                                Standard User
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-tighter">
                                            <Calendar className="h-3.5 w-3.5 opacity-40 text-primary-600" />
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <UserRoleSelect userId={user.id} currentRole={user.role} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
