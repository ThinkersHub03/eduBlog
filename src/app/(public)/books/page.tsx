import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/ui/listing-card"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, BookOpen, Library, Bookmark, Sparkles } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Books | EduPortal",
    description: "Download academic books and resources.",
}

export default async function PublicBooksPage() {
    const supabase = await createClient()
    const { data: books, error } = await supabase.from('books').select('*').order('created_at', { ascending: false })

    if (error) {
        console.error("Error fetching books:", error)
    }

    return (
        <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Page Header */}
            <div className="relative bg-[#1e293b] rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-primary-600 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-indigo-500 rounded-full blur-3xl opacity-10" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-primary-100 uppercase tracking-widest mb-4">
                        <Library className="h-4 w-4" />
                        Digital Library
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Your Gateway to <br />Unlimited Knowledge
                    </h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Explore our curated collection of textbooks, reference guides, and educational materials for all levels.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="glass p-6 rounded-2xl shadow-premium -mt-20 relative z-20 border border-white/40">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Find your next read (Subject, Author, Title)..."
                            className="pl-12 h-14 bg-white/50 border-gray-100 rounded-xl focus:bg-white transition-all text-lg shadow-sm"
                        />
                    </div>
                    <Button className="h-14 px-10 text-lg font-bold rounded-xl shadow-lg shadow-primary-200 gap-2">
                        Browse Library
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <SectionHeader title="Featured Publications" />
                    <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
                        <Sparkles className="h-4 w-4" />
                        New Arrivals
                    </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {books?.map((book) => (
                        <ListingCard
                            key={book.id}
                            title={book.title}
                            subtitle={book.author}
                            type={book.subject}
                            href={`/books/${book.id}`}
                            actionLabel="Download PDF"
                            imageSrc={book.cover_url}
                            className="hover:-translate-y-2 transition-transform duration-300"
                            meta="Available"
                        />
                    ))}
                    {!books?.length && (
                        <div className="col-span-full py-24 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <BookOpen className="h-16 w-16 text-gray-200 mx-auto mb-6" />
                            <h3 className="text-xl font-bold text-gray-900">Library is Currently Empty</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mt-2">We're updating our collection. Please check back soon for new educational resources.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
