"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useTestimonials } from "@/app/hooks/useTestimonials";

import "swiper/css";
import "swiper/css/navigation";

/* =========================
   Component
========================= */

export default function TestimonialSlider() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[#2873B8] font-medium">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold mt-1">
              Hear from Our Participants
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            <div
              ref={prevRef}
              className="swiper-button-prev !static !relative !top-0 !left-0"
            />
            <div
              ref={nextRef}
              className="swiper-button-next !static !relative !top-0 !left-0"
            />
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          loop
          onBeforeInit={(swiper) => {
            if (
              typeof swiper.params.navigation !== "boolean" &&
              swiper.params.navigation
            ) {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {testimonials.map((t: any) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white rounded-xl border p-6 h-[350px] flex flex-col justify-between">
                <p className="text-lg leading-relaxed italic font-bold">
                  “{t.message}”
                </p>

                <div className="mt-6 pt-6 border-t flex items-center gap-3">
                  <img
                    src={t.speaker_image?.trim()}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-600">
                      {t.designation}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
