"use client";

import { useUniversityLogos } from "@/app/hooks/useUniversityLogos";
import Image from "next/image";

export default function CollegeWeProvide() {
  const { data: collegeLogos = [], isLoading } = useUniversityLogos();
  const activeLogos = collegeLogos.filter((item: any) => item.is_active === "Y");

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <section>
      <div className="max-w-7xl mx-auto text-center border-t">
        <h2 className="text-2xl md:text-3xl pt-10 pb-2 font-semibold">
          Universities We Work With
        </h2>
      </div>

      <div className="w-full">
        <div className="college_provide">
          <div className="slide_college">
            <div className="college_logo">
              {/* First row */}
              {activeLogos?.map((item: any, i: number) => (
                <Image
                  key={`logo-1-${item.id ?? i}`}
                  src={item.logo_url?.trim()}
                  alt={`university-logo-${i}`}
                  width={150}
                  height={120}
                  className="logo_img"
                />
              ))}

              {/* Duplicate row for infinite scroll */}
              {activeLogos?.map((item: any, i: number) => (
                <Image
                  key={`logo-2-${item.id ?? i}`}
                  src={item.logo_url?.trim()}
                  alt={`university-logo-duplicate-${i}`}
                  width={150}
                  height={120}
                  className="logo_img"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
