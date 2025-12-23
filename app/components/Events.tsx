import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function EventsSlider({events}: {events: any[]}) {
  // const events = [
  //   {
  //     img: "/events/1.png",
  //     description: "XED Team was the Platinum Partner at the HR Leaders Conference in Dubai",
  //   },
  //   {
  //     img: "/events/2.png",
  //     description: "XED Team was the Platinum Partner at the HR Leaders Conference in Riyadh",
  //   },
  //   {
  //     img: "/events/3.png",
  //     description: "The XED team was at the 5th Edition Learning & Development Confex & Awards on 27th March at Vivanta New Delhi, Dwarka.",
  //   },
  //   {
  //     img: "/events/4.png",
  //     description: "XED Team was at the 4th L&D Confex and Awards 2024 in Mumbai where we represented XED as the Global Knowledge Partner",
  //   },
  //   {
  //     img: "/events/5.png",
  //     description: "XED hosted an Alumni Mixer in Dubai led by Prof. Allan Filipowicz, Cornell University",
  //   },
  //   {
  //     img: "/events/6.png",
  //     description: "XED Team was at the CHRO Confex and Awards 2023 in Bangalore where we represented XED as the Global Knowledge Partner",
  //   },
  // ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="px-4">

        {/* Heading */}
        <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-3xl font-bold">Events</h2>

          {/* Navigation Arrows */}
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
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {events.map((e, i) => (
            <SwiperSlide key={i}>
              <div className=" rounded-xl overflow-hidden">
                
                {/* Image */}
                <img
                  src={e.img}
                  className="w-full h-full object-contain"
                />

                {/* Description */}
                <p className="mt-4 px-3  pb-5 text-md font-semibold text-black">
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
