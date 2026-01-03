import { loadPrograms } from "../loadPrograms";
import { Program } from "../types/programs";
import HeroCommon from "../components/Hero";
import ExplorePrograms from "../components/ExplorePrograms";

export const ProgramsPage = async () => {
  let programs: Program[] = [];
  let apiError = false;

  try {
    programs = await loadPrograms(); // ✅ using static data
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
