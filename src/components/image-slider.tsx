'use client';

'use client';

// using Swiper for a simpler, reliable slider implementation
import { Swiper, SwiperSlide } from 'swiper/react';
// modules need to be pulled from their specific paths in v12+
// they are exported from the modules directory; import without extension so bundler can resolve
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface Slide {
  image: string;
  link: string;
}

interface ImageSliderProps {
  slides: Slide[];
  autoPlayInterval?: number; // in ms
}

export default function ImageSlider({
  slides,
  autoPlayInterval = 5000,
}: ImageSliderProps) {
  if (slides.length === 0) return null;

  return (
    <div className="max-w-[1140px] w-full mx-auto py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: autoPlayInterval, disableOnInteraction: false }}
        loop={slides.length > 1}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <a href={slide.link} aria-label={`Slide ${idx + 1}`}>
              <img
                src={slide.image}
                alt=""
                className="w-full h-64 md:h-64 object-cover rounded-2xl"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
