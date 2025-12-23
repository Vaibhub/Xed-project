import { MapPin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-4 gap-10">
        {/* Logo + Useful Links */}
        <div>
          <img src="/logo.png" alt="XED" className="w-50 mb-6" />

          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-gray-700">
            <li>
              <Link href="/programs">Programs</Link>
            </li>
            <li>
              <Link href="/enterprise-business">Enterprise Business</Link>
            </li>
            <li>
              <Link href="/knowledge-hub">Knowledge Hub</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-700">
            <li>📞 (Global): +1 6312 573288</li>
            <li>📞 (Singapore): +65 3138 5286</li>
            <li>📞 (UAE): +97 1501 227980</li>
            <li>📞 (India): +91 7702 778916</li>
            <li>✉️ info@xedinstitute.org</li>
          </ul>
        </div>

        {/* Address Section (Left) */}
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
          <div>
            <p className="font-medium flex flex-row gap-2">
              <MapPin /> USA
            </p>
            <p>146 W 29th St New York, NY 10001</p>
          </div>

          <div>
            <p className="font-medium flex flex-row gap-2">
              <MapPin /> Saudi Arabia
            </p>
            <p>RHOA8673, Kaab Ibn Malik, 2479, Al Mutamarat, Riyadh 12611</p>
          </div>

          <div>
            <p className="font-medium flex flex-row gap-2">
              <MapPin /> India (Mumbai)
            </p>
            <p>
              Unit No A, 208 B, 2nd Floor, Rustomjee Central Park, Andheri (E),
              Mumbai 400093
            </p>
          </div>
        </div>

        {/* Address Section (Right) */}
        <div className="space-y-4 text-gray-700 text-sm leading-relaxed mt-8 lg:mt-0">
          <div>
            <p className="font-medium flex flex-row gap-2">
              <MapPin /> Singapore
            </p>
            <p>80 Robinson Road #15-02, Singapore, 068898</p>
          </div>

          <div>
            <p className="font-medium flex flex-row gap-2">
              <MapPin /> UAE
            </p>
            <p>Sector 5E, Plot C42 Freej Al Qbeesat St, Abu Dhabi - 22204</p>
          </div>

          <div>
            <p className="font-medium flex flex-row gap-2">
              <MapPin /> India (Gurgaon)
            </p>
            <p>Level 18, Tower A, Building 5, DLF Cyber City, Gurgaon 122002</p>
          </div>
        </div>
      </div>

      {/* Additional Links */}
      <div className="max-w-7xl mx-auto px-4 mt-10 ">
        <h3 className="font-semibold mb-4">Additional Links</h3>

        <div className="flex !text-[#2873b8] flex-wrap gap-6 mb-6 border-t pt-6 border-b pb-6">
          <Link className="!text-[#2873b8]" href="/about">About</Link>
          <Link className="!text-[#2873b8]" href="/programs">Programs</Link>
          <Link className="!text-[#2873b8]" href="/knowledge-hub">Knowledge Hub</Link>
          <Link className="!text-[#2873b8]" href="/enterprise-business">Enterprise Business</Link>
          <Link
          className="!text-[#2873b8]"
            target="_blank"
            href="https://alumni.xedinstitute.org/?_gl=1*cgnj5u*_gcl_au*ODExMDgyMzYwLjE3NjQ5MTg1NzM.*_ga*MTY1OTQ1NzMxMi4xNzY0OTE4NTcz*_ga_FYZ13LSXT4*czE3NjQ5NDYzOTUkbzQkZzEkdDE3NjQ5NDYzOTkkajU2JGwwJGgw"
          >
            XED Alumni
          </Link>
          <Link
          className="!text-[#2873b8]"
            target="_blank"
            href="https://preferiti.xedinstitute.org/?_gl=1%2Aesald5%2A_gcl_au%2AODExMDgyMzYwLjE3NjQ5MTg1NzM.%2A_ga%2AMTY1OTQ1NzMxMi4xNzY0OTE4NTcz%2A_ga_FYZ13LSXT4%2AczE3NjQ5NDYzOTUkbzQkZzEkdDE3NjQ5NDYzOTkkajU2JGwwJGgw"
          >
            Preferiti Series
          </Link>
          <Link  className="!text-[#2873b8]" href="/university-in-a-day">University in a Day Series</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <a
            href="https://www.linkedin.com/company/xed-learning/"
            className="rounded-full  size-9 flex items-center text-2xl justify-center hover:ring-2 ring-offset-2 ring-primary border"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/XEDInstituteOfManagement/"
            className="rounded-full size-9 flex items-center text-2xl justify-center hover:ring-2 ring-offset-2 ring-primary border"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
              ></path>
            </svg>
          </a>
          <a
            href="https://www.youtube.com/channel/UCH3oYlKeCYcPXEVvnr4tyxw"
            className="rounded-full size-9 flex items-center text-2xl justify-center hover:ring-2 ring-offset-2 ring-primary border"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
              ></path>
            </svg>
          </a>
        </div>

        <p className="text-center text-gray-600 text-sm mt-8">
          Copyrights 2025 © XED – All Rights Reserved. |
          <Link href="/terms-and-conditions/" className="ml-1">
            Terms and Conditions
          </Link>{" "}
          |
          <Link href="privacy-policy/" className="ml-1">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
