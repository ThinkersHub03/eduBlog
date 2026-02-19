import { GraduationCap } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-white antialiased">
            {/* Left Side: Branding / Background */}
            <div className="hidden lg:flex flex-col justify-between p-12 bg-primary-900 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 bg-primary-600 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 bg-primary-400 rounded-full blur-3xl opacity-10" />

                <Link href="/" className="relative z-10 flex items-center gap-2 text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">
                    <div className="bg-white text-primary-900 p-1.5 rounded-lg shadow-lg">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <span>EduPortal</span>
                </Link>

                <div className="relative z-10 space-y-6">
                    <blockquote className="space-y-4">
                        <p className="text-3xl font-medium leading-tight">
                            EduPortal has completely transformed how I prepare. Every resource I need is just a click away.
                        </p>
                        <footer className="text-lg opacity-70">
                            — Sarah Ahmed, Medical Student
                        </footer>
                    </blockquote>
                    <div className="flex gap-4 items-center">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-primary-900 bg-gray-200" />
                            ))}
                        </div>
                        <p className="text-sm font-medium opacity-60">Joined by 10,000+ students this month</p>
                    </div>
                </div>

                <div className="relative z-10 text-sm opacity-50">
                    &copy; 2026 EduPortal. All rights reserved.
                </div>
            </div>

            {/* Right Side: Auth Forms */}
            <div className="flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-gray-50/50">
                <div className="w-full max-w-md space-y-8">
                    {children}
                </div>
            </div>
        </div>
    )
}
