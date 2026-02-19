"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import { ProfileDropdown } from "./ProfileDropdown"
import DashboardDropdown from "./DashboardDropdown"

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { isAuthenticated, isAdmin, loading } = useAuth()

    return (
        <header className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex items-center gap-4 shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-primary-600 rounded-lg p-1.5">
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-white"
                            >
                                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                                <path d="M6 12v5c3 3 9 3 12 0v-5" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">EduPortal</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link href="/" className="hover:text-primary-600 transition-colors">Home</Link>
                    {isAuthenticated && isAdmin() && <DashboardDropdown />}
                    <Link href="/pastpapers" className="hover:text-primary-600 transition-colors">Past Papers</Link>
                    <Link href="/jobs" className="hover:text-primary-600 transition-colors">Careers</Link>
                    <Link href="/admissions" className="hover:text-primary-600 transition-colors">Institutions</Link>
                    <Link href="/books" className="hover:text-primary-600 transition-colors">Resources</Link>
                    <Link href="/blog" className="hover:text-primary-600 transition-colors">Blog</Link>
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-4">
                    {/* Desktop Auth State */}
                    {!loading && (
                        <div className="hidden sm:flex items-center gap-2">
                            {isAuthenticated ? (
                                <ProfileDropdown />
                            ) : (
                                <>
                                    <Link href="/login">
                                        <Button variant="ghost" className="font-semibold text-gray-600 hover:text-primary-600">Login</Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="font-semibold rounded-full px-6 shadow-md shadow-primary-200">Sign Up</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-gray-500"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white shadow-xl animate-in slide-in-from-top duration-200">
                    <div className="container mx-auto px-4 py-6 space-y-6">
                        <nav className="flex flex-col gap-4 text-base font-medium text-gray-600">
                            <Link href="/" className="flex items-center gap-3 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                            <Link href="/pastpapers" className="flex items-center gap-3 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Past Papers</Link>
                            <Link href="/jobs" className="flex items-center gap-3 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Careers</Link>
                            <Link href="/admissions" className="flex items-center gap-3 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Institutions</Link>
                            <Link href="/books" className="flex items-center gap-3 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                            <Link href="/blog" className="flex items-center gap-3 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Blog</Link>
                        </nav>

                        {!loading && (
                            <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                                {isAuthenticated ? (
                                    <ProfileDropdown />
                                ) : (
                                    <>
                                        <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                                            <Button variant="outline" className="w-full justify-center h-12 rounded-xl">Login</Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                                            <Button className="w-full justify-center h-12 rounded-xl shadow-lg shadow-primary-200">Sign Up</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}
