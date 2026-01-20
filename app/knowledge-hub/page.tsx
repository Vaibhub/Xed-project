
"use client"
import EventsSlider from "../components/Events";
import AlumniSpeak from "../components/Home/sections/AlumniSpeak";
import TestimonialSlider from "../components/Home/sections/Testimonials";
import NewsCarousel from "../components/Home/sections/NewsCarousel";
import WebinarsSlider from "../components/Webinars";

export const KnowledgeHubPage = () => {
  return (
    <div>
      <div className="relative w-full">
        <img src="/knowledge.png" className="w-full h-auto object-cover" />

        {/* Bottom Center Text */}
        <h5
          className="
          absolute 
          bottom-6     /* thoda upar show karne ke liye */
          left-1/2 
          transform -translate-x-1/2
          text-white 
          text-4xl 
          font-bold
          text-center
        "
        >
          What's Brewing at XED?
        </h5>
      </div>
      <EventsSlider />
      <AlumniSpeak />
      <TestimonialSlider />
      <NewsCarousel />
      <WebinarsSlider />
    </div>
  );
};

export default KnowledgeHubPage;
