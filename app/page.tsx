import HeroSection from "./components/HeroSections";
import ExplorePrograms from "./components/ExplorePrograms";
import { Program } from "./types/programs";
import { fetchPrograms } from "@/lib/programs.server";

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
      <ExplorePrograms
        programs={programs}
        apiError={apiError}
        data={data}
      />
    </div>
  );
}
