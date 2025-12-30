import Image from "next/image";

export default function CollegeWeProvide({
  collegeLogos,
}: {
  collegeLogos: any[];
}) {
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
              {collegeLogos?.map((src, i) => (
                <Image
                  key={i}
                  src={src?.img}
                  alt={`logo-${i}`}
                  width={150}
                  height={120}
                  className="logo_img"
                />
              ))}

              {/* Duplicate row for smooth infinite scroll */}
              {collegeLogos?.map((src, i) => (
                <Image
                  key={i}
                  src={src?.img}
                  alt={`logo-${i}`}
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
