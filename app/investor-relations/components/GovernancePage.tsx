"use client"
import governanceData from "../data.json";
import policiesData from "../policies.json";
import PolicyCard from "./PolicyCard";
import Linkedin from "../../../public/linkedin.png";
import LeadershipCard from "./LeadershipCard";

export default function GovernancePage() {
  const board = governanceData.slice(0, 5);
  const kmp = governanceData.slice(5);

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold">Governance</h1>
        <div className="mt-3 w-1/4 h-0.5 bg-[rgb(40,115,184)]" />
      </header>
      <section className="mb-12 mt-24">
        <h2 className="text-xl font-semibold mb-4">Board of Directors</h2>
        <div className="border-t-4 border-gray-200 mb-8" />

        <div className="space-y-10">
          <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-8">
            {board.slice(0, 2).map((person) => (
              <LeadershipCard
                key={person.id}
                name={person.name}
                role={person.role}
                description={person.fullBio}
                fullDescription={person.fullBio}
                imageSrc={person.imageSrc}
                linkedinBadge={Linkedin}
                linkedinUrl={person.linkedinUrl}
                className="w-full md:w-[370px] flex-shrink-0"
              />
            ))}
          </div>

          {/* Row 2: 3 columns on large, 2 on small/medium, 1 on xs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {board.slice(2, 5).map((person) => (
              <LeadershipCard
                key={person.id}
                name={person.name}
                role={person.role}
                description={person.fullBio}
                fullDescription={person.fullBio}
                imageSrc={person.imageSrc}
                linkedinBadge={Linkedin}
                linkedinUrl={person.linkedinUrl}
                className="w-full md:w-[370px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Brief Biographies of KMP</h2>
        <div className="border-t-4 border-gray-200 mb-8" />

        <div className="flex flex-col md:flex-row md:justify-center md:items-start gap-8">
          {kmp.map((person) => (
            <LeadershipCard
              key={person.id}
              name={person.name}
              role={person.role}
              description={person.fullBio}
              imageSrc={person.imageSrc}
              linkedinBadge={Linkedin}
              linkedinUrl={person.linkedinUrl}
              className="w-full md:w-[370px]"
            />
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-xl font-medium mb-4">Policies and Codes</h2>
        <div className="border-t border-gray-200 mb-8" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {policiesData.map((policy) => (
            <PolicyCard
              key={policy.id}
              title={policy.title}
              fileType={policy.fileType}
              fileUrl={policy.fileUrl}
              iconSrc={policy.iconSrc}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
