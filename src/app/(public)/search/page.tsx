import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/ui/listing-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Search Results | EduPortal",
    description: "Search across past papers, jobs, institutions, books, and posts.",
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
    const query = searchParams.q
    const supabase = await createClient()

    const [
        { data: pastPapers },
        { data: jobs },
        { data: institutions },
        { data: posts },
        { data: books },
    ] = await Promise.all([
        supabase.from('past_papers').select('*').ilike('subject', `%${query || ''}%`).limit(6),
        supabase.from('jobs').select('*').ilike('title', `%${query || ''}%`).limit(6),
        supabase.from('institutions').select('*').ilike('name', `%${query || ''}%`).limit(6),
        supabase.from('posts').select('*').ilike('title', `%${query || ''}%`).limit(6),
        supabase.from('books').select('*').ilike('title', `%${query || ''}%`).limit(6),
    ])

    const totalResults =
        (pastPapers?.length || 0) +
        (jobs?.length || 0) +
        (institutions?.length || 0) +
        (posts?.length || 0) +
        (books?.length || 0)

    return (
        <div className="container mx-auto px-4 py-10 space-y-10">
            <div className="max-w-4xl mx-auto text-center space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
                    Search <span className="text-primary-600">resources</span>
                </h1>
                <p className="text-gray-500 text-lg font-medium">
                    Search through past papers, jobs, institutions, books, and posts.
                </p>

                <form action="/search" className="relative group max-w-2xl mx-auto">
                    <div className="relative bg-white p-2 rounded-2xl shadow-xl flex items-center border border-gray-100">
                        <Search className="ml-4 h-6 w-6 text-gray-400" />
                        <Input
                            name="q"
                            defaultValue={query}
                            placeholder="Type keywords..."
                            className="border-none focus-visible:ring-0 text-lg h-14 bg-transparent placeholder:text-gray-400 flex-1"
                        />
                        <Button type="submit" className="h-14 px-8 rounded-xl font-bold bg-primary-600 text-white">
                            Search
                        </Button>
                    </div>
                </form>

                {query && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm font-semibold text-gray-600">
                        <Sparkles className="h-4 w-4 text-primary-500" />
                        Found <span className="text-primary-600">{totalResults}</span> matches for <span className="text-primary-600">{query}</span>
                    </div>
                )}
            </div>

            {query ? (
                <div className="space-y-10">
                    {pastPapers?.length ? (
                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Past Papers</h3>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {pastPapers.map((item) => (
                                    <ListingCard
                                        key={item.id}
                                        title={item.subject}
                                        subtitle={`${item.board} · ${item.class_level}`}
                                        type={`${item.year}`}
                                        href={`/pastpapers/${item.id}`}
                                    />
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {jobs?.length ? (
                        <section className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">Jobs</h3>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {jobs.map((item) => (
                                    <ListingCard key={item.id} title={item.title} subtitle={item.company} type="Job" href={`/jobs/${item.id}`} />
                                ))}
                            </div>
                        </section>
                    ) : null}

                    {!totalResults && (
                        <div className="py-24 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-900">No results found for <span className="text-primary-600">{query}</span></h3>
                            <p className="text-gray-500 max-w-md mx-auto mt-2">Try broader keywords.</p>
                        </div>
                    )}
                </div>
            ) : (
                <div className="py-24 text-center bg-primary-50/30 rounded-3xl border border-primary-100 max-w-2xl mx-auto">
                    <h3 className="text-xl font-bold text-gray-900">Discovery Mode</h3>
                    <p className="text-gray-500 mt-2">Enter keywords above to browse the database.</p>
                </div>
            )}
        </div>
    )
}
