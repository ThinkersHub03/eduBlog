"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, Bookmark, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const pathname = usePathname()

    const links = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
        { href: "/saved", label: "Saved", icon: Bookmark },
        { href: "/profile", label: "Profile", icon: User },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe md:hidden">
            <nav className="flex items-center justify-around h-16">
                {links.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href))

                    return (
                        <Link
                            key={href}
                            href={href}
                            className={cn(
                                "flex flex-col items-center justify-center w-full h-full space-y-1",
                                isActive
                                    ? "text-primary-600"
                                    : "text-gray-500 hover:text-gray-900"
                            )}
                        >
                            <Icon className={cn("h-6 w-6", isActive && "fill-current")} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
