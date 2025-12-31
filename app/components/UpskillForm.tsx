"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";

export default function UpskillForm() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/send-upskill", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        phone,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      alert("Form submitted successfully ✅");
      setForm({ firstName: "", lastName: "", email: "", country: "" });
      setPhone("");
    } else {
      alert("Something went wrong ❌");
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">
          We’re Here to Help You Upskill!
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left"
        >
          <div>
            <label>Name *</label>
            <Input
              className="h-12"
              placeholder="First"
              value={form.firstName}
              onChange={(e) =>
                setForm({ ...form, firstName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="opacity-0">Hidden</label>
            <Input
              className="h-12"
              placeholder="Last"
              value={form.lastName}
              onChange={(e) =>
                setForm({ ...form, lastName: e.target.value })
              }
            />
          </div>

          <div>
            <label>Email *</label>
            <Input
              type="email"
              className="h-12"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label>Phone *</label>
            <PhoneInput
              country="in"
              value={phone}
              onChange={setPhone}
              inputClass="!w-full !h-12"
            />
          </div>

          <div className="md:col-span-2">
            <label>Country *</label>
            <Select
              onValueChange={(value) =>
                setForm({ ...form, country: value })
              }
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="uk">UK</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Button
              disabled={loading}
              className="bg-[#2873B8] text-white px-10 py-6"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
