

"use client"
import { useState } from "react";

export default function AlumniSpeak({alumniSpeak}: {alumniSpeak: any[]}) {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  // const alumni = [
  //   {
  //     name: "Lama Albattain",
  //     role: "Founder & COO",
  //     company: "TBWA Worldwide",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/shorts/4PNUsD8wv3U",
  //     thumb: "/home/alumni/1.png"
  //   },
  //   {
  //     name: "Harold Tjiptadjaja",
  //     role: "Managing Director - Investment Banking",
  //     company: "Mandiri Sekuritas",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/shorts/XG60ORmjJYk",
  //     thumb: "/home/alumni/2.png"
  //   },
  //   {
  //     name: "Faisal Alkadi",
  //     role: "Group Director",
  //     company: "Althawaqh Food Company (AFCO)",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/shorts/fxXH5f8OU54",
  //     thumb: "/home/alumni/3.png"
  //   },
  //   {
  //     name: "Samar Mohammed Omar Al Saggaf",
  //     role: "Professor",
  //     company: "King AbdulAziz University",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/shorts/9hjymVDqeNU",
  //     thumb: "/home/alumni/4.png"
  //   },
  //    {
  //     name: "Samar Mohammed Omar Al Saggaf",
  //     role: "Professor",
  //     company: "King AbdulAziz University",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/watch?v=5QtxLFKyHU8",
  //     thumb: "/home/alumni/5.png"
  //   },
  //    {
  //     name: "Samar Mohammed Omar Al Saggaf",
  //     role: "Professor",
  //     company: "King AbdulAziz University",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/watch?v=-KvaDXIIzDA",
  //     thumb: "/home/alumni/6.png"
  //   },
  //    {
  //     name: "Samar Mohammed Omar Al Saggaf",
  //     role: "Professor",
  //     company: "King AbdulAziz University",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/watch?v=3IKavqqmcF4",
  //     thumb: "/home/alumni/7.png"
  //   },
  //    {
  //     name: "Samar Mohammed Omar Al Saggaf",
  //     role: "Professor",
  //     company: "King AbdulAziz University",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/watch?v=ln8XttL9Gcs",
  //     thumb: "/home/alumni/8.png"
  //    },
  //    {
  //     name: "Andre Sylvestre",
  //     role: "Professor",
  //     company: "Eber Petrochemical Group",
  //     batch: "Cornell SELP - Class of Apr' 2024",
  //     video: "https://youtube.com/shorts/MgC36CskSjc?si=rggPSugNB4-240xw",
  //     thumb: "/home/alumni/9.png"
  //   },
  //   {
  //     name: "Samar Mohammed Omar Al Saggaf",
  //     role: "Professor",
  //     company: "King AbdulAziz University",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/shorts/bk5HhxDONtY",
  //     thumb: "/home/alumni/10.png"
  //    },
  //    {
  //     name: "Samar Mohammed Omar Al Saggaf",
  //     role: "Professor",
  //     company: "King AbdulAziz University",
  //     batch: "Cornell SELP - Class of Oct' 2023",
  //     video: "https://www.youtube.com/shorts/TGBdPsj0BJw",
  //     thumb: "/home/alumni/11.png"
  //    },

  // ];
  return (
    <section className="py-16 bg-[#1E73BE] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Alumni Speak</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {alumniSpeak?.map((a, i) => {
            const embedURL = a.video
              .replace("watch?v=", "embed/")
              .replace("shorts/", "embed/");

            return (
              <div key={i} className="text-center">
                
                {/* If this card is playing video */}
                {playingIndex === i ? (
                  <iframe
                    className="w-full h-72 rounded-xl"
                    src={`${embedURL}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                  ></iframe>
                ) : (
                  /* Thumbnail */
                  <div
                    onClick={() => setPlayingIndex(i)}
                    className="relative group cursor-pointer rounded-xl overflow-hidden"
                  >
                    <img
                      src={a.thumb}
                      alt={a.name}
                      className="w-full h-72 object-cover"
                    />

                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition">
                      <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#fff"
                          viewBox="0 0 24 24"
                          className="w-10 h-10 ml-1"
                        >
                          <path d="M3 22v-20l18 10-18 10z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {/* Info */}
                <h3 className="text-xl text-start font-semibold mt-4">{a.name}</h3>
                <p className="text-md opacity-90 text-start">{a.role}</p>
                <p className="text-md opacity-90 text-start">{a.company}</p>
                <p className="text-md mt-1 opacity-90 text-start">{a.batch}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
