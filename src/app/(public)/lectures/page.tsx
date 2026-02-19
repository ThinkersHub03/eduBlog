import { SectionHeader } from "@/components/ui/section-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Play, Youtube, Video, Sparkles } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Video Lectures | EduPortal",
    description: "High-quality video lectures for all subjects.",
}

export default function LecturesPage() {
    return (
        <div className="container mx-auto px-4 py-10 space-y-12">
            {/* Page Header */}
            <div className="relative bg-red-900 rounded-3xl p-10 overflow-hidden shadow-2xl text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 bg-red-600 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 bg-orange-500 rounded-full blur-3xl opacity-20" />

                <div className="relative z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10 text-xs font-bold text-red-100 uppercase tracking-widest mb-4">
                        <Video className="h-4 w-4" />
                        Visual Learning
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                        Learn at Your Own Pace <br />with Expert Lectures
                    </h1>
                    <p className="text-red-100/80 text-lg leading-relaxed mb-6">
                        Access our comprehensive library of video lectures from top educators, designed to simplify complex concepts and help you excel.
                    </p>
                </div>
            </div>

            {/* Empty State / Placeholder */}
            <div className="py-24 text-center bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-sm max-w-4xl mx-auto">
                <div className="bg-red-50 p-6 rounded-full w-fit mx-auto mb-8 relative">
                    <Play className="h-12 w-12 text-red-600 fill-current" />
                    <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Streaming Soon!</h2>
                <p className="text-gray-500 max-w-md mx-auto mt-4 text-lg">
                    We're currently finalising our video archives with some of the best educators. Check back shortly for our full library.
                </p>
                <div className="mt-10 flex items-center justify-center gap-4">
                    <Button className="h-12 px-8 rounded-xl font-bold bg-primary-600 text-white shadow-lg shadow-primary-200">
                        Notify Me
                    </Button>
                    <Button variant="outline" className="h-12 px-8 rounded-xl font-bold border-gray-200">
                        Watch Previews
                    </Button>
                </div>
            </div>
        </div>
    )
}
