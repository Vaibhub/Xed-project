
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function NewsCarousel({news}: {news: any[]}) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="py-16 bg-gray-100">
      <div className=" px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <div className=" ">
            <h2 className="text-3xl text-start md:text-4xl font-bold mt-1">
              Latest News & Updates
            </h2>
          </div>

          {/* Navigation Arrows Top-Right */}
          <div className="flex gap-3">
            <div ref={(node) => setPrevEl(node)} className="swiper-button-prev !static !relative !top-0 !left-0"></div>
            <div ref={(node) => setNextEl(node)} className="swiper-button-next !static !relative !top-0 !left-0"></div>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl,
            nextEl,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={3}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {news.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-xl border p-6 h-full flex flex-col justify-between">
                <div className="mt-6 pt-6  flex items-center gap-3">
                  <img
                    src={t.img}
                    className="w-full h-full  object-cover"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
