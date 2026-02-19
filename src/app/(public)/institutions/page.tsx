import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/ui/listing-card"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Landmark, MapPin, Sparkles } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Institutions | EduPortal",
    description: "Browse top universities, colleges, and schools.",
}

export default async function InstitutionsPage() {
    const supabase = await createClient()
    const { data: institutions } = await supabase.from('institutions').select('*').order('created_at', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Page Header */}
            <div className="relative bg-primary-600 rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-primary-500 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-primary-700 rounded-full blur-3xl opacity-30" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-primary-100 uppercase tracking-widest mb-4">
                        <Landmark className="h-4 w-4" />
                        Our Partners
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Discover Your Ideal <br />Learning Environment
                    </h1>
                    <p className="text-lg leading-relaxed text-primary-50">
                        Explore comprehensive profiles of top-rated universities, colleges, and training centers worldwide.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="glass p-6 rounded-2xl shadow-premium -mt-20 relative z-20 border border-white/40">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search by name, city, or discipline..."
                            className="pl-12 h-14 bg-white/50 border-gray-100 rounded-xl focus:bg-white transition-all text-lg shadow-sm"
                        />
                    </div>
                    <Button className="h-14 px-10 text-lg font-bold rounded-xl shadow-lg shadow-primary-200">
                        Search Now
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <SectionHeader title="Featured Institutions" />
                    <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
                        <Sparkles className="h-4 w-4" />
                        {institutions?.length || 0} Registered Partners
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {institutions?.map((inst) => (
                        <ListingCard
                            key={inst.id}
                            title={inst.name}
                            subtitle={inst.city || "Location not specified"}
                            location={inst.city}
                            imageSrc={inst.logo_url}
                            href={`/institutions/${inst.id}`}
                            actionLabel="View Profile"
                            type="Institution"
                            className="hover:-translate-y-1 transition-transform"
                        />
                    ))}
                    {!institutions?.length && (
                        <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <Landmark className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900">No Institutions Found</h3>
                            <p className="text-gray-500 max-w-sm mx-auto mt-2">Try adjusting your search or check back later.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
