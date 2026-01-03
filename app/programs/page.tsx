import { loadPrograms } from "../loadPrograms";
import { Program } from "../types/programs";
import HeroCommon from "../components/Hero";
import ExplorePrograms from "../components/ExplorePrograms";
import { fetchPrograms } from "@/lib/programs.server";

export const ProgramsPage = async () => {
  let programs: Program[] = [];
  let apiError = false;

  try {
    programs = await fetchPrograms(); // ✅ clean call
  } catch (error) {
    apiError = true;
  }
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
