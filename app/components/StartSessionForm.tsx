import { useState, FormEvent, ChangeEvent } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
/* =========================
   Types
========================= */

type CountryOption = {
  code: string;
  label: string;
  flag: string;
  placeholder: string;
};

type FormState = {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type SessionFormProps = {
  onSubmit?: (data: FormState) => Promise<void> | void;
};

/* =========================
   Constants
========================= */

const countryOptions: CountryOption[] = [
  { code: "+91", label: "India", flag: "🇮🇳", placeholder: "081234 56789" },
  {
    code: "+1",
    label: "United States",
    flag: "🇺🇸",
    placeholder: "(555) 555-0123",
  },
  {
    code: "+44",
    label: "United Kingdom",
    flag: "🇬🇧",
    placeholder: "07123 456789",
  },
];

/* =========================
   Component
========================= */

export default function SessionForm({ onSubmit }: SessionFormProps) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    countryCode: countryOptions[0].code,
    phone: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  /* =========================
     Validation
  ========================= */

  function validate(): FormErrors {
    const e: FormErrors = {};

    if (!form.fullName.trim()) {
      e.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      e.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Enter a valid email";
    }

    if (!form.phone.trim()) {
      e.phone = "Phone is required";
    } else {
      const digits = form.phone.replace(/[^\d]/g, "");
      if (digits.length < 6) {
        e.phone = "Enter a valid phone number";
      }
    }

    return e;
  }

  /* =========================
     Submit Handler
  ========================= */

  async function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setStatus(null);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus("error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "admin@xedinstitute.org", // Placeholder recipient
          subject: "New Session Start Request",
          text: `
            Full Name: ${form.fullName}
            Email: ${form.email}
            Phone: ${form.phone}
          `,
        }),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error("Failed to send email");
      }

      if (typeof onSubmit === "function") {
        await onSubmit({ ...form });
      }

      setStatus("success");
      setForm((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        phone: "",
      }));
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  /* =========================
     JSX
  ========================= */

  return (
    <aside className="w-full max-w-2xl bg-[#f9fafb] px-20 py-6">
      <h3 className="text-xl font-semibold mb-4">
        Please Share your details to start the session
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, fullName: e.target.value })
            }
            className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(40,115,184)]
              ${errors.fullName ? "border-red-300" : "border-gray-200"}`}
            placeholder="Your full name"
            aria-invalid={!!errors.fullName}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setForm({ ...form, email: e.target.value })
            }
            className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(40,115,184)]
              ${errors.email ? "border-red-300" : "border-gray-200"}`}
            placeholder="name@example.com"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone <span className="text-red-500">*</span>
          </label>

          <div className="flex gap-3">
            {/* <select
              aria-label="Country code"
              value={form.countryCode}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setForm({ ...form, countryCode: e.target.value })
              }
              className="px-3 py-2 border border-gray-200 rounded text-sm bg-white"
            >
              {countryOptions.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select> */}
            <div className="flex flex-col w-full">
              <label className="font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>

              <PhoneInput
                country="us"
                value={form.phone}
                onChange={(value: string) =>
                  setForm({ ...form, phone: value })
                }
                placeholder="Enter phone number"
                containerClass="w-full "
                inputClass="!w-full !h-12"
              />
            </div>
            {/* <input
              id="phone"
              name="phone"
              value={form.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setForm({ ...form, phone: e.target.value })
              }
              className={`flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(40,115,184)]
                ${errors.phone ? "border-red-300" : "border-gray-200"}`}
              placeholder={
                countryOptions.find((c) => c.code === form.countryCode)
                  ?.placeholder ?? "Phone number"
              }
              aria-invalid={!!errors.phone}
            /> */}
          </div>

          {errors.phone && (
            <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center px-5 py-2 bg-[#066aab] text-white font-bold rounded shadow-sm hover:opacity-95 disabled:opacity-60"
        >
          {loading ? "Starting..." : "Start Session"}
        </button>

        {status === "success" && (
          <p className="mt-3 text-sm text-green-600">
            Thanks — we will contact you shortly.
          </p>
        )}

        {status === "error" && Object.keys(errors).length === 0 && (
          <p className="mt-3 text-sm text-red-600">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </aside>
  );
}
