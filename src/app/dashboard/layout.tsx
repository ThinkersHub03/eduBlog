import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="container mx-auto grid flex-1 gap-8 md:grid-cols-[240px_1fr] px-4 py-8">
            <aside className="hidden w-[240px] flex-col md:flex">
                <DashboardNav />
            </aside>
            <main className="flex w-full flex-1 flex-col overflow-hidden">
                {children}
            </main>
        </div>
    )
}
