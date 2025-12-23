
export default function ParticipantWork() {
  const collegeLogos = [
    "/home/past-participant/1.png",
    "/home/past-participant/2.png",
    "/home/past-participant/3.png",
    "/home/past-participant/4.png",
    "/home/past-participant/5.png",
    "/home/past-participant/6.png",
    "/home/past-participant/7.png",
    "/home/past-participant/8.png",
    "/home/past-participant/9.png",
    
  ];

  return (
    <section className="py-10">
      <div className="max-w-7xl  mx-auto text-center border-t">
        <h2 className="text-2xl md:text-3xl pt-10 pb-2 font-semibold">
Where Our Past Participants Work
        </h2>
      </div>

      <div className="w-full">
        <div className="college_provide">
          <div className="slide_college">
            <div className="college_logo">
              {/* First row */}
              {collegeLogos.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`logo-${i}`}
                  width={150}
                  height={120}
                  className="logo_img"
                />
              ))}

              {/* Duplicate row for smooth infinite scroll */}
              {collegeLogos.map((src, i) => (
                <img
                  key={`${i}-dup`}
                  src={src}
                  alt={`logo-dup-${i}`}
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
