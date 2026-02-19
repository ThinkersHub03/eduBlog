import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface QuickAccessCardProps
    extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    title: string
    icon: LucideIcon
    href: string
    color?: "blue" | "red" | "green" | "orange" | "purple"
}

const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-red-50 text-red-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
}

export function QuickAccessCard({
    title,
    icon: Icon,
    href,
    color = "blue",
    className,
    ...props
}: QuickAccessCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 active:scale-95",
                className
            )}
            {...props}
        >
            <div className={cn("flex items-center justify-center w-12 h-12 rounded-full mb-3 transition-colors", colorMap[color])}>
                <Icon className="w-6 h-6" />
            </div>
            <span className="font-medium text-sm text-gray-900 group-hover:text-primary-600 transition-colors">
                {title}
            </span>
        </Link>
    )
}
