import Link from "next/link"
import { cn } from "@/lib/utils"

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string
    href?: string
    actionText?: string
}

export function SectionHeader({
    title,
    href,
    actionText = "View All",
    className,
    ...props
}: SectionHeaderProps) {
    return (
        <div className={cn("flex items-center justify-between mb-4", className)} {...props}>
            <div className="flex items-center gap-2">
                <div className="h-6 w-1 bg-primary-600 rounded-full" />
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            </div>
            {href && (
                <Link
                    href={href}
                    className="text-xs font-semibold text-primary-600 hover:text-primary-700 tracking-wider uppercase transition-colors"
                >
                    {actionText}
                </Link>
            )}
        </div>
    )
}
