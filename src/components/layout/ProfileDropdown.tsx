'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, LogOut } from 'lucide-react'
import { useAuth } from '@/lib/hooks/useAuth'

export function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const { user, logout } = useAuth()

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const handleLogout = async () => {
        setIsOpen(false)
        await logout()
    }

    // Get user initials
    const getInitials = () => {
        if (!user?.email) return 'U'
        return user.email.substring(0, 2).toUpperCase()
    }

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Profile Photo Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border-2 border-primary-200 text-sm hover:bg-primary-200 transition-all"
            >
                {getInitials()}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        <LayoutDashboard className="h-5 w-5 text-primary-600" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <div className="border-t border-gray-100 my-1" />
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 transition-colors w-full text-left"
                    >
                        <LogOut className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-600">Logout</span>
                    </button>
                </div>
            )}
        </div>
    )
}
