"use client";
import ExplorePrograms from "./components/ExplorePrograms";
import HeroSection from "./components/HeroSections";
import UpskillForm from "./components/UpskillForm";
import { useEffect, useState } from "react";
import {
  loadAlumniSpeak,
  loadCollegeLogos,
  loadDayPrograms,
  loadNews,
  loadPrograms,
  loadTestimonials,
} from "@/app/loadPrograms";
import { DayProgram, Program } from "./types/program";
import CollegeWeProvide from "./components/Home/sections/slider-university-work";
import SeriesPrograms from "./components/Home/sections/SeriesPrograms";
import WhyWeAreBest from "./components/Home/sections/WhyWeAreBest";
import ParticipantWork from "./components/Home/sections/participant-work";
import AlumniSpeak from "./components/Home/sections/AlumniSpeak";
import TestimonialSlider from "./components/Home/sections/Testimonials";
import NewsCarousel from "./components/Home/sections/NewsCarousel";

export const HomePage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [apiError, setApiError] = useState(false);
  const [dayPrograms, setDayPrograms] = useState<DayProgram[]>([]);
  const [alumniSpeak, setAlumniSpeak] = useState<Program[]>([]);
  const [news, setNews] = useState<Program[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [collegeLogos, setCollegeLogos] = useState<Program[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          programsRes,
          dayProgramsRes,
          alumniSpeakRes,
          newsRes,
          testimonialsRes,
          collegeLogosRes,
        ]: any = await Promise.all([
          loadPrograms(),
          loadDayPrograms(),
          loadAlumniSpeak(),
          loadNews(),
          loadTestimonials(),
          loadCollegeLogos(),
        ]);

        setPrograms(programsRes);
        setDayPrograms(dayProgramsRes);
        setAlumniSpeak(alumniSpeakRes);

        setNews(newsRes);
        setTestimonials(testimonialsRes);
        setCollegeLogos(collegeLogosRes);
        setApiError(false);
      } catch (error) {
        setApiError(true);
        setPrograms([]);
        setDayPrograms([]);
      }
    };

    fetchData();
  }, []);

  const data = {
    title: "Discover & Enroll",
    subtitle: "Explore Our Programs",
  };
  return (
    <div>
      <HeroSection />
      <CollegeWeProvide collegeLogos={collegeLogos} />
      <ExplorePrograms programs={programs} apiError={apiError} data={data} />
      <SeriesPrograms universityDayPrograms={dayPrograms} />
      <WhyWeAreBest />
      <TestimonialSlider testimonials={testimonials} />
      <ParticipantWork />
      <AlumniSpeak alumniSpeak={alumniSpeak} />
      <UpskillForm />
      <NewsCarousel news={news} />
    </div>
  );
};

export default HomePage;
