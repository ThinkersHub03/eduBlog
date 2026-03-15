import { cn } from '@/lib/utils';

export type FeaturedInstituteItem = {
  id?: string | number;
  name: string;
  logoSrc: string;
  logoAlt?: string;
  href?: string;
};

export type FeaturedInstitutesProps = {
  title?: string;
  items: FeaturedInstituteItem[];
  className?: string;
  itemClassName?: string;
};

export default function FeaturedInstitutes({
  title = 'Featured Institutions',
  items,
  className,
  itemClassName,
}: FeaturedInstitutesProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className={cn('w-full', className)} aria-label={title}>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

      <div className="mt-3 rounded-md  p-3">
        <div className="flex items-stretch gap-4 flex-wrap py-1 pr-1">
          {items.map((item, idx) => {
            const key = item.id ?? `${item.name}-${idx}`;
            const content = (
              <>
                <div className="grid h-12 w-12 place-items-center rounded-md bg-white ring-1 ring-gray-200">
                  <img
                    src={item.logoSrc}
                    alt={item.logoAlt ?? item.name}
                    className="h-10 w-10 object-contain"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div
                    className={cn(
                      'text-[13px] font-medium leading-snug text-teal-700',
                      item.href && 'group-hover:underline'
                    )}
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                    }}
                    title={item.name}
                  >
                    {item.name}
                  </div>
                </div>
              </>
            );

            const baseClassName = cn(
              'group flex min-w-[190px] max-w-[220px] items-center gap-3 rounded-md bg-white px-3 py-2 shadow-sm ring-1 ring-gray-200',
              item.href && 'hover:ring-gray-300',
              itemClassName
            );

            return item.href ? (
              <a key={key} href={item.href} className={baseClassName}>
                {content}
              </a>
            ) : (
              <div key={key} className={baseClassName}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
