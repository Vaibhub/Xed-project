"use client";

import { useAlumniSpeaks } from "@/app/hooks/useAlumniSpeaks";
import { useState } from "react";

export default function AlumniSpeak() {
  const { data: alumniSpeak = [], isLoading } = useAlumniSpeaks();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  if (isLoading) {
    return <div className="text-center py-20 text-white">Loading...</div>;
  }

  return (
    <section className="py-16 bg-[#1E73BE] text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Alumni Speak</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {alumniSpeak.map((a: any, i: number) => {
            const embedURL = a.video_link
              ?.replace("watch?v=", "embed/")
              ?.replace("youtu.be/", "www.youtube.com/embed/")
              ?.replace("shorts/", "www.youtube.com/embed/");

            return (
              <div key={a.id ?? i} className="text-center">
                {playingIndex === i ? (
                  <iframe
                    className="w-full h-72 rounded-xl"
                    src={`${embedURL}?autoplay=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                ) : (
                  <div
                    onClick={() => setPlayingIndex(i)}
                    className="relative group cursor-pointer rounded-xl overflow-hidden"
                  >
                    <img
                      src={a.thumbnail_image}
                      alt={a.speaker_name}
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
                <h3 className="text-xl text-start font-semibold mt-4">
                  {a.speaker_name}
                </h3>
                <p className="text-md opacity-90 text-start">{a.company}</p>
                <p className="text-md mt-1 opacity-90 text-start">
                  {a.batch}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
