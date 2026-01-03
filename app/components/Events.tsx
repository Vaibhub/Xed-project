"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function EventsSlider({ events }: { events: any[] }) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="py-16 bg-gray-100">
      <div className="px-4">

        {/* Heading */}
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold">Events</h2>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <div ref={(node) => setPrevEl(node)} className="swiper-button-prev !static"></div>
            <div ref={(node) => setNextEl(node)} className="swiper-button-next !static"></div>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl,
            nextEl,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {events.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="rounded-xl overflow-hidden">
                <img
                  src={e.img}
                  className="w-full h-full object-contain"
                  alt=""
                />
                <p className="mt-4 px-3 pb-5 text-md font-semibold">
                  {e.description}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
