"use client"
import { useEffect, useState } from "react";
import { DayProgram } from "../types/program";
import { loadDayPrograms } from "../loadPrograms";
import HeroCommon from "../components/Hero";
import SeriesPrograms from "../components/Home/sections/SeriesPrograms";


function UniversityInADayPage() {
  const [dayPrograms, setDayPrograms] = useState<DayProgram[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dayProgramsRes]: any = await Promise.all([loadDayPrograms()]);
        setDayPrograms(dayProgramsRes);
      } catch (error) {
        setDayPrograms([]);
      }
    };

    fetchData();
  }, []);
  console.log(dayPrograms)
  return (
    <div>
      <HeroCommon
        title="University in a Day Series"
        subtitle="One Mission, Many Pathways: Find the Program That’s Right for You"
      />
      <SeriesPrograms universityDayPrograms={dayPrograms} />
    </div>
  );
}

export default UniversityInADayPage;
