'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, BookOpen, FileText, GraduationCap, Briefcase, Trophy, Users } from 'lucide-react'

export default function DashboardDropdown() {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const adminLinks = [
        { href: '/admin/books', label: 'Manage Books', icon: BookOpen },
        { href: '/admin/pastpapers', label: 'Manage Past Papers', icon: FileText },
        { href: '/admin/institutions', label: 'Manage Institutions', icon: GraduationCap },
        { href: '/admin/jobs', label: 'Manage Jobs', icon: Briefcase },
        { href: '/admin/competitions', label: 'Manage Competitions', icon: Trophy },
        { href: '/admin/users', label: 'Manage Users', icon: Users },
    ]

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors"
            >
                Dashboard
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-premium border border-gray-100 py-2 z-50">
                    {adminLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                            <link.icon className="h-4 w-4" />
                            {link.label}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
