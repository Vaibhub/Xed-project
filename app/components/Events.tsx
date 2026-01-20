"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEvents } from "../hooks/useEvents";

import "swiper/css";
import "swiper/css/navigation";

export default function EventsSlider() {
  const { data: events = [], isLoading } = useEvents();
  const activeEvents = events.filter((e: any) => e.is_active === "Y");

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  return (
    <section className="py-16 bg-gray-100">
      <div className="px-4 max-w-7xl mx-auto">
        {/* Heading & Controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Events</h2>

          <div className="flex gap-2">
            <button className="event-prev-btn bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors">
              <ChevronLeft size={24} />
            </button>
            <button className="event-next-btn bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          loop
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={{
            prevEl: ".event-prev-btn",
            nextEl: ".event-next-btn",
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="rounded-lg"
        >
          {activeEvents.map((e: any) => (
            <SwiperSlide key={e.id}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                <img
                  src={e.event_image?.trim()}
                  alt={e.description || "event"}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <p className="text-md font-semibold text-gray-700 line-clamp-2">
                    {e.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
