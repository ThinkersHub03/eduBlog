"use client"

import { usePathname } from "next/navigation"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const isAuth = pathname?.startsWith('/login') || pathname?.startsWith('/register')
    const isAdmin = pathname?.startsWith('/admin')

    const hideFooterAndBottomNav = isAuth || isAdmin

    // We still want to render children (main content)
    // But we conditionally filter out Footer and BottomNav if they are present in children
    // Actually, in our layout.tsx we passed them as siblings. 
    // Let's adjust the logic to only render Footer/BottomNav if not auth/admin

    // The children passed here are [main, Footer, BottomNav]
    const childrenArray = Array.isArray(children) ? children : [children]

    return (
        <>
            {childrenArray.map((child, index) => {
                // Index 0 is <main>
                if (index === 0) return child

                // Index 1 is <Footer>, Index 2 is <BottomNav>
                if (hideFooterAndBottomNav) return null

                return child
            })}
        </>
    )
}
