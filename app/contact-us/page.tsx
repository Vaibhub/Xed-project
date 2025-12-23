export default function ContactUs() {
  return (
    <div className="w-full">
      <section className="bg-[rgb(40,115,184)] h-[30vh] min-h-[300px] p-4 sm:p-16 flex items-center justify-center">
        <h2 className="text-3xl md:text-4xl text-white lg:text-4xl font-bold leading-tight mb-4">
          Contact Us
        </h2>
      </section>
      <div className="w-full bg-white">
        <div className="max-w-3xl mx-auto sm:max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="pt-10 sm:pt-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
              Get in Touch with Us
            </h2>

            <div className="mt-3 flex justify-center">
              <span className="block h-1 w-28 bg-[#2f6fbf] rounded-full" />
            </div>
          </div>

          {/* Form container */}
          <section className="mt-8 sm:mt-10 bg-white">
            <form
              // hook up onSubmit or action as needed
              onSubmit={(e) => {
                e.preventDefault();
                // handle submit
              }}
              className="w-full"
            >
              {/* grid: single column on mobile, two columns on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm text-slate-800 mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="fullname"
                    type="text"
                    required
                    className="block w-full rounded-sm border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder=""
                  />
                </div>

                {/* Organization */}
                <div>
                  <label className="block text-sm text-slate-800 mb-2">
                    Organization <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="organization"
                    type="text"
                    required
                    className="block w-full rounded-sm border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm text-slate-800 mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>

                  {/* 
                  Placeholder phone field.
                  Replace with react-phone-input-2 or intl-tel-input if you want the flag + country select UI.
                */}
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="block w-full rounded-sm border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder="081234 56789"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm text-slate-800 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="block w-full rounded-sm border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder=""
                  />
                </div>

                {/* Message - spans both columns on md+ */}
                <div className="md:col-span-2">
                  <label className="block text-sm text-slate-800 mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    rows={6}
                    className="block w-full rounded-sm border border-slate-200 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300"
                    placeholder=""
                  />
                </div>

                {/* Submit button area (keeps left alignment like screenshot) */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="items-center justify-center rounded-sm bg-[rgb(40,115,184)] text-white p-3 text-lg font-bold shadow-sm"
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Optional: small reCAPTCHA/placeholder block on bottom-right for mobile view */}
              <div className="mt-4"></div>
            </form>
          </section>

          {/* Join Our Team section */}
        </div>
        <section className="mt-10 sm:mt-14 bg-[#f9fafb] rounded-sm">
          <div className="py-8 px-4 sm:px-8">
            <h3 className="text-2xl font-semibold">Join Our Team</h3>
            <p className="mt-3 text-sm">
              Discover new opportunities, create an impact and be a part of the
              collaborative culture of inclusion and growth. Email your resume
              at{" "}
              <a
                href="mailto:careers@xedinstitute.org"
                className="!text-[#2873b8] underline"
              >
                careers@xedinstitute.org
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
