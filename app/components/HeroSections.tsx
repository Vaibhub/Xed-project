"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import SessionForm from "./StartSessionForm";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const navigate = useRouter();
  const [showForm, setShowForm] = useState(false);
  return (
    <section className="py-16">
      <div className="px-16 mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left Section */}
          <div>
            <h2 className="text-2xl text-start sm:text-2xl lg:text-3xl font-bold leading-tight">
              Lead. With the world’s finest minds.
            </h2>

            <p className="mt-4 text-lg text-slate-600 text-start max-w-xl">
              XED partners with globally renowned universities to deliver
              high-impact executive programs — designed for decision-makers,
              built for transformation.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button
                className="custom-btn text-white hover:bg-[#1f5a8f]"
                onClick={() => navigate.push("/programs")}
              >
                Program for Individuals
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate.push("/enterprise-business")}
                className="text-[#2873B8] border-[#2873B8] hover:bg-[#2873B8]/10"
              >
                Program for Enterprises
              </Button>
            </div>
          </div>

          {/* Right Section */}
          {showForm ? (
            <div className="flex justify-center lg:justify-end">
              <SessionForm onSubmit={() => {}} />
            </div>
          ) : (
            <div className="flex justify-center lg:justify-end">
              <div className="rounded-2xl relative overflow-hidden shadow-xl border border-slate-100">
                <img
                  src="/home/image.png"
                  height={500}
                  width={500}
                  alt="hero"
                  className="object-cover"
                />

                {/* Button */}
                <button
                  onClick={() => setShowForm(true)}
                  className="custom-btn absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#2873B8] text-white px-2 py-2 rounded-lg shadow-lg"
                >
                  Talk to Academic Counselor
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
