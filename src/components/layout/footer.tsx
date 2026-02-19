import Link from "next/link"

export function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 py-12 pb-24 md:pb-12 text-sm">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* Brand Column */}
                <div className="col-span-2 lg:col-span-2">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="bg-primary-600 rounded-lg p-1.5 h-8 w-8 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">E</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">EduPortal</span>
                    </Link>
                    <p className="text-gray-500 mb-6 max-w-sm">
                        Empowering students and educators with the best resources, opportunities, and community support for a brighter future.
                    </p>
                    <div className="flex gap-4">
                        {/* Social placeholders */}
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                        <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                    </div>
                </div>

                {/* Links Column 1 */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
                    <ul className="space-y-3 text-gray-600">
                        <li><Link href="/pastpapers" className="hover:text-primary-600 transition-colors">Past Papers</Link></li>
                        <li><Link href="/books" className="hover:text-primary-600 transition-colors">E-Books</Link></li>
                        <li><Link href="/admissions" className="hover:text-primary-600 transition-colors">Admissions</Link></li>
                    </ul>
                </div>

                {/* Links Column 2 */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Opportunities</h3>
                    <ul className="space-y-3 text-gray-600">
                        <li><Link href="/jobs" className="hover:text-primary-600 transition-colors">Find Jobs</Link></li>
                        <li><Link href="/scholarships" className="hover:text-primary-600 transition-colors">Scholarships</Link></li>
                        <li><Link href="/internships" className="hover:text-primary-600 transition-colors">Internships</Link></li>
                        <li><Link href="/blog" className="hover:text-primary-600 transition-colors">Career Advice</Link></li>
                    </ul>
                </div>

                {/* Links Column 3 */}
                <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
                    <ul className="space-y-3 text-gray-600">
                        <li><Link href="/about" className="hover:text-primary-600 transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary-600 transition-colors">Contact</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary-600 transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary-600 transition-colors">Terms of Use</Link></li>
                    </ul>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-center text-gray-500">
                <p>&copy; {new Date().getFullYear()} EduPortal. All rights reserved.</p>
            </div>
        </footer>
    )
}
