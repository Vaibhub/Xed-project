import React from "react";
import { FileText } from "lucide-react";

export default function PolicyCard({
  title,
  fileType = "PDF",
  fileUrl,
  iconSrc,
  className = "",
}:any) {
  return (
    <article
      className={`border border-gray-200 p-5 rounded-sm bg-white ${className}`}
    >
      <div className="flex flex-col items-start gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-md bg-[rgba(10,102,194,0.06)]">
          <FileText className="text-[#2873b8]!" />
        </div>

        <div className="">
          <h3 className="text-xl font-semibold leading-snug mb-3">{title}</h3>

          {fileUrl ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="text-md font-semibold text-[#2873b8]!"
            >
              {fileType}
            </a>
          ) : (
            <span className="text-sm text-gray-400">{fileType}</span>
          )}
        </div>
      </div>
    </article>
  );
}
