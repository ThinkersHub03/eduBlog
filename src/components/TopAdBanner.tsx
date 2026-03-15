import React from 'react';

export type BannerItem = {
  image: string;
  link: string;
};

export type NavItem = {
  label: string;
  link: string;
};

interface TopAdBannerProps {
  topBanners: BannerItem[];   // expects exactly 3 items; extra items will be ignored
  bottomLinks: NavItem[];     // expects exactly 4 items; extra items will be ignored
}

/**
 * A responsive advertisement strip with three banner images on top and a
 * row of navigation links underneath.  All data is driven through props.
 *
 * Responsive behaviour:
 *  - desktop (lg+): three banners side by side, links on one line centred
 *  - tablet (sm/md): two banners per row, third wraps to next line
 *  - mobile: one banner per row; links wrap naturally
 */
const TopAdBanner: React.FC<TopAdBannerProps> = ({ topBanners, bottomLinks }) => {
  // ensure we only render the expected number of items
  const banners = topBanners.slice(0, 3);
  const links = bottomLinks.slice(0, 4);

  return (
    <div className="w-full">
      {/* top banners */}
      <div className="flex flex-wrap justify-center gap-4 py-4 px-2">
        {banners.map((banner, idx) => (
          <a
            key={idx}
            href={banner.link}
            className="block flex-grow basis-full sm:basis-[48%] lg:basis-[32%] rounded-lg overflow-hidden"
          >
            <img
              src={banner.image}
              alt="Advertisement"
              className="w-full h-auto object-cover"
            />
          </a>
        ))}
      </div>

      {/* bottom navigation links */}
      <div className="flex flex-wrap justify-center items-center gap-x-2 text-sm text-gray-700 mx-auto px-4 pb-4">
        {links.map((link, idx) => (
          <React.Fragment key={idx}>
            <a href={link.link} className="hover:underline">
              {link.label}
            </a>
            {idx < links.length - 1 && <span className="mx-1">•</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TopAdBanner;


