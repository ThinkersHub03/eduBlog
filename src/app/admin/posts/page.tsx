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
import { Edit, Eye, Plus, Search, FileText, Sparkles, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { AdminDeleteButton } from "@/components/admin-delete-button"

export default async function AdminPostsPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false })

    return (
        <div className="space-y-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Editorial Hub</h2>
                    <p className="text-gray-500 font-medium">Draft, publish, and manage your platform's blog content.</p>
                </div>
                <Link href="/admin/posts/create">
                    <Button className="h-12 px-6 rounded-2xl font-bold bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200 gap-2">
                        <Plus className="h-5 w-5" />
                        Compose Article
                    </Button>
                </Link>
            </div>

            <div className="glass p-6 rounded-3xl border border-gray-100 shadow-premium bg-white">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Find articles by title or slug..."
                            className="pl-12 h-12 bg-gray-50/50 border-gray-100 rounded-2xl focus:bg-white transition-all shadow-sm"
                        />
                    </div>
                </div>

                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Article</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Visibility</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Published</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {posts?.map((post) => (
                                <TableRow key={post.id} className="hover:bg-gray-50/30 transition-colors">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 leading-tight">{post.title}</span>
                                            <span className="text-xs text-gray-400 font-medium pt-0.5">/{post.slug}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${post.published
                                                ? 'bg-green-50 text-green-700 border-green-100'
                                                : 'bg-amber-50 text-amber-700 border-amber-100'
                                            }`}>
                                            <div className={`h-1.5 w-1.5 rounded-full ${post.published ? 'bg-green-500' : 'bg-amber-500'}`} />
                                            {post.published ? 'Live On Site' : 'In Draft'}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-tighter">
                                            <Sparkles className="h-3.5 w-3.5 opacity-40 text-primary-600" />
                                            {new Date(post.created_at).toLocaleDateString()}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {post.published && (
                                                <Link href={`/blog/${post.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50">
                                                        <Globe className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                            <Link href={`/admin/posts/${post.id}`}>
                                                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-gray-400 hover:text-primary-600 hover:bg-primary-50">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <AdminDeleteButton table="posts" id={post.id} path="/admin/posts" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {!posts?.length && (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-48">
                                        <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                                            <FileText className="h-10 w-10 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No editorial content discovered.</p>
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
