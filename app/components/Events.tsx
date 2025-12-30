"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRef } from "react";

export default function EventsSlider({ events }: { events: any[] }) {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <section className="py-16 bg-gray-100">
      <div className="px-4">

        {/* Heading */}
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold">Events</h2>

          {/* Navigation Arrows */}
          <div className="flex gap-3">
            <div ref={prevRef} className="swiper-button-prev !static"></div>
            <div ref={nextRef} className="swiper-button-next !static"></div>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          loop={true}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onBeforeInit={(swiper) => {
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
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
