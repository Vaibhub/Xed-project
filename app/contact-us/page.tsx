"use client";

import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactUs() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    organization: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "admin@xedinstitute.org",
          subject: "New Contact Us Submission",
          text: `
            Full Name: ${formData.fullName}
            Organization: ${formData.organization}
            Email: ${formData.email}
            Phone: ${phone}
            Message: ${formData.message}
          `,
        }),
      });

      if (res.ok) {
        alert("Message sent successfully ✅");
        setFormData({ fullName: "", organization: "", email: "", message: "" });
        setPhone("");
      } else {
        alert("Failed to send message ❌");
      }
    } catch (error) {
      alert("An error occurred ❌");
    } finally {
      setLoading(false);
    }
  };

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
            <form className="w-full" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
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
                    value={formData.organization}
                    onChange={(e) =>
                      setFormData({ ...formData, organization: e.target.value })
                    }
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
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
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full rounded-sm border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-slate-300"
                  />
                </div>

                {/* Submit */}
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[rgb(40,115,184)] text-white p-3 text-lg font-bold rounded-sm disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit"}
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
