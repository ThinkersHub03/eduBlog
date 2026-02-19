import { Input } from "@/components/ui/input"
import { QuickAccessCard } from "@/components/ui/quick-access-card"
import { SectionHeader } from "@/components/ui/section-header"
import { ListingCard } from "@/components/ui/listing-card"
import { Search, StickyNote, BookOpen, Award, Briefcase, Landmark, Flame } from "lucide-react"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50/50">
            {/* Hero Section */}
            <section className="relative bg-primary-600 text-white pt-12 pb-24 px-4 rounded-b-4xl shadow-2xl shadow-primary-900/20 mb-8 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 -mr-24 -mt-24 h-96 w-96 bg-primary-500 rounded-full blur-3xl opacity-30 animate-pulse" />
                <div className="absolute bottom-0 left-0 -ml-24 -mb-24 h-96 w-96 bg-primary-700 rounded-full blur-3xl opacity-30 animate-pulse" />

                <div className="container mx-auto max-w-2xl text-center space-y-6 relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-sm font-medium backdrop-blur-md mb-2">
                        <Flame className="h-4 w-4 text-orange-300" />
                        <span>Trusted by 10k+ Students</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        Your Gateway to <br />
                        <span className="text-primary-100">Academic Excellence</span>
                    </h1>
                    <p className="text-primary-100 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                        Access premium resources, latest job alerts, and expert career guidance all in one place.
                    </p>

                    <div className="relative max-w-xl mx-auto mt-8 group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-6 w-6 text-gray-400 group-focus-within:text-primary-600 transition-colors" />
                        </div>
                        <Input
                            className="pl-12 h-14 rounded-2xl border-0 bg-white text-gray-900 shadow-2xl placeholder:text-gray-400 focus-visible:ring-4 focus-visible:ring-primary-400/20 text-lg"
                            placeholder="Search for past papers, jobs, or books..."
                        />
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 space-y-12 pb-12 -mt-16 relative z-20">
                {/* AdSense Banner 1 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl h-28 w-full flex items-center justify-center text-gray-400 text-xs font-bold border border-dashed border-gray-200 shadow-sm uppercase tracking-widest">
                    Sponsored Content
                </div>

                {/* Quick Access Grid */}
                <section>
                    <div className="flex items-center gap-3 mb-6 px-1">
                        <div className="h-8 w-1.5 bg-primary-600 rounded-full" />
                        <h2 className="text-2xl font-bold text-gray-900">Explore Resources</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        <QuickAccessCard title="Past Papers" icon={StickyNote} href="/pastpapers" color="purple" />
                        <QuickAccessCard title="Books" icon={BookOpen} href="/books" color="green" />
                        <QuickAccessCard title="Results" icon={Award} href="/results" color="red" />
                        <QuickAccessCard title="Jobs" icon={Briefcase} href="/jobs" color="orange" />
                        <QuickAccessCard title="Admissions" icon={Landmark} href="/admissions" color="purple" />
                    </div>
                </section>

                <div className="grid lg:grid-cols-2 gap-10">
                    {/* Latest Admissions */}
                    <section>
                        <SectionHeader title="Latest Admissions" href="/admissions" />
                        <div className="space-y-4">
                            <ListingCard
                                title="Central University of Science"
                                subtitle="B.Tech & B.Sc Admissions 2026"
                                meta="Ends in 12 days"
                                deadline="Oct 15"
                                href="/admissions/central-university"
                                type="Admission"
                            />
                            <ListingCard
                                title="National Arts Academy"
                                subtitle="Fine Arts & Design Programs"
                                meta="Ends in 30 days"
                                deadline="Nov 05"
                                href="/admissions/arts-academy"
                                type="Admission"
                            />
                        </div>
                    </section>

                    {/* Job Alerts */}
                    <section>
                        <SectionHeader title="Job Alerts" href="/jobs" />
                        <div className="space-y-4">
                            <ListingCard
                                title="Junior Research Fellow"
                                subtitle="Department of Science & Technology"
                                location="New Delhi"
                                meta="Posted Just Now"
                                href="/jobs/jrf-dst"
                                type="Government"
                                actionLabel="Apply Now"
                            />
                            <ListingCard
                                title="Assistant Professor (CS)"
                                subtitle="State Technical University"
                                location="Mumbai"
                                meta="Posted 5 hours ago"
                                href="/jobs/asst-prof-cs"
                                type="Technical"
                                actionLabel="Apply Now"
                            />
                        </div>
                    </section>
                </div>

                {/* AdSense Banner 2 */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl h-24 w-full flex items-center justify-center text-gray-400 text-xs font-bold border border-dashed border-gray-200 shadow-sm uppercase tracking-widest">
                    Advertisement
                </div>
            </div>
        </div>
    )
}
