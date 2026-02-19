import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/ui/listing-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Globe, Newspaper, Flame, Rocket } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Blog & Updates | EduPortal",
    description: "Educational news, career insights, and campus updates.",
}

export default async function BlogPage() {
    const supabase = await createClient()
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Page Header */}
            <div className="relative bg-primary-900 rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-primary-600 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-primary-400 rounded-full blur-3xl opacity-10" />

                <div className="relative z-10 max-w-2xl text-center md:text-left mx-auto md:mx-0">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-primary-100 uppercase tracking-widest mb-4">
                        <Newspaper className="h-4 w-4" />
                        EduPortal Insights
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                        Stay Informed, <br />Stay Ahead
                    </h1>
                    <p className="text-primary-100/80 text-lg leading-relaxed mb-8">
                        The ultimate destination for educational news, study resources, and career development strategies.
                    </p>

                    <div className="max-w-md relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary-400 transition-colors" />
                        <Input
                            placeholder="Search articles & guides..."
                            className="pl-12 h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl focus:bg-white focus:text-gray-900 transition-all text-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>

            {/* Featured Section Label */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-1 bg-primary-600 rounded-full" />
                    <h2 className="text-2xl font-bold text-gray-900 italic">Latest Stories</h2>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 px-4 py-1.5 rounded-full border border-primary-100">
                    <Flame className="h-4 w-4 animate-pulse" />
                    Trending Now
                </div>
            </div>

            {/* Blog Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts?.map((post) => (
                    <ListingCard
                        key={post.id}
                        title={post.title}
                        subtitle={new Date(post.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })}
                        type="Article"
                        href={`/blog/${post.slug}`}
                        actionLabel="Read Full Story"
                        imageSrc={post.featured_image || 'https://images.unsplash.com/photo-1454165833767-027508493b69?q=80&w=2070&auto=format&fit=crop'}
                        className="h-full border-b-4 border-b-primary-500/0 hover:border-b-primary-500 transition-all hover:bg-white hover:shadow-premium"
                        meta="5 min read"
                    />
                ))}
                {!posts?.length && (
                    <div className="col-span-full py-24 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <Globe className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900">No Articles Found</h3>
                        <p className="text-gray-500 max-w-sm mx-auto mt-2">Our writers are working on something amazing. Please check back in a few hours for fresh insights.</p>
                        <Button variant="outline" className="mt-8 rounded-xl font-bold border-gray-200">
                            Refresh Feed
                        </Button>
                    </div>
                )}
            </div>

            {/* Newsletter Minimalist Call to Action */}
            <div className="bg-primary-50 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 border border-primary-100">
                <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Rocket className="h-6 w-6 text-primary-600" />
                        Get EduPortal Weekly
                    </h3>
                    <p className="text-gray-500 font-medium">Weekly digest of top news and expert career advice.</p>
                </div>
                <div className="flex w-full md:w-auto gap-3">
                    <Input placeholder="name@email.com" className="h-12 bg-white border-gray-200 rounded-xl px-6 md:w-80" />
                    <Button className="h-12 px-8 font-bold rounded-xl shadow-lg shadow-primary-200">Join</Button>
                </div>
            </div>
        </div>
    )
}
