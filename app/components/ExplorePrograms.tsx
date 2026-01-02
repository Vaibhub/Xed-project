"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Search, MapPin, Clock, Laptop, MoveUpRight } from "lucide-react";
import { Program } from "../types/program";
import { usePathname } from "next/navigation";
interface Props {
  programs: Program[];
  apiError: boolean;
  data: {
    title: string;
    subtitle: string;
  }
}
export default function ExplorePrograms({ programs, apiError , data}: Props) {
  const categories = [
    "All",
    "Digital",
    "Management",
    "Entrepreneurship",
    "Finance",
    "HR",
    "Technology",
    "Leadership",
    "Mini-MBA",
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchValue, setSearchValue] = useState("");
  const [showAll, setShowAll] = useState(false);
  const location = usePathname();
  const isProgramsPage = location === "/programs";
  if (apiError) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-500 text-lg font-semibold">
            Unable to load programs. Please try again later.
          </p>
        </div>
      </section>
    );
  }
  
  const filteredPrograms = programs.filter((p) => {
    const matchesCategory =
      activeCategory === "All" || p.category === activeCategory;

    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // ⭐ SHOW ONLY 6 IF showAll = false
  const visiblePrograms = isProgramsPage
    ? filteredPrograms
    : showAll
    ? filteredPrograms
    : filteredPrograms.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-[#2873B8] font-medium">{data?.title}</p>
        <h2 className="text-3xl md:text-4xl font-bold mt-1">
         {data?.subtitle}
        </h2>

        {/* Filters + Search */}
        <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setShowAll(false); // reset when switching category
                }}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  activeCategory === cat
                    ? "custom-btn text-white border-[#2873B8]"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-[200px] ml-auto">
            <Search
              className="absolute left-3 top-3 text-slate-500"
              size={18}
            />
            <Input
              placeholder="Search Programs..."
              className="pl-10"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setShowAll(false); // reset on search
              }}
            />
          </div>
        </div>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {visiblePrograms.map((p, i) => (
            <Card
              key={i}
              className="rounded-xl overflow-hidden border hover:shadow-lg transition"
            >
              <div className="w-full h-56">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover p-4"
                />
              </div>

              <CardContent className="px-5">
                <p className="text-sm text-[#2873B8] font-medium">
                  {p.university}
                </p>
                <h3 className="text-lg font-semibold mt-1 leading-snug">
                  {p.title}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {p.duration && (
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-[#2873B8]" />
                      <span>{p.duration}</span>
                    </div>
                  )}
                  {p.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#2873B8]" />
                      <span>{p.location}</span>
                    </div>
                  )}
                  {p.mode && (
                    <div className="flex items-center gap-2">
                      <Laptop size={16} className="text-[#2873B8]" />
                      <span>{p.mode}</span>
                    </div>
                  )}
                  <p className="py-4 text-md font-medium border-b ">
                    Program Fee: {p.fee}
                  </p>
                </div>
              </CardContent>

              <CardFooter className="p-5">
                <Button className="flex items-center text-center custom-btn  hover:bg-[#1f5a8f]">
                  View Program <MoveUpRight />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* ⭐ View More Button */}
        {!isProgramsPage && !showAll && filteredPrograms.length > 6 && (
          <div className="flex justify-center mt-10">
            <Button
              onClick={() => setShowAll(true)}
              className="custom-btn px-8 py-6 text-lg hover:bg-[#1f5a8f]"
            >
              View More Programs
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
