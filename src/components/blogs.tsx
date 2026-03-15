import { CalendarDays } from "lucide-react"

import { cn } from "@/lib/utils"
import { SectionHeader } from "@/components/ui/section-header"

export type BlogItem = {
  id?: string | number
  title: string
  date: string
  imageSrc: string
  imageAlt?: string
  href?: string
}

export type BlogItemCardProps = BlogItem & {
  className?: string
}

export function BlogItemCard({
  title,
  date,
  imageSrc,
  imageAlt,
  href,
  className,
}: BlogItemCardProps) {
  const content = (
    <>
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 px-3 py-3">
        <div className="flex items-center gap-2 text-[12px] font-medium text-emerald-700">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          <span>{date}</span>
        </div>

        <div
          className="text-[13px] font-semibold leading-snug text-gray-900"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            overflow: "hidden",
          }}
          title={title}
        >
          {title}
        </div>
      </div>
    </>
  )

  const baseClassName = cn(
    "group flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-emerald-200/70 transition",
    "hover:shadow-md hover:ring-emerald-300",
    className
  )

  return href ? (
    <a href={href} className={baseClassName} aria-label={title}>
      {content}
    </a>
  ) : (
    <div className={baseClassName}>{content}</div>
  )
}

export type BlogsProps = {
  title?: string
  viewAllHref?: string
  viewAllText?: string
  items: BlogItem[]
  className?: string
  gridClassName?: string
  itemClassName?: string
}

export default function Blogs({
  title,
  viewAllHref,
  viewAllText = "View All",
  items,
  className,
  gridClassName,
  itemClassName,
}: BlogsProps) {
  if (!items || items.length === 0) return null

  return (
    <section className={cn("w-full", className)} aria-label={title ?? "Blogs"}>
      {title ? (
        <SectionHeader title={title} href={viewAllHref} actionText={viewAllText} />
      ) : null}

      <div
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
          gridClassName
        )}
      >
        {items.map((item, idx) => (
          <BlogItemCard
            key={item.id ?? `${item.title}-${idx}`}
            {...item}
            className={itemClassName}
          />
        ))}
      </div>
    </section>
  )
}
