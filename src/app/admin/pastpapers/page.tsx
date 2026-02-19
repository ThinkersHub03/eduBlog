import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { PastPapersTable } from "@/components/past-papers-table"

const PAGE_SIZE = 12

type SearchParams = {
    q?: string
    board?: string
    class_level?: string
    year?: string
    page?: string
}

export default async function AdminPastPapersPage({ searchParams }: { searchParams: SearchParams }) {
    const supabase = await createClient()

    const q = (searchParams.q || '').trim()
    const board = (searchParams.board || '').trim()
    const classLevel = (searchParams.class_level || '').trim()
    const year = (searchParams.year || '').trim()
    const page = Math.max(1, Number(searchParams.page || 1) || 1)
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    let countQuery = supabase.from('past_papers').select('*', { count: 'exact', head: true })
    let dataQuery = supabase
        .from('past_papers')
        .select('id,subject,year,board,class_level,exam_shift,is_solved')
        .order('created_at', { ascending: false })
        .range(from, to)

    if (q) {
        const condition = `subject.ilike.%${q}%,board.ilike.%${q}%,class_level.ilike.%${q}%`
        countQuery = countQuery.or(condition)
        dataQuery = dataQuery.or(condition)
    }
    if (board) {
        countQuery = countQuery.ilike('board', `%${board}%`)
        dataQuery = dataQuery.ilike('board', `%${board}%`)
    }
    if (classLevel) {
        countQuery = countQuery.ilike('class_level', `%${classLevel}%`)
        dataQuery = dataQuery.ilike('class_level', `%${classLevel}%`)
    }
    if (year && /^\d{4}$/.test(year)) {
        countQuery = countQuery.eq('year', Number(year))
        dataQuery = dataQuery.eq('year', Number(year))
    }

    const [{ count }, { data, error }] = await Promise.all([countQuery, dataQuery])
    const totalCount = count ?? 0
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE))

    const baseParams = new URLSearchParams()
    if (q) baseParams.set('q', q)
    if (board) baseParams.set('board', board)
    if (classLevel) baseParams.set('class_level', classLevel)
    if (year) baseParams.set('year', year)

    return (
        <div className="space-y-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-gray-900">Past Papers</h1>
                    <p className="text-sm text-gray-500">Manage uploaded past papers from the unified past_papers table.</p>
                </div>
                <Link href="/admin/pastpapers/create">
                    <Button className="h-11 rounded-xl gap-2">
                        <Plus className="h-4 w-4" />
                        Add Past Paper
                    </Button>
                </Link>
            </div>

            <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div className="relative sm:col-span-2">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input name="q" defaultValue={q} placeholder="Search subject, board or class..." className="pl-9 h-11" />
                </div>
                <Input name="board" defaultValue={board} placeholder="Board" className="h-11" />
                <Input name="class_level" defaultValue={classLevel} placeholder="Class level" className="h-11" />
                <Input name="year" defaultValue={year} placeholder="Year" className="h-11" inputMode="numeric" />
                <Button type="submit" className="h-11 lg:col-start-5">Apply Filters</Button>
            </form>

            {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-700">{error.message}</p>
                </div>
            ) : (
                <PastPapersTable data={data || []} path="/admin/pastpapers" />
            )}

            <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-gray-500">
                    Showing {totalCount === 0 ? 0 : from + 1} - {Math.min(from + PAGE_SIZE, totalCount)} of {totalCount}
                </p>
                <div className="flex items-center gap-2">
                    <Link
                        href={`/admin/pastpapers?${(() => {
                            const params = new URLSearchParams(baseParams)
                            params.set('page', String(Math.max(1, page - 1)))
                            return params.toString()
                        })()}`}
                        aria-disabled={page <= 1}
                        className={`h-9 px-3 rounded-lg border text-sm flex items-center ${page <= 1 ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50'}`}
                    >
                        Previous
                    </Link>
                    <span className="text-sm text-gray-600">Page {page} of {totalPages}</span>
                    <Link
                        href={`/admin/pastpapers?${(() => {
                            const params = new URLSearchParams(baseParams)
                            params.set('page', String(Math.min(totalPages, page + 1)))
                            return params.toString()
                        })()}`}
                        aria-disabled={page >= totalPages}
                        className={`h-9 px-3 rounded-lg border text-sm flex items-center ${page >= totalPages ? 'pointer-events-none opacity-40' : 'hover:bg-gray-50'}`}
                    >
                        Next
                    </Link>
                </div>
            </div>
        </div>
    )
}
