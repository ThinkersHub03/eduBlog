import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ArrowRight, Bookmark } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ListingCardProps {
    title: string
    subtitle: string
    meta?: string
    location?: string
    deadline?: string
    type?: string
    imageSrc?: string
    href: string
    actionLabel?: string
    className?: string
}

export function ListingCard({
    title,
    subtitle,
    meta,
    location,
    deadline,
    type,
    imageSrc,
    href,
    actionLabel = "View Details",
    className
}: ListingCardProps) {
    return (
        <Link
            href={href}
            className={cn(
                "group relative bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all duration-300 flex flex-col sm:flex-row sm:items-center gap-5 overflow-hidden active:scale-[0.99]",
                className
            )}
        >
            {/* Accent Line */}
            <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Thumbnail */}
            <div className="shrink-0">
                {imageSrc ? (
                    <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image
                            src={imageSrc}
                            alt={title}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-primary-50 text-primary-600">
                        <Bookmark className="h-8 w-8" />
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2 mb-1">
                    {type && (
                        <Badge variant="secondary" className="bg-primary-50 text-primary-700 border-primary-100 rounded-lg px-2.5 hover:bg-primary-100">
                            {type}
                        </Badge>
                    )}
                    {meta && <span className="text-[11px] font-bold text-primary-600 uppercase tracking-wider">{meta}</span>}
                </div>

                <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                        {title}
                    </h3>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed truncate">
                        {subtitle}
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-1 text-gray-400 text-xs">
                    {location && (
                        <div className="flex items-center gap-1.5 font-medium">
                            <MapPin className="h-3.5 w-3.5" />
                            {location}
                        </div>
                    )}
                    {deadline && (
                        <div className="flex items-center gap-1.5 font-medium">
                            <Calendar className="h-3.5 w-3.5" />
                            Exp: {deadline}
                        </div>
                    )}
                </div>
            </div>

            {/* Action Section */}
            <div className="shrink-0 pt-2 sm:pt-0">
                <Button
                    variant="ghost"
                    className="w-full sm:w-auto font-bold text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-5 h-11 rounded-xl gap-2 transition-all group-hover:gap-3"
                >
                    {actionLabel}
                    <ArrowRight className="h-4 w-4" />
                </Button>
            </div>
        </Link>
    )
}
