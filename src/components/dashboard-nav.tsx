'use client'

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { LayoutDashboard, Bookmark, User, LogOut, Settings, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardNav() {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const links = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: Bookmark },
        { href: '/dashboard/profile', label: 'Profile', icon: User },
        { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    ]

    return (
        <nav className="flex flex-col gap-1">
            <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                Menu
            </div>
            {links.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200",
                            isActive
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-200"
                                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                        )}
                    >
                        <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-gray-400")} />
                        {link.label}
                    </Link>
                )
            })}

            <div className="my-4 border-t border-gray-100" />

            <Button
                variant="ghost"
                className="justify-start gap-3 px-4 py-6 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all"
                onClick={handleLogout}
            >
                <LogOut className="h-5 w-5" />
                Logout
            </Button>
        </nav>
    )
}
