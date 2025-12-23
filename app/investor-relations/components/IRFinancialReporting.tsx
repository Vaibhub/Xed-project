"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

type DocumentItem = {
  year: string;
  label: string;
  pdf: string;
};

export default function IRFinancialReporting() {
  const searchParams = useSearchParams();
  const display = searchParams.get("display");

  const annualReportsRef = useRef<HTMLDivElement | null>(null);
  const annualReturnsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (display === "annual-reports" && annualReportsRef.current) {
      annualReportsRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (display === "annual-returns" && annualReturnsRef.current) {
      annualReturnsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [display]);

  // Default overview
  if (display !== "annual-reports" && display !== "annual-returns") {
    return (
      <div className="max-w-7xl mx-auto py-16">
        <h2 className="text-4xl font-bold mb-4">
          Financial Reporting Overview
        </h2>
        <p className="text-gray-600 max-w-3xl">
          Annual Reports aur Annual Returns ke documents yahan display honge.
        </p>
      </div>
    );
  }

  const annualReports: DocumentItem[] = [
    { year: "FY 2024-25", label: "Annual Report", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Report-2024-25.pdf" },
    { year: "FY 2023-24", label: "Annual Report", pdf: "https://xedinstitute.org/wp-content/uploads/2025/12/Annual-Report-2023-24.pdf" },
    { year: "FY 2022-23", label: "Annual Report", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Report-2022-23.pdf" },
    { year: "FY 2021-22", label: "Annual Report", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Report-2021-22.pdf" },
    { year: "FY 2020-21", label: "Annual Report", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Report-2020-21.pdf" },
    { year: "FY 2019-20", label: "Annual Report", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Report-2019-20.pdf" },
    { year: "FY 2018-19", label: "Annual Report", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Report-2018-19.pdf" },
  ];

  const annualReturns: DocumentItem[] = [
    { year: "FY 2024-25", label: "MGT-7 Annual Return", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Return-2024-25.pdf" },
    { year: "FY 2023-24", label: "MGT-7 Annual Return", pdf: "https://xedinstitute.org/wp-content/uploads/2025/08/MGT-7-FY-2023-24-1.pdf" },
    { year: "FY 2022-23", label: "MGT-7 Annual Return", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Return-2022-23.pdf" },
    { year: "FY 2021-22", label: "MGT-7 Annual Return", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Return-2021-22.pdf" },
    { year: "FY 2020-21", label: "MGT-7 Annual Return", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Return-2020-21.pdf" },
    { year: "FY 2019-20", label: "MGT-7 Annual Return", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Return-2019-20.pdf" },
    { year: "FY 2018-19", label: "MGT-7 Annual Return", pdf: "https://xedinstitute.org/wp-content/uploads/2025/09/Annual-Return-2018-19.pdf" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-16">
      <h2 className="text-3xl font-semibold text-black">
        Financial Reporting
      </h2>
      <div className="border-b-2 border-[#2873b8] w-52 mt-2" />

      {/* Annual Reports */}
      <div className="mt-10" ref={annualReportsRef}>
        <h3 className="text-xl font-semibold mb-4">Annual Reports</h3>
        <div className="space-y-4">
          {annualReports.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b py-3 text-gray-700"
            >
              <span className="w-28">{item.year}</span>
              <span className="flex-1">{item.label}</span>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2873b8] hover:underline"
              >
                PDF
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Annual Returns */}
      <div className="mt-12" ref={annualReturnsRef}>
        <h3 className="text-xl font-semibold mb-4">Annual Returns</h3>
        <div className="space-y-4">
          {annualReturns.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b py-3 text-gray-700"
            >
              <span className="w-28">{item.year}</span>
              <span className="flex-1">{item.label}</span>
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#2873b8] hover:underline"
              >
                PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
