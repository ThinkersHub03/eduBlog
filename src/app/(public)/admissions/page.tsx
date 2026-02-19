import { createClient } from "@/lib/supabase/server"
import { ListingCard } from "@/components/ui/listing-card"
import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, GraduationCap, Calendar, Zap } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Admissions | EduPortal",
    description: "Latest university and college admissions updates.",
}

export default async function AdmissionsPage() {
    const supabase = await createClient()
    // For now, using institutions as a proxy or filtering for 'admission' related items if possible
    // Ideally we have an 'admissions' table. Let's assume institutions have admission fields or we use institucional updates.
    // I'll query institutions for now.
    const { data: admissions } = await supabase.from('institutions').select('*').order('created_at', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Page Header */}
            <div className="relative bg-primary-600 rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mr-24 -mt-24 h-80 w-80 bg-primary-400 rounded-full blur-3xl opacity-30" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-primary-100 uppercase tracking-widest mb-4">
                        <Zap className="h-4 w-4" />
                        Live Admissions 2026
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                        Unlock Your Future <br />Apply Today
                    </h1>
                    <p className="text-primary-100/90 text-lg leading-relaxed">
                        Don't miss out on the most prestigious academic programs. Track deadlines, requirements, and apply directly to top institutions.
                    </p>
                </div>
            </div>

            {/* Filter Section */}
            <div className="glass p-6 rounded-2xl shadow-premium -mt-20 relative z-20 border border-white/40">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search by degree, university, or city..."
                            className="pl-12 h-14 bg-white/50 border-gray-100 rounded-xl focus:bg-white transition-all text-lg shadow-sm"
                        />
                    </div>
                    <Button className="h-14 text-lg font-bold rounded-xl shadow-lg shadow-primary-200">
                        Search Programs
                    </Button>
                </div>
            </div>

            {/* List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <SectionHeader title="Latest Admission Alerts" />
                    <div className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Closing Soon
                    </div>
                </div>

                <div className="grid gap-6">
                    {admissions?.map((item) => (
                        <ListingCard
                            key={item.id}
                            title={item.name}
                            subtitle={`Fall 2026 Admissions Open - All Faculty`}
                            meta="Admissions Open"
                            location={item.city}
                            imageSrc={item.logo_url}
                            href={`/institutions/${item.id}`}
                            actionLabel="Apply Now"
                            type="Admissions"
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
