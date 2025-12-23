// src/components/LeadershipCard.jsx
"use client"
import { useState } from "react";

export default function LeadershipCard({
  name,
  role,
  description,
  fullDescription,
  imageSrc,
  imageAlt = "",
  linkedinBadge,
  linkedinUrl,
  className = "",
}:any) {
  const [expanded, setExpanded] = useState(false);

  const textToShow = expanded ? fullDescription || description : description;

  return (
    <article
      className={`bg-white w-full sm:w-[370px] flex flex-col h-full ${className}`}
    >
      <div className="relative">
        <img
          src={imageSrc || "/assets/placeholder-avatar.jpg"}
          alt={imageAlt || name}
          className="w-full h-64 md:h-[370px] object-cover"
        />

        {linkedinBadge && (
          <>
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${name} LinkedIn`}
                className="absolute bottom-3 right-3 inline-flex items-center justify-center rounded-md bg-white p-1.5 shadow-md"
              >
                <img
                  src={linkedinBadge}
                  alt="LinkedIn"
                  className="w-8 h-8 md:w-10 md:h-10 object-contain"
                />
              </a>
            ) : (
              <div></div>
            )}
          </>
        )}
      </div>

      <div className="mt-2 px-4 py-5 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-semibold text-black mb-1">
          {name}
        </h3>

        <p className="text-sm md:text-base font-semibold text-black mb-3">
          {role}
        </p>

        <p
          className={`text-sm md:text-base text-gray-500 leading-relaxed transition-all duration-300 ${
            expanded ? "line-clamp-none" : "line-clamp-3"
          }`}
        >
          {textToShow}
        </p>

        {(fullDescription || (description && description.length > 220)) && (
          <button
            type="button"
            onClick={() => setExpanded((s) => !s)}
            className="mt-3 text-base font-medium text-[rgb(40,115,184)] focus:outline-none self-start"
            aria-expanded={expanded}
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </article>
  );
}
