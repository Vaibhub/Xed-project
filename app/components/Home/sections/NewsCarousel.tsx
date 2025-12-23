import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

export default function NewsCarousel({news}: {news: any[]}) {
  // const testimonials = [
  //   {
  //     img: "/home/news/1.png",
  //   },
  //   {
  //     img: "/home/news/2.png",
  //   },
  //   {
  //     img: "/home/news/3.png",
  //   },
  //   {
  //     img: "/home/news/4.png",
  //   },
  //   {
  //     img: "/home/news/5.png",
  //   },
  //   {
  //     img: "/home/news/6.png",
  //   },
  //   {
  //     img: "/home/news/7.png",
  //   },
  //   {
  //     img: "/home/news/8.png",
  //   },
  //   {
  //     img: "/home/news/9.png",
  //   },
  //   {
  //     img: "/home/news/10.png",
  //   },
  //   {
  //     img: "/home/news/11.png",
  //   }
  // ];

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
