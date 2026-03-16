import Link from "next/link"
import { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { getBooksFilterOptions, normalizeQueryParam } from "@/lib/books-search"
import BookInfoSection from "@/components/BookInfoSection"
import BookDataInfoSection from "@/components/BookDataInfoSection"

export const metadata: Metadata = {
    title: "Books | EduPortal",
    description: "Browse and download academic books by board, class level, and subject.",
}

type SearchParams = {
    board?: string
    class_level?: string
    subject?: string
    page?: string
}

export default async function BooksPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
    const supabase: any = await createClient();
    const params = await searchParams;

    const board = normalizeQueryParam(params.board);
    const classLevel = normalizeQueryParam(params.class_level);
    const subject = normalizeQueryParam(params.subject);

    // Fetch all books (no pagination)
    let dataQuery = supabase
        .from('books')
        .select('id,title,subject,board,class_level,file_url,created_at', { count: 'exact' })
        .order('created_at', { ascending: false });

    if (board) {
        dataQuery = dataQuery.eq('board', board);
    }
    if (classLevel) {
        dataQuery = dataQuery.eq('class_level', classLevel);
    }
    if (subject) {
        dataQuery = dataQuery.eq('subject', subject);
    }

    const [{ boards, classLevels, subjects }, { data, error }] = await Promise.all([
        getBooksFilterOptions(supabase),
        dataQuery,
    ]);

    return (
        <div className="w-full mx-auto bg-white">
            <section className="relative overflow-hidden bg-green-500 p-8 text-white shadow-2xl sm:p-10">
                <div
                    className="pointer-events-none absolute inset-0 opacity-35"
                    style={{
                        background:
                            'radial-gradient(1200px circle at 50% 0%, rgba(255,255,255,0.55), transparent 55%), radial-gradient(900px circle at 0% 100%, rgba(255,255,255,0.25), transparent 60%)',
                    }}
                />

                <div className="relative mx-auto max-w-5xl space-y-6">
                    <div className="space-y-2 text-center">
                        <h1 className="text-pretty text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                            Academic Books Collection
                        </h1>
                        <p className="mx-auto max-w-2xl text-sm text-white/90 sm:text-base">
                            Filter by board, class, and subject — then search to find the right book fast.
                        </p>
                    </div>

                    <form method="GET" className="mx-auto w-full max-w-2xl">
                        <div className="rounded-2xl bg-white/95 p-2 shadow-lg ring-1 ring-black/5 backdrop-blur">
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_1fr_1fr_auto] md:gap-0 md:items-stretch">
                                <div className="md:pr-1.5 md:py-0.5">
                                    <label className="sr-only" htmlFor="board">Board</label>
                                    <select
                                        id="board"
                                        name="board"
                                        defaultValue={board}
                                        className="h-11 w-full rounded-xl border-0 bg-transparent px-3 text-sm text-gray-900 shadow-none focus:outline-none md:h-10 md:rounded-none"
                                    >
                                        <option value="">All boards</option>
                                        {boards.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:border-l md:border-gray-200 md:px-3 md:py-0.5">
                                    <label className="sr-only" htmlFor="class_level">Class level</label>
                                    <select
                                        id="class_level"
                                        name="class_level"
                                        defaultValue={classLevel}
                                        className="h-11 w-full rounded-xl border-0 bg-transparent px-3 text-sm text-gray-900 shadow-none focus:outline-none md:h-10 md:rounded-none"
                                    >
                                        <option value="">All classes</option>
                                        {classLevels.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:border-l md:border-gray-200 md:px-3 md:py-0.5">
                                    <label className="sr-only" htmlFor="subject">Subject</label>
                                    <select
                                        id="subject"
                                        name="subject"
                                        defaultValue={subject}
                                        className="h-11 w-full rounded-xl border-0 bg-transparent px-3 text-sm text-gray-900 shadow-none focus:outline-none md:h-10 md:rounded-none"
                                    >
                                        <option value="">All subjects</option>
                                        {subjects.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <Button
                                    type="submit"
                                    className="h-11 w-full bg-emerald-600 hover:bg-emerald-700 md:h-10 md:w-12 md:px-0"
                                >
                                    <Search className="h-4 w-4" />
                                    <span className="ml-2 md:sr-only">Search</span>
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>


                        {error ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-700">{error.message}</p>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center p-6">
                    {(data || []).map((item: any) => (
                        <div
                            key={item.id}
                            className="bg-white border border-gray-200 flex-wrap w-full sm:w-auto sm:flex-row flex-col rounded-xl shadow-sm overflow-hidden flex items-center p-2 hover:shadow-lg transition-shadow duration-200 cursor-pointer relative"
                        >
                            <a href={`/books/${item.id}`} className="absolute inset-0 z-10 w-full h-full"></a>
                            <div className="w-55 h-27.5 shrink-0 flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
                                {item.file_url ? (
                                    <embed
                                        src={item.file_url}
                                        type="application/pdf"
                                        width="100%"
                                        height="100%"
                                        className="rounded-md"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No PDF</div>
                                )}
                            </div>
                            <div className="flex flex-col flex-1 justify-between h-full px-1 py-2 shrink-0">
                                <div className="text-xs text-gray-500 font-semibold mb-1">Subject: {item.subject}</div>
                                <div className="text-[13px] font-bold leading-tight mb-1 text-black">
                                    {item.title}
                                </div>
                                <div className="text-xs text-gray-500 font-medium mb-2">{item.board} - Class {item.class_level}</div>
                            </div>
                        </div>
                    ))}
                    {!data?.length && (
                        <div className="col-span-full rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
                            <p className="text-gray-500">No books found for the selected filters.</p>
                        </div>
                    )}
                </div>
            )}

            {/* Introductory Info Section */}
            <BookInfoSection />
            {/* Data Details Section */}
            <BookDataInfoSection />


        </div>
    )
}
