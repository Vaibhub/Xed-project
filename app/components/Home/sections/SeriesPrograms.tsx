import { DayProgram } from "@/app/types/program";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock, MapPin, MoveUpRight, Calendar } from "lucide-react";
interface SeriesProgramsProps {
  universityDayPrograms: DayProgram[];
}
export default function SeriesPrograms({universityDayPrograms}:SeriesProgramsProps) {

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          University in a Day Series Programs
        </h2>

        {/* Program Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {universityDayPrograms.map((p, i) => (
            <Card
              key={i}
              className="rounded-xl overflow-hidden border hover:shadow-lg transition bg-white"
            >
              {/* Image */}
              <div className="w-full h-56">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <CardContent className="p-5">
                <p className="text-sm text-[#2873B8] font-medium">
                  {p.university}
                </p>

                <h3 className="text-lg font-semibold mt-1 leading-snug">
                  {p.title}
                </h3>

                <div className="mt-4 space-y-2 text-sm text-slate-700">
                  {/* Date or Dates List */}
                  {p.date && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-[#2873B8]" />
                      <span>{p.date}</span>
                    </div>
                  )}

                  {p.dates && (
                    <div>
                      <p className="font-medium flex items-center gap-2">
                        <Calendar size={16} className="text-[#2873B8]" />
                        Dates and Locations:
                      </p>
                      <ul className="list-disc pl-5 mt-1 space-y-1">
                        {p.dates.map((d:any, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Duration */}
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-[#2873B8]" />
                    <span>{p.duration}</span>
                  </div>

                  {/* Location (only if single) */}
                  {p.location && (
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-[#2873B8]" />
                      <span>{p.location}</span>
                    </div>
                  )}

                  {/* Fee */}
                  {p.fee && (
                    <p className="mt-2 font-medium text-slate-700">
                      Program Fee: {p.fee}
                    </p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pb-4">
                {p.status === "open" ? (
                  <Button className="custom-btn hover:bg-[#1f5a8f] ">
                    {p.cta} <MoveUpRight className="ml-2" />
                  </Button>
                ) : (
                  <Button
                    disabled
                    className=" custom-btn text-white cursor-not-allowed"
                  >
                    Completed
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
