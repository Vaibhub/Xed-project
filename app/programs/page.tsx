"use client"
import { useEffect, useState } from "react";
import { loadPrograms } from "../loadPrograms";
import { Program } from "../types/program";
import HeroCommon from "../components/Hero";
import ExplorePrograms from "../components/ExplorePrograms";

export const ProgramsPage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
    const [apiError, setApiError] = useState(false);
  
    useEffect(() => {
      loadPrograms()
        .then((res) => setPrograms(res))
        .catch(() => {
          setApiError(true);
          setPrograms([]);
        });
    }, []);
     const data = {
      title: "",
      subtitle: "",
    };
  return (
    <div>
      {/* Programs page content */}
      <HeroCommon
        title="Explore Our Programs
"
        subtitle="One Mission, Many Pathways: Find the Program That’s Right for You
"
      />
            <ExplorePrograms programs={programs} apiError={apiError} data={data} />

    </div>
  );
};

export default ProgramsPage;
