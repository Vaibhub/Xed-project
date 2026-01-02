"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InvestorRelations({ bgImage = "/investor.png" }) {
  const navigate = useRouter();
  return (
    <section
  className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
  <div className="absolute inset-0 bg-black/80"></div>

      <div className="relative z-10 w-full max-w-7xl rounded-md overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-3">
        {/* LEFT SIDE */}
        <div className="col-span-2 p-12 lg:p-20 text-white flex flex-col justify-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Investor Relations
          </h1>
          <div className="mt-4 w-36 h-1 bg-blue-500"></div>
          <p className="mt-6 text-gray-300 max-w-xl hidden md:block">
            Key documents and governance information for our investors. Find
            annual reports, policies, prospectus and more in one place.
          </p>
        </div>

        {/* RIGHT SIDE CARD */}
        <aside className="col-span-1 bg-white p-8 lg:p-12">
          <nav aria-label="Investor relations navigation" className="space-y-6">
            <div>
              <Link
                href="/investor-relations/initial-public-offering-ipo?display=drhp"
                className="text-lg font-semibold underline! underline-offset-4"
              >
                Initial Public Offering (IPO)
              </Link>

              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <Link
                    href="/investor-relations/initial-public-offering-ipo?display=drhp"
                    className="hover:underline"
                  >
                    Draft Red Herring Prospectus (DRHP)
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <Link
                    href="/investor-relations/initial-public-offering-ipo?display=materiality-policy"
                    className="hover:underline"
                  >
                    Materiality Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/investor-relations/financial-reporting?display=annual-reports"
                className="text-lg font-semibold underline! underline-offset-4"
              >
                Financial Reporting
              </Link>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <Link
                    href="/investor-relations/financial-reporting?display=annual-reports"
                    className="hover:underline"
                  >
                    Annual Reports
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <Link
                    href="/investor-relations/financial-reporting?display=annual-returns"
                    className="hover:underline"
                  >
                    Annual Returns
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/investor-relations/governance"
                className="text-lg font-semibold underline! underline-offset-4"
              >
                Governance
              </Link>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <a
                    href="/investor-relations/governance"
                    className="hover:underline"
                  >
                    Board of Directors
                  </a>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <a
                    href="/investor-relations/governance"
                    className="hover:underline"
                  >
                    Policies and Codes
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <Link
                href="/investor-relations/others?display=grievance"
                className="text-lg font-semibold underline! underline-offset-4"
              >
                Others
              </Link>
              <ul className="mt-3 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <Link
                    href="/investor-relations/others?display=grievance"
                    className="hover:underline"
                  >
                    Investor Grievance
                  </Link>
                </li>
                <li className="flex items-center">
                  <span className="mr-3 text-2xl leading-none text-gray-400">
                    →
                  </span>
                  <Link
                    href="/investor-relations/others?display=other-material"
                    className="hover:underline"
                  >
                    Other Materials
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
      </div>
    </section>
  );
}
