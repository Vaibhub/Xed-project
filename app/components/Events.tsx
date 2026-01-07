"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Optional: for nice icons

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

export default function EventsSlider({ events }: { events: any[] }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="px-4 max-w-7xl mx-auto">
        
        {/* Heading & Custom Controls */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Events</h2>

          {/* Navigation Arrows using Tailwind */}
          <div className="flex gap-2">
            <button className="event-prev-btn bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50">
              <ChevronLeft size={24} />
            </button>
            <button className="event-next-btn bg-white p-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-colors disabled:opacity-50">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          spaceBetween={20}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          // Reference the class names directly
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
          {events.map((e, i) => (
            <SwiperSlide key={i}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full">
                <img
                  src={e.img}
                  className="w-full  object-cover" // Changed to object-cover for better UI
                  alt={e.description || "event"}
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