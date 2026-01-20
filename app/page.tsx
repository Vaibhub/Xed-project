import HeroSection from "./components/HeroSections";
import ExplorePrograms from "./components/ExplorePrograms";
import { Program } from "./types/programs";
import { fetchPrograms } from "@/lib/programs.server";
import CollegeWeProvide from "./components/Home/sections/slider-university-work";
import SeriesPrograms from "./components/Home/sections/SeriesPrograms";
import WhyWeAreBest from "./components/Home/sections/WhyWeAreBest";
import TestimonialSlider from "./components/Home/sections/Testimonials";
import ParticipantWork from "./components/Home/sections/participant-work";
import AlumniSpeak from "./components/Home/sections/AlumniSpeak";
import UpskillForm from "./components/UpskillForm";
import NewsCarousel from "./components/Home/sections/NewsCarousel";
import EventsSlider from "./components/Events";
import {
  dayPrograms,
} from "./data";
export default async function HomePage() {
  let programs: Program[] = [];
  let apiError = false;

  try {
    programs = await fetchPrograms(); // ✅ clean call
  } catch (error) {
    apiError = true;
  }

  const data = {
    title: "Discover & Enroll",
    subtitle: "Explore Our Programs",
  };
  console.log(programs,"======")
  return (
    <div>
      <HeroSection />
      <CollegeWeProvide />

      <ExplorePrograms programs={programs} apiError={apiError} data={data} />
      <SeriesPrograms universityDayPrograms={dayPrograms} />
      <WhyWeAreBest />
      <TestimonialSlider />
      <ParticipantWork />
      <AlumniSpeak />
      <UpskillForm />
      <EventsSlider />
      <NewsCarousel />
    </div>
  );
}
