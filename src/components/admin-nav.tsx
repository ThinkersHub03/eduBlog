'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    LayoutDashboard,
    Building2,
    Briefcase,
    GraduationCap,
    BookOpen,
    FileText,
    Users
} from "lucide-react"

export function AdminNav() {
    const pathname = usePathname()

    const links = [
        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/institutions', label: 'Institutions', icon: Building2 },
        { href: '/admin/jobs', label: 'Jobs', icon: Briefcase },
        { href: '/admin/pastpapers', label: 'Past Papers', icon: FileText },
        { href: '/admin/books', label: 'Books', icon: BookOpen },
        { href: '/admin/posts', label: 'Blogs', icon: FileText },
        { href: '/admin/competitions', label: 'Competitions', icon: GraduationCap },
        { href: '/admin/users', label: 'Users', icon: Users },
    ]

    return (
        <nav className="grid items-start gap-2">
            {links.map((link) => {
                const Icon = link.icon
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === link.href ? "bg-accent text-accent-foreground" : "text-muted-foreground" // Improved active state check?
                        )}
                    >
                        <Icon className="mr-2 h-4 w-4" />
                        <span>{link.label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
