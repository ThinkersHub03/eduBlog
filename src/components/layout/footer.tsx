import Link from "next/link"
import { ChevronRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

import { cn } from "@/lib/utils"

export function Footer() {
    const inner = "mx-auto w-full max-w-[1280px] px-4"

    const usefulLinks = [
        { label: "Android App", href: "/android-app" },
        { label: "Upload", href: "/upload" },
        { label: "Categories", href: "/categories" },
        { label: "Contact Us", href: "/contact" },
        { label: "Site Languages", href: "/languages" },
        { label: "Sitemap", href: "/sitemap" },
        { label: "Search Results", href: "/search" },
    ]

    const infoLinks = [
        { label: "About Us", href: "/about" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms & Condition", href: "/terms" },
        { label: "FAQs", href: "/faqs" },
        { label: "Copyrights & Thanks", href: "/copyright" },
        { label: "Advertise With Us", href: "/advertise" },
        { label: "Android App", href: "/android-app" },
        { label: "Account & Data Deletion", href: "/account-deletion" },
    ]

    return (
        <footer className="text-sm text-white">
            <div className="bg-[#2b2e74]">
                <div className={cn(inner, "py-12")}>
                    <div className="grid gap-10 md:grid-cols-12">
                        {/* Brand */}
                        <div className="md:col-span-6 lg:col-span-5">
                            <Link href="/" className="inline-flex items-center gap-3">
                                <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
                                    <svg
                                        width="26"
                                        height="26"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-white"
                                    >
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </div>
                                <div className="leading-tight">
                                    <div className="text-xl font-extrabold tracking-tight">taleem</div>
                                    <div className="text-xs font-semibold tracking-[0.2em] text-white/70">
                                        city
                                    </div>
                                </div>
                            </Link>

                            <p className="mt-4 max-w-md text-white/70 leading-relaxed">
                                Vast collection of Textbooks, Helping Books, Notes, Date Sheets, Pairing Schemes,
                                Entry Test and other exam materials. The best platform for students and teachers to
                                store books / notes online for easy sharing.
                            </p>

                            <Link
                                href="/books"
                                className={cn(
                                    "mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold",
                                    "bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                                )}
                            >
                                Digital textbooks
                                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                            </Link>

                            <div className="mt-6 flex items-center gap-3">
                                <Link
                                    href="https://facebook.com"
                                    aria-label="Facebook"
                                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                                >
                                    <Facebook className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="https://youtube.com"
                                    aria-label="YouTube"
                                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                                >
                                    <Youtube className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="https://instagram.com"
                                    aria-label="Instagram"
                                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                                >
                                    <Instagram className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="https://twitter.com"
                                    aria-label="Twitter"
                                    className="grid h-9 w-9 place-items-center rounded-full bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition-colors"
                                >
                                    <Twitter className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="md:col-span-6 lg:col-span-7">
                            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-2">
                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        Useful <span className="text-white/70">links</span>
                                    </h3>
                                    <ul className="mt-4 space-y-2.5 text-white/75">
                                        {usefulLinks.map((l) => (
                                            <li key={l.href}>
                                                <Link
                                                    href={l.href}
                                                    className="group inline-flex items-center gap-2 hover:text-white transition-colors"
                                                >
                                                    <ChevronRight className="h-4 w-4 text-white/55 group-hover:text-white" />
                                                    <span>{l.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-base font-bold tracking-tight">
                                        Our <span className="text-white/70">info</span>
                                    </h3>
                                    <ul className="mt-4 space-y-2.5 text-white/75">
                                        {infoLinks.map((l) => (
                                            <li key={l.href}>
                                                <Link
                                                    href={l.href}
                                                    className="group inline-flex items-center gap-2 hover:text-white transition-colors"
                                                >
                                                    <ChevronRight className="h-4 w-4 text-white/55 group-hover:text-white" />
                                                    <span>{l.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#23265f]">
                <div className={cn(inner, "py-4")}>
                    <div className="flex flex-col gap-2 text-xs text-white/70 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            © Copyright {new Date().getFullYear()} taleem360. All Rights Reserved.
                        </div>
                        <div>
                            Powered by{" "}
                            <span className="font-semibold text-rose-300">our Students & Teachers</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
