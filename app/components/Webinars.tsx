"use client"
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Play } from "lucide-react";

export default function WebinarsSlider({webinars}: {webinars: any[]}) {
  const [playingIndex, setPlayingIndex] = useState<any>(null);

  // const webinars = [
  //   {
  //     title:
  //       "Gain insights on leveraging persuasion and influence to drive change",
  //     speaker: "Prof. Paul Fisher",
  //     role: "Programme Director, Oxford SELP",
  //     thumb: "/webinar/2.png",
  //     video: "https://www.youtube.com/watch?v=pSte_NC2zEk",
  //     avatar:"/webinar/avatar.png"
  //   },
  //   {
  //     title: "Entrepreneurial Mindset for Organizations",
  //     speaker: "Prof. Jeremy Kagan",
  //     role: "Cornell University",
  //     thumb: "/webinar/3.png",
  //     video: "https://www.youtube.com/shorts/XG60ORmjJYk",
  //           avatar:"/webinar/avatar1.png"

  //   },
  //   {
  //     title: "Leading Through Sustainability",
  //     speaker: "Prof. Glen Dowell",
  //     role: "Cornell University",
  //     thumb: "/webinar/4.png",
  //     video: "https://www.youtube.com/shorts/fxXH5f8OU54",
  //           avatar:"/webinar/avatar.png"

  //   },
  //   {
  //     title: "Leading Through Sustainability",
  //     speaker: "Prof. Glen Dowell",
  //     role: "Cornell University",
  //     thumb: "/webinar/5.png",
  //     video: "https://www.youtube.com/shorts/fxXH5f8OU54",
  //           avatar:"/webinar/avatar1.png"

  //   },
  //   {
  //     title: "Leading Through Sustainability",
  //     speaker: "Prof. Glen Dowell",
  //     role: "Cornell University",
  //     thumb: "/webinar/6.png",
  //     video: "https://www.youtube.com/shorts/fxXH5f8OU54",
  //           avatar:"/webinar/avatar.png"

  //   },
  // ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="px-4">
        {/* Heading */}
        <div className="flex justify-between items-end mb-8 max-w-7xl mx-auto">
          <div>
            <p className="text-[#2873b8] text-xl font-semibold">Webinars</p>
            <h2 className="text-4xl font-bold">Learn with Experts</h2>
          </div>

          <div className="flex gap-3">
            <div className="swiper-button-prev !static !relative !top-0 !left-0"></div>
            <div className="swiper-button-next !static !relative !top-0 !left-0"></div>
          </div>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          spaceBetween={20}
          slidesPerView={3}
          loop={false}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {webinars.map((w, i) => {
            const embedURL = w.video
              .replace("watch?v=", "embed/")
              .replace("shorts/", "embed/");

            return (
              <SwiperSlide key={i}>
                <div className="rounded-xl overflow-hidden">
                  {/* If playing → show video */}
                  {playingIndex === i ? (
                    <iframe
                      src={`${embedURL}?autoplay=1`}
                      className="w-full h-64 rounded-lg"
                      allow="autoplay; encrypted-media"
                    ></iframe>
                  ) : (
                    <div className="relative">
                      <img
                        src={w.thumb}
                        className="w-full h-64 object-cover rounded-lg"
                      />

                      {/* Play Button */}
                      <button
                        onClick={() => setPlayingIndex(i)}
                        className="absolute top-1/2 left-1/2 
                        -translate-x-1/2 -translate-y-1/2 
                        !bg-red-600 text-white p-4 rounded-full shadow-lg"
                      >
                        <Play className="w-6 h-6 fill-white" />
                      </button>
                    </div>
                  )}

                  {/* Title */}
                  <p className="mt-4 px-2 text-lg font-semibold text-black">
                    {w.title}
                  </p>

                  {/* Instructor Info */}
                  <div className="flex items-center gap-3 px-2 mt-2 pb-4">
                    <img
                      src={w.avatar}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{w.speaker}</p>
                      <p className="text-gray-600 text-sm">{w.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
