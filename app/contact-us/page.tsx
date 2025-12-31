"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactUs() {
  const [phone, setPhone] = useState("");

  return (
    <div className="w-full ">
      <section className="bg-[rgb(40,115,184)] h-[30vh] min-h-[300px] p-4 sm:p-16 flex items-center justify-center">
        <h2 className="text-3xl md:text-4xl text-white font-bold">
          Contact Us
        </h2>
      </section>

      <div className="w-full bg-white py-12">
        <div className="max-w-3xl mx-auto sm:max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="pt-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Get in Touch with Us
            </h2>
            <div className="mt-3 flex justify-center">
              <span className="block h-1 w-28 bg-[#2f6fbf] rounded-full" />
            </div>
          </div>

          {/* Form */}
          <section className="mt-8 bg-white">
            <form className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-sm border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm mb-2">
                    Organization <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-sm border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                {/* Phone Number (react-phone-input-2) */}
                <div>
                  <label className="block text-sm mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>

                  <PhoneInput
                    country="in"
                    value={phone}
                    onChange={setPhone}
                    containerClass="w-full"
                    inputClass="!w-full !h-[38px] !text-sm !border !border-slate-200 !rounded-sm focus:!ring-2 focus:!ring-slate-300"
                    buttonClass="!border !border-slate-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-sm border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="block text-sm mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    rows={6}
                    className="w-full rounded-sm border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="bg-[rgb(40,115,184)] text-white p-3 text-lg font-bold rounded-sm"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
