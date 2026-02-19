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
import { Building2, Plus, Search, MapPin, Globe, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AdminDeleteButton } from "@/components/admin-delete-button"

export default async function AdminInstitutionsPage() {
    const supabase = await createClient()
    const { data: institutions } = await supabase.from('institutions').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Educational Registry</h2>
                    <p className="text-gray-500 font-medium">Manage institutional profiles, locations, and portal connections.</p>
                </div>
                <Link href="/admin/institutions/create">
                    <Button className="h-12 px-6 rounded-2xl font-bold bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200 gap-2 border-0">
                        <Plus className="h-5 w-5" />
                        Register Institution
                    </Button>
                </Link>
            </div>

            <div className="glass p-6 rounded-3xl border border-gray-100 shadow-premium bg-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search by name, city, or ID..."
                            className="pl-12 h-12 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Institution</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Geography</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Infrastructure</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {institutions?.map((inst) => (
                                <TableRow key={inst.id} className="hover:bg-gray-50/30 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center p-1 overflow-hidden shrink-0">
                                                {inst.logo_url ? (
                                                    <img src={inst.logo_url} alt="" className="w-full h-full object-contain" />
                                                ) : (
                                                    <Building2 className="h-5 w-5 text-gray-300" />
                                                )}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-gray-900 leading-tight">{inst.name}</span>
                                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">{inst.id}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-0.5">
                                            <div className="flex items-center gap-1.5 text-gray-600 font-bold text-xs">
                                                <MapPin className="h-3.5 w-3.5 text-primary-600 opacity-50" />
                                                {inst.city || 'N/A'}
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest pl-5">{inst.address?.substring(0, 20)}...</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {inst.website ? (
                                            <a href={inst.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs uppercase tracking-tighter hover:underline">
                                                <Globe className="h-3.5 w-3.5" />
                                                Visit Portal
                                            </a>
                                        ) : (
                                            <span className="text-gray-300 font-bold text-[10px] uppercase tracking-widest">No Digital Identity</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/institutions/${inst.id}`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-gray-400 hover:text-primary-600 hover:bg-primary-50">
                                                    <Building2 className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AdminDeleteButton table="institutions" id={inst.id} path="/admin/institutions" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!institutions?.length && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-48">
                                        <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                                            <Building2 className="h-10 w-10 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No institutions registered yet.</p>
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
