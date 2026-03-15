"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Search, User, Menu, X, FileText, BookOpen, GraduationCap, ChevronRight, ChevronDown, LayoutDashboard, Home } from "lucide-react"
import { useAuth } from "@/lib/hooks/useAuth"
import { ProfileDropdown } from "./ProfileDropdown"
import DashboardDropdown from "./DashboardDropdown"
import { Button } from "@/components/ui/button"
import { SearchModal } from "./SearchModal"

type NavLinkItem = {
    label: string;
    href?: string;
    icon?: any; // Only needed for mobile display based on the previous mobile nav design
    subItems?: { label: string; href: string }[];
}

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
    const { isAuthenticated, isAdmin, loading } = useAuth()
    const pathname = usePathname()

    const navLinks: NavLinkItem[] = [
        { label: "Home", href: "/", icon: Home },
        {
            label: "Past Papers",
            href: "/past-papers",
            icon: FileText,

        },
        { label: "Books", href: "/books", icon: BookOpen },
        { label: "Admission", href: "/admission", icon: GraduationCap },
        ...(isAuthenticated
            ? [{
                label: "Dashboard", icon: LayoutDashboard, subItems: [
                    { href: '/admin/posts', label: 'Manage Blog Posts', },
                    { href: '/admin/books', label: 'Manage Books', },
                    { href: '/admin/pastpapers', label: 'Manage Past Papers', },
                ]
            }]
            : []
        )

    ]

    // Handle keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && searchOpen) setSearchOpen(false)
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setSearchOpen((o) => !o)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [searchOpen])

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [mobileOpen])

    useEffect(() => {
        setMobileOpen(false)
        setExpandedMenu(null)
    }, [pathname])

    const toggleSubMenu = (e: React.MouseEvent, label: string) => {
        e.preventDefault()
        e.stopPropagation()
        setExpandedMenu(expandedMenu === label ? null : label)
    }

    return (
        <>
            <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

            <header className="z-50">
                {/* Upper White Header Area (Desktop Logo) */}
                <div className="hidden md:flex bg-white items-center justify-center py-4 border-b border-gray-100 relative z-50">
                    <Link href="/" className="flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            <div className="p-1">
                                <svg
                                    width="42"
                                    height="42"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#e11d48"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="text-3xl font-extrabold text-[#115e59] tracking-tight leading-none">
                                    taleem city
                                </span>
                                <span className="text-[10px] text-gray-500 tracking-widest mt-0.5">
                                    تعلیم سے روشن پاکستان
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Lower Green Navigation Bar */}
                <div className="bg-[#3ECC7A] border-b-2 border-[#2ab662]/80 relative z-40">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">

                        {/* DIV Just for alignment   */}
                        <div className="hidden md:flex" ></div>

                        {/* Minimum Logo for Mobile */}
                        <Link href="/" className="md:hidden flex items-center gap-2 shrink-0 bg-white/95 rounded-md p-1 px-2 shadow-sm">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                            <span className="text-lg font-bold text-[#115e59] tracking-tight">
                                taleemcity
                            </span>
                        </Link>

                        {/* Centered Navigation Links on Desktop */}
                        <nav className="hidden md:flex items-center justify-center gap-8  flex-1 h-[68px]">
                            {navLinks.map((link) => {
                                const isActive = pathname?.startsWith(link?.href || "")
                                return (
                                    <div key={link.href || link.label} className="relative h-full flex items-center group/nav">
                                        <Link
                                            href={link?.href || "#"}
                                            className={`flex items-center justify-center h-[42px] px-4 rounded-md transition-all duration-300 ${isActive ? "bg-[#2ab662] text-white font-bold shadow-inner" : "text-gray-900 font-medium hover:bg-[#2ab662]/50"
                                                }`}
                                        >
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-[14px] whitespace-nowrap leading-none">
                                                    {link.label}
                                                </span>
                                                {link.subItems && (
                                                    <ChevronDown className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-900 opacity-70 group-hover/nav:opacity-100"}`} strokeWidth={2} />
                                                )}
                                            </div>
                                        </Link>

                                        {/* Desktop Dropdown */}
                                        {link.subItems && (
                                            <div className="absolute top-[60px] left-1/2 -translate-x-1/2 mt-0 w-48 bg-white rounded-lg shadow-xl border border-[#2ab662]/20 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-200 transform origin-top focus-within:opacity-100 focus-within:visible z-50">
                                                <div className="py-2 flex flex-col">
                                                    {link.subItems.map((sub) => (
                                                        <Link
                                                            key={sub.href}
                                                            href={sub.href}
                                                            className="px-5 py-2.5 text-[14px] text-gray-700 hover:bg-gray-50 hover:text-[#3ECC7A] font-medium transition-colors border-l-[3px] border-transparent hover:border-[#3ECC7A]"
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}

                        </nav>

                        {/* Right: Search & Profile */}
                        <div className="flex items-center gap-2 sm:gap-3 shrink-0 h-full">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="bg-white rounded-md p-2 shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                <Search className="h-5 w-5 text-gray-800" />
                            </button>

                            {!loading && (
                                isAuthenticated ? (
                                    <div className=" p-1   transition-all duration-300 flex items-center justify-center">
                                        <ProfileDropdown />
                                    </div>
                                ) : (
                                    <Link href="/login" className=" p-2  transition-all duration-300 hidden sm:block">
                                        <User className="h-5 w-5 text-gray-800" />
                                    </Link>
                                )
                            )}

                            {/* Mobile Hamburger Menu */}
                            <button
                                className="md:hidden bg-white/95 flex rounded-md p-2 shadow-sm hover:bg-white hover:shadow-md transition-all duration-300 relative z-50"
                                onClick={() => setMobileOpen((o) => !o)}
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? <X className="h-6 w-6 text-gray-800" /> : <Menu className="h-6 w-6 text-gray-800" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Drawer - Separate from header to overlap entire screen */}
                <div
                    className={`md:hidden fixed inset-0 top-0 bg-[#3ECC7A] z-[100] transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                >
                    <div className="flex flex-col h-full overflow-y-auto pb-24 shadow-inner">
                        {/* header inside drawer */}
                        <div className="flex items-center justify-between p-4 border-b border-black/10 ">
                            <Link href="/" className="flex items-center gap-2">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                                <span className="text-lg font-bold text-[#115e59] tracking-tight">taleemcity</span>
                            </Link>
                            <button
                                className="p-2 rounded-md hover:bg-black/5"
                                onClick={() => setMobileOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="h-6 w-6 text-gray-900" />
                            </button>
                        </div>
                        <div className="flex flex-col border-t border-black/10">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const isActive = pathname?.startsWith(link?.href || "")
                                const isExpanded = expandedMenu === link.label;

                                return (
                                    <div key={link.href || link.label} className="flex flex-col border-b border-black/10 last:border-0 relative">
                                        <div className={`flex items-center justify-between px-6 py-4 transition-colors ${isActive ? "bg-black/10 text-white" : "text-gray-900 bg-transparent hover:bg-black/5"
                                            }`}>
                                            <Link
                                                href={link?.href || "#" }
                                                className="flex items-center gap-4 flex-1"
                                                onClick={() => { if (!link.subItems) setMobileOpen(false) }}
                                            >
                                                {Icon && <Icon className={`h-6 w-6 ${isActive ? "text-white" : "text-gray-900"}`} strokeWidth={isActive ? 2 : 1.5} />}
                                                <span className={`text-[17px] tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                                                    {link.label}
                                                </span>
                                            </Link>

                                            {/* Forward Arrow to toggle submenu */}
                                            {link.subItems ? (
                                                <button
                                                    onClick={(e) => toggleSubMenu(e, link.label)}
                                                    className="p-2 -mr-2 text-gray-900 rounded-full hover:bg-black/5"
                                                >
                                                    <ChevronRight className={`h-5 w-5 transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                                                </button>
                                            ) : (
                                                <ChevronRight className="h-5 w-5 opacity-60" />
                                            )}
                                        </div>

                                        {/* Submenu Dropdown for Mobile */}
                                        {link.subItems && (
                                            <div
                                                className={`overflow-hidden transition-all duration-300 ease-in-out bg-black/5 ${isExpanded ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"
                                                    }`}
                                            >
                                                {link.subItems.map(sub => (
                                                    <Link
                                                        key={sub.href}
                                                        href={sub.href}
                                                        className="flex items-center pl-[66px] pr-6 py-3 text-[16px] font-medium text-gray-800 hover:bg-black/10 hover:text-white transition-colors"
                                                        onClick={() => setMobileOpen(false)}
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}

                        </div>

                        {/* Auth links for unauthenticated mobile users */}
                        {!loading && !isAuthenticated && (
                            <div className="p-6 mt-2 flex flex-col gap-3">
                                <Link href="/login" onClick={() => setMobileOpen(false)}>
                                    <Button variant="outline" className="w-full justify-center h-12 rounded-lg bg-white text-gray-900 hover:bg-gray-50 border-none font-semibold text-base shadow-sm">
                                        Login
                                    </Button>
                                </Link>
                                <Link href="/register" onClick={() => setMobileOpen(false)}>
                                    <Button className="w-full justify-center h-12 rounded-lg bg-gray-900 text-white hover:bg-gray-800 shadow-md font-semibold text-base">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </header>
        </>
    )
}
