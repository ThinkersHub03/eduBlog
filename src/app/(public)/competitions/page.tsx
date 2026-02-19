import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Trophy, Medal, Star, Target, Sparkles, Rocket } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Competitions | EduPortal",
    description: "Join national-level student competitions and win big.",
}

export default function CompetitionsPage() {
    return (
        <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Page Header */}
            <div className="relative bg-amber-900 rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-amber-500 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-yellow-400 rounded-full blur-3xl opacity-20" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-amber-100 uppercase tracking-widest mb-4">
                        <Trophy className="h-4 w-4" />
                        National Excellence
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                        Challenge Yourself <br />& Win Prestige
                    </h1>
                    <p className="text-amber-100/80 text-lg leading-relaxed mb-6">
                        Participate in national-level academic, creative, and technical competitions. Show your talent and earn certificates, prizes, and global recognition.
                    </p>
                </div>
            </div>

            {/* Empty State / Placeholder */}
            <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm max-w-4xl mx-auto">
                <div className="bg-amber-50 p-6 rounded-3xl w-fit mx-auto mb-8">
                    <Rocket className="h-12 w-12 text-amber-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Get Ready to Compete!</h2>
                <p className="text-gray-500 max-w-md mx-auto mt-4 text-lg">
                    We're preparing the next big competition cycle. Registration for Summer 2026 Challenges will open soon.
                </p>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
                    <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
                        <Medal className="h-8 w-8 text-amber-600 mb-3" />
                        <h4 className="font-bold text-gray-900">Prizes</h4>
                        <p className="text-sm text-gray-500 mt-1">Laptops, cash prizes, and scholarships.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
                        <Star className="h-8 w-8 text-amber-600 mb-3" />
                        <h4 className="font-bold text-gray-900">Branding</h4>
                        <p className="text-sm text-gray-500 mt-1">Get featured on our platform.</p>
                    </div>
                    <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100">
                        <Target className="h-8 w-8 text-amber-600 mb-3" />
                        <h4 className="font-bold text-gray-900">Career</h4>
                        <p className="text-sm text-gray-500 mt-1">Certificates recognized by top HRs.</p>
                    </div>
                </div>

                <div className="mt-12">
                    <Button className="h-14 px-12 rounded-xl font-bold bg-amber-600 text-white shadow-lg shadow-amber-200 hover:bg-amber-700 transition-all">
                        Register for Updates
                    </Button>
                </div>
            </div>
        </div>
    )
}
