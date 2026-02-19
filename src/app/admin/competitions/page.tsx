import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Trophy, Plus, Search, Trash2, Edit, CalendarDays } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AdminDeleteButton } from "@/components/admin-delete-button"

export default async function AdminCompetitionsPage() {
    const supabase = await createClient()
    const { data: competitions } = await supabase.from('competitions').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Competitions</h2>
                    <p className="text-gray-500 font-medium">Manage upcoming events, olympiads, and academic contests.</p>
                </div>
                <Link href="/admin/competitions/create">
                    <Button className="h-12 px-6 rounded-2xl font-bold bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200 gap-2 border-0">
                        <Plus className="h-5 w-5" />
                        Host Competition
                    </Button>
                </Link>
            </div>

            <div className="glass p-6 rounded-3xl border border-gray-100 shadow-premium bg-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Filter events..."
                            className="pl-12 h-12 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Event Title</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Start Date</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {competitions?.map((comp) => (
                                <TableRow key={comp.id} className="hover:bg-gray-50/30 transition-colors">
                                    <TableCell className="font-bold text-gray-900">{comp.title}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-primary-600 font-bold">
                                            <CalendarDays className="h-4 w-4 opacity-50" />
                                            {comp.start_date ? new Date(comp.start_date).toLocaleDateString() : 'Draft'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/competitions/${comp.id}`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-gray-400 hover:text-primary-600 hover:bg-primary-50">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AdminDeleteButton table="competitions" id={comp.id} path="/admin/competitions" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!competitions?.length && (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center h-48">
                                        <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                                            <Trophy className="h-10 w-10 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No active competitions.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}
