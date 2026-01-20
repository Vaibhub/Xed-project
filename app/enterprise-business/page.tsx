"use client";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { loadCollegeLogos } from "../loadPrograms";
import CollegeWeProvide from "../components/Home/sections/slider-university-work";

function EnterpriseBusinessPage() {
  const [value, setValue] = useState<any>("");
 
  return (
    <div className="w-full">
      <div className=" py-10">
        <div className="grid grid-cols-12 gap-0">
          {/* LEFT SECTION */}
          <div className=" col-span-12  md:col-span-7 bg-[#2873b8] text-white  py-24">
            <div className="max-w-7xl mx-auto px-10">
              <h2 className="text-3xl font-bold  leading-tight container">
                Executive Education For <br /> Your Organization
              </h2>

              <p className="mt-6 text-xl md:max-w-lg  ">
                Tailored and open programs designed for diverse industries and
                organizations.
              </p>

              {/* line */}
              <div className="mt-10 w-48 h-1 bg-white opacity-90"></div>

              {/* Button */}
              <button className="mt-10 bg-white text-[#2873b8] px-8 py-4 rounded-md font-semibold shadow">
                View Programs
              </button>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="col-span-12 md:col-span-5 bg-white px-12 py-16">
            <h2 className="text-3xl font-bold mb-10">Get in Touch</h2>

            <form className="space-y-6">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-medium">Full Name *</label>
                  <input type="text" className="w-full border p-3 rounded-md" />
                </div>

                <div>
                  <label className="block font-medium">Organization *</label>
                  <input type="text" className="w-full border p-3 rounded-md" />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                <div className="flex flex-col w-full">
                  <label className="font-medium mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>

                  <PhoneInput
                    country="us"
                    value={value}
                    onChange={setValue}
                    containerClass="w-full "
                    inputClass="!w-full !h-12"
                  />
                </div>

                <div>
                  <label className="block font-medium">Email *</label>
                  <input
                    type="email"
                    className="w-full border p-3 rounded-md"
                  />
                </div>
              </div>

              {/* Full width message */}
              <div>
                <label className="block font-medium">Message (Optional)</label>
                <textarea
                  rows={4}
                  className="w-full border p-3 rounded-md"
                ></textarea>
              </div>

              {/* Full width button */}
              <button className=" px-10 text-center  text-white !bg-[#2873b8]  py-3 rounded-md font-semibold">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto  py-16  gap-6">
        <p>
          At XED, we are proud to collaborate with some of the world’s leading
          enterprise companies, delivering tailored custom programs and open
          courses to meet the diverse needs of industries and organizations
          globally.
        </p>
        <button className="text-[#2873b8] border p-2 bg-white mt-5 font-semibold">
          View Our Programs
        </button>
      </div>
      <section className="w-full bg-[#f5f5f5] py-16">
        <div className="max-w-7xl mx-auto flex justify-between gap-10  items-center ">
          {/* LEFT IMAGE */}
          <div className="w-full">
            <img
              src="/image.png"
              alt="Custom Programs"
              className=" w-100 h-100 rounded-lg shadow-md object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Custom Programs
            </h2>

            <p className="text-gray-700 leading-relaxed justify-end items-end">
              We partner with your organization to design and deliver bespoke
              learning solutions that address your unique business challenges.
              Partnering with Ivy League and top global universities, we bring
              together participants from leading corporations worldwide, holding
              executive leadership roles such as Director, Vice President,
              President, CEO, CHRO, and Business Head.
            </p>

            <p className="text-gray-700 leading-relaxed mt-4">
              Each program is then customized to align with your organization’s
              business environment, address its specific challenges, and support
              its vision for the future.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mt-30 mx-auto flex justify-between gap-10  items-center ">
          {/* LEFT IMAGE */}
          <div className="w-full">
            <img
              src="/image1.png"
              alt="Custom Programs"
              className=" w-100 h-100 rounded-lg shadow-md object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Programs
            </h2>

            <p className="text-black leading-relaxed justify-end items-end">
              We enable brands to leverage our vast range of open programs to
              get a head start on their continuous learning journey. Nominate
              your teams for some of the best leadership and development
              programs designed by the world’s most acclaimed faculty and
              universities. Nominating organizations can either team up with XED
              to curate the program and faculty or choose from our selection of
              universities and programs to deliver the program.
            </p>

            <p className="text-black leading-relaxed mt-4 text-lg font-semibold">
              To get the best out of XED’s offerings, we recommend the following
              steps:
            </p>
            <ul className="list-disc mx-6 mt-1">
              <li>Identify your learning objectives and the target groups</li>
              <li>Select a program to bridge the learning gap</li>
              <li>
                Upskill and reskill your organization’s leaders with a
                high-impact learning experience
              </li>
              <li>
                Evaluate, measure and get detailed feedback on their progress
              </li>
            </ul>
            <button className="text-[#2873b8] border p-3 mt-5">
              View Programs
            </button>
          </div>
        </div>
      </section>
      <CollegeWeProvide  />
    </div>
  );
}

export default EnterpriseBusinessPage;
