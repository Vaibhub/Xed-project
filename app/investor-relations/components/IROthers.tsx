"use client";

import { useSearchParams } from "next/navigation";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useEffect, useRef } from "react";

export default function IROthers() {
  const searchParams = useSearchParams();
  const display = searchParams.get("display");

  const grievanceRef = useRef<HTMLDivElement | null>(null);
  const materialsRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to selected section
  useEffect(() => {
    if (display === "grievance" && grievanceRef.current) {
      grievanceRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (display === "other-material" && materialsRef.current) {
      materialsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [display]);

  return (
    <div className="max-w-7xl mx-auto py-16">

      <h2 className="text-3xl font-semibold text-black">Others</h2>
      <div className="border-b-2 border-[#2873b8] w-24 mt-2"></div>

      {/* INVESTOR GRIEVANCE */}
      <div ref={grievanceRef} className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Investor Grievance</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card 1 */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="p-2 rounded-md bg-[#d9e5f0] inline-block mb-4">
              <IoDocumentTextOutline size={40} />
            </div>

            <h4 className="font-bold text-lg mb-4">Registrar & Share Transfer Agent</h4>

            <p className="text-gray-700 leading-6">
              <strong>KFIN TECHNOLOGIES LIMITED</strong><br />
              Phone: 02246170911<br />
              Address: 301, The Centrum, 3rd Floor, 57, Lal Bahadur Shastri Road, Nav Pada, Kurla (West), Kurla, Mumbai, Maharashtra, India, 400070<br /><br />
              Email: einward.ris@kfintech.com<br />
              Website: www.kfintech.com<br />
              Contact Person: M. Murali Krishna
            </p>
          </div>

          {/* Card 2 */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="p-2 rounded-md bg-[#d9e5f0] inline-block mb-4">
              <IoDocumentTextOutline size={40} />
            </div>

            <h4 className="font-bold text-lg mb-4">Investor Grievance Contact</h4>

            <p className="text-gray-700 leading-6">
              <strong>Archana Gupta</strong><br />
              Phone: +912245522174<br />
              Address: Unit No A 208 B, Second Floor, Rustomjee Central Park Premises, Andheri (East), Mumbai, 400093<br /><br />
              Email: investorrelations@xedinstitute.org<br />
              Website: www.xedinstitute.org
            </p>
          </div>

        </div>
      </div>

      {/* OTHER MATERIALS */}
      <div ref={materialsRef} className="mt-16">
        <h3 className="text-xl font-semibold mb-4">Other Materials</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Material 1 */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="p-2 rounded-md bg-[#d9e5f0] inline-block mb-4">
              <IoDocumentTextOutline size={40} />
            </div>

            <h4 className="font-bold text-lg mb-3">8th EGM Notice - XED</h4>
            <a className="text-[#2873b8] hover:underline" target="_blank" href="https://xedinstitute.org/wp-content/uploads/2025/10/8th-EGM-Notice-XED.pdf">
              PDF
            </a>
          </div>

          {/* Material 2 */}
          <div className="border rounded-lg p-6 bg-white">
            <div className="p-2 rounded-md bg-[#d9e5f0] inline-block mb-4">
              <IoDocumentTextOutline size={40} />
            </div>

            <h4 className="font-bold text-lg mb-3">
              Cutting of Newspaper Publication for Continuation of MD after change in residential Status
            </h4>
            <a className="text-[#2873b8] hover:underline" target="_blank" href="https://xedinstitute.org/wp-content/uploads/2025/10/Newspaper-Publication-for-Continuation-of-MD-after-chnage-in-residential-status.pdf">
              PDF
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
