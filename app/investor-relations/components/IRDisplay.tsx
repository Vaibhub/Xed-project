"use client";

import { useSearchParams } from "next/navigation";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function IRDisplay() {
  const searchParams = useSearchParams();
  const display = searchParams.get("display");

  return (
    <div className="max-w-7xl mx-auto py-16 relative z-20">
      <h2 className="text-black text-4xl font-semibold">
        Initial Public Offering (IPO)
      </h2>

      <div className="border-b-2 border-b-[#2873b8] max-w-lg mt-2" />

      <div className="flex gap-6 w-full flex-col md:flex-row mt-8">
        {/* DRHP */}
        <div className="border md:w-[48%] p-6 mt-4">
          <div className="p-2 rounded-md mb-4 bg-[#d9e5f0] inline-block">
            <IoDocumentTextOutline size={40} />
          </div>

          <h2 className="text-xl font-bold mb-4">
            Draft Red Herring Prospectus (DRHP)
          </h2>

          <a
            href="https://xedinstitute.org/wp-content/uploads/2025/08/DRHP-Aug-Final-12.08.25.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2873b8] font-medium"
          >
            View PDF
          </a>
        </div>

        {/* Materiality Policy */}
        <div className="border md:w-[48%] p-6 mt-4">
          <div className="p-2 rounded-md mb-4 bg-[#d9e5f0] inline-block">
            <IoDocumentTextOutline size={40} />
          </div>

          <h2 className="text-xl font-bold mb-4">Materiality Policy</h2>

          <a
            href="https://xedinstitute.org/wp-content/uploads/2025/08/Materiality-Policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2873b8] font-medium"
          >
            View PDF
          </a>
        </div>
      </div>

      {/* Default View */}
      {!display && (
        <div className="mt-16">
          <h2 className="text-4xl font-bold mb-4">
            Investor Relations Overview
          </h2>
          <p className="text-gray-600 max-w-3xl">
            IPO, Financial Reporting, Governance & other documents can be
            selected from the sidebar.
          </p>
        </div>
      )}
    </div>
  );
}
