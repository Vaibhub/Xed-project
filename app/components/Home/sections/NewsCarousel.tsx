"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNews } from "@/app/hooks/useNews";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

export default function NewsCarousel() {
  const { data: news = [], isLoading } = useNews();
  const activeNews = news.filter((item: any) => item.is_active === "Y");
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Latest News & Updates
          </h2>

          {/* Navigation */}
          <div className="flex gap-3">
            <div
              ref={(node) => setPrevEl(node)}
              className="swiper-button-prev !static !relative !top-0 !left-0"
            ></div>
            <div
              ref={(node) => setNextEl(node)}
              className="swiper-button-next !static !relative !top-0 !left-0"
            ></div>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{ prevEl, nextEl }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={3}
          loop
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {activeNews.map((t: any) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-xl border p-4 h-full">
                <a
                  href={t.news_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-lg"
                >
                  <img
                    src={t.news_image?.trim()}
                    alt="News"
                    className="w-full h-56 object-contain hover:scale-105 transition-transform duration-300"
                  />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
