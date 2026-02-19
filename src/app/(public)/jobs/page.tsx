import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/ui/listing-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Briefcase, Sparkles, TrendingUp, Filter } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Jobs | EduPortal",
    description: "Find the latest job openings in education.",
}

export default async function PublicJobsPage() {
    const supabase = await createClient()
    const { data: jobs } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Page Header */}
            <div className="relative bg-primary-900 rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-primary-600 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-primary-400 rounded-full blur-3xl opacity-10" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-primary-100 uppercase tracking-widest mb-4">
                        <TrendingUp className="h-4 w-4" />
                        Career Opportunities
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Launch Your Career <br />in Education
                    </h1>
                    <p className="text-primary-100/80 text-lg leading-relaxed">
                        Browse thousands of high-impact roles, from tenure-track positions to administrative leadership across the globe.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="glass p-6 rounded-2xl shadow-premium -mt-20 relative z-20 border border-white/40">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2 relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Job title or keywords..."
                            className="pl-12 h-14 bg-white/50 border-gray-100 rounded-xl focus:bg-white transition-all text-lg shadow-sm"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Location..."
                            className="pl-12 h-14 bg-white/50 border-gray-100 rounded-xl focus:bg-white transition-all text-lg shadow-sm"
                        />
                    </div>
                    <Button className="h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary-200">
                        Find Jobs
                    </Button>
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-4">
                {/* Sidebar Filters */}
                <aside className="hidden lg:block space-y-8">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                        <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                            <Filter className="h-4 w-4 text-primary-600" />
                            Filters
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Categories</h4>
                                <div className="space-y-3">
                                    {['Teaching', 'Research', 'Administration', 'Technical', 'Management'].map((cat) => (
                                        <label key={cat} className="flex items-center gap-3 text-sm font-medium text-gray-600 hover:text-primary-600 cursor-pointer group">
                                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 transition-all" />
                                            <span className="group-hover:translate-x-1 transition-transform">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Results */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900">Latest Openings</h2>
                        <span className="text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg flex items-center gap-2">
                            <Sparkles className="h-4 w-4" />
                            {jobs?.length || 0} jobs found
                        </span>
                    </div>

                    <div className="space-y-4">
                        {jobs?.map((job) => (
                            <ListingCard
                                key={job.id}
                                title={job.title}
                                subtitle={job.company}
                                location={job.city}
                                type={job.category}
                                deadline={job.last_date ? new Date(job.last_date).toLocaleDateString() : undefined}
                                href={`/jobs/${job.id}`}
                                actionLabel="Apply Now"
                                meta="Urgent"
                            />
                        ))}
                        {!jobs?.length && (
                            <div className="py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                                <Search className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900">No Jobs Found</h3>
                                <p className="text-gray-500 max-w-sm mx-auto mt-2">Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
