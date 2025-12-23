
"use client"
import { useEffect, useState } from "react";
import { loadAlumniSpeak, loadEvents, loadNews, loadTestimonials, loadWebinars } from "@/app/loadPrograms";
import { Program } from "../types/program";
import EventsSlider from "../components/Events";
import AlumniSpeak from "../components/Home/sections/AlumniSpeak";
import TestimonialSlider from "../components/Home/sections/Testimonials";
import NewsCarousel from "../components/Home/sections/NewsCarousel";
import WebinarsSlider from "../components/Webinars";

export const KnowledgeHubPage = () => {
    const [apiError, setApiError] = useState(false);
    const [alumniSpeak, setAlumniSpeak] = useState<Program[]>([]);
    const [news, setNews] = useState<Program[]>([]);
    const [events, setEvents] = useState<Program[]>([]);
    const [webinars, setWebinars] = useState<Program[]>([]);
    const [testimonials, setTestimonials] = useState<any[]>([]);
  useEffect(() => {
      const fetchData = async () => {
        try {
          const [ alumniSpeakRes, newsRes, eventsRes, webinarsRes, testimonialsRes]:any = await Promise.all([
            loadAlumniSpeak(),
            loadNews(),
            loadEvents(),
            loadWebinars(),
            loadTestimonials()
          ]);
  
          setAlumniSpeak(alumniSpeakRes);
          
          setNews(newsRes);
          setEvents(eventsRes);
          setWebinars(webinarsRes);
          setTestimonials(testimonialsRes);
          setApiError(false);
        } catch (error) {
          setApiError(true);
        }
      };
  
      fetchData();
    }, []);
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
      <EventsSlider events={events} />
      <AlumniSpeak alumniSpeak={alumniSpeak} />
      <TestimonialSlider testimonials={testimonials} />
      <NewsCarousel news={news} />
      <WebinarsSlider webinars={webinars} />
    </div>
  );
};

export default KnowledgeHubPage;
