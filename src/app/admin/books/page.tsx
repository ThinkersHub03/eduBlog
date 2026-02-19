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
import { BookOpen, Plus, Edit, ChevronLeft, ChevronRight } from "lucide-react"
import { AdminDeleteButton } from "@/components/admin-delete-button"

const PAGE_SIZE = 10

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function AdminBooksPage({ searchParams }: Props) {
    const { page: pageParam } = await searchParams
    const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    const supabase = await createClient()
    const { data: books, count } = await supabase
        .from('books')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)

    const totalPages = Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE))
    const hasPrev = page > 1
    const hasNext = page < totalPages

    return (
        <div className="space-y-8 py-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 uppercase">Manage Books</h2>
                    <p className="text-gray-500 font-medium">
                        Add, edit, or remove resources from the digital library.
                        {count !== null && (
                            <span className="ml-2 text-xs font-black text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full border border-primary-100">
                                {count} total
                            </span>
                        )}
                    </p>
                </div>
                <Link href="/admin/books/create">
                    <Button className="h-12 px-6 rounded-2xl font-bold bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-200 gap-2">
                        <Plus className="h-5 w-5" />
                        Add New Book
                    </Button>
                </Link>
            </div>

            {/* Table card */}
            <div className="glass p-6 rounded-3xl border border-gray-100 shadow-premium bg-white space-y-4">

                <div className="rounded-2xl border border-gray-100 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Title</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter hidden md:table-cell">Class Level</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter">Subject</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter hidden lg:table-cell">Board</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter hidden lg:table-cell">Added</TableHead>
                                <TableHead className="font-bold text-gray-900 uppercase tracking-tighter text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {books?.map((book) => (
                                <TableRow key={book.id} className="hover:bg-gray-50/30 transition-colors">
                                    <TableCell>
                                        <div>
                                            <p className="font-bold text-gray-900 truncate max-w-[200px] md:max-w-none">{book.title}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-500 hidden md:table-cell">
                                        {book.class_level}
                                    </TableCell>
                                    <TableCell>
                                        <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-primary-100">
                                            {book.subject}
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-medium text-gray-500 hidden lg:table-cell">
                                        {book.board}
                                    </TableCell>
                                    <TableCell className="text-gray-400 text-xs font-medium hidden lg:table-cell">
                                        {new Date(book.created_at).toLocaleDateString('en-GB', {
                                            day: '2-digit',
                                            month: 'short',
                                            year: 'numeric',
                                        })}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/admin/books/${book.id}`}>
                                                <button
                                                    type="button"
                                                    aria-label={`Edit ${book.title}`}
                                                    className="h-9 w-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </Link>
                                            <AdminDeleteButton
                                                table="books"
                                                id={book.id}
                                                path="/admin/books"
                                                title={book.title}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {!books?.length && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-48">
                                        <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                                            <BookOpen className="h-10 w-10 opacity-20" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No books found in the library.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between pt-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                            Page {page} of {totalPages}
                        </p>
                        <div className="flex items-center gap-2">
                            <Link
                                href={hasPrev ? `/admin/books?page=${page - 1}` : '#'}
                                aria-disabled={!hasPrev}
                            >
                                <button
                                    type="button"
                                    disabled={!hasPrev}
                                    className="h-9 px-4 rounded-xl text-sm font-bold flex items-center gap-1.5 border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
                                    style={{ pointerEvents: !hasPrev ? 'none' : 'auto' }}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </button>
                            </Link>

                            {/* Page numbers — show prev, current, next */}
                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                    .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                                        if (idx > 0 && p - (arr[idx - 1] as number) > 1) acc.push('...')
                                        acc.push(p)
                                        return acc
                                    }, [])
                                    .map((item, idx) =>
                                        item === '...'
                                            ? <span key={`ellipsis-${idx}`} className="text-gray-400 text-sm px-1">…</span>
                                            : (
                                                <Link key={item} href={`/admin/books?page=${item}`}>
                                                    <button
                                                        type="button"
                                                        className={`h-9 w-9 rounded-xl text-sm font-bold transition-colors ${item === page
                                                            ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                                                            : 'text-gray-500 hover:bg-gray-100'
                                                            }`}
                                                    >
                                                        {item}
                                                    </button>
                                                </Link>
                                            )
                                    )}
                            </div>

                            <Link
                                href={hasNext ? `/admin/books?page=${page + 1}` : '#'}
                                aria-disabled={!hasNext}
                            >
                                <button
                                    type="button"
                                    disabled={!hasNext}
                                    className="h-9 px-4 rounded-xl text-sm font-bold flex items-center gap-1.5 border border-gray-100 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40"
                                    style={{ pointerEvents: !hasNext ? 'none' : 'auto' }}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
