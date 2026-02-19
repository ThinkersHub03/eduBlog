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
import { Briefcase, Plus, Search, MapPin, Calendar, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AdminDeleteButton } from "@/components/admin-delete-button"

export default async function AdminJobsPage() {
    const supabase = await createClient()
    const { data: jobs } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Career Portal</h2>
                    <p className="text-gray-500 font-medium">Post opportunities and manage employment listings for the community.</p>
                </div>
                <Link href="/admin/jobs/create">
                    <Button className="h-12 px-6 rounded-2xl font-bold bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200 gap-2 border-0">
                        <Plus className="h-5 w-5" />
                        Post Opportunity
                    </Button>
                </Link>
            </div>

            <div className="glass p-6 rounded-3xl border border-gray-100 shadow-premium bg-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Find roles by title, company, or city..."
                            className="pl-12 h-12 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Opportunity</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Organization</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Deadline</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs?.map((job) => (
                                <TableRow key={job.id} className="hover:bg-gray-50/30 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 leading-tight">{job.title}</span>
                                            <div className="flex items-center gap-1.5 text-[10px] font-black text-primary-600 uppercase tracking-widest pt-1">
                                                <Briefcase className="h-3 w-3" />
                                                {job.category || 'General'}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="font-bold text-gray-700 text-sm">{job.company}</span>
                                            <div className="flex items-center gap-1 text-gray-400 font-bold text-[10px] uppercase tracking-tighter">
                                                <MapPin className="h-3 w-3" />
                                                {job.city}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={`flex items-center gap-2 font-bold text-xs uppercase tracking-tighter px-3 py-1.5 rounded-xl border w-fit ${job.last_date && new Date(job.last_date) < new Date()
                                                ? 'bg-red-50 text-red-600 border-red-100'
                                                : 'bg-green-50 text-green-600 border-green-100'
                                            }`}>
                                            <Calendar className="h-3.5 w-3.5" />
                                            {job.last_date ? new Date(job.last_date).toLocaleDateString() : 'Rolling'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/jobs/${job.id}`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-gray-400 hover:text-primary-600 hover:bg-primary-50">
                                                    <ExternalLink className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AdminDeleteButton table="jobs" id={job.id} path="/admin/jobs" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!jobs?.length && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-48">
                                        <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                                            <Briefcase className="h-10 w-10 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No career opportunities found.</p>
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
