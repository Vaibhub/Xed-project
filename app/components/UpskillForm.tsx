
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
  const [value, setValue] = useState<any>("");

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-[#2873B8] font-semibold text-lg mb-2">
          Get Ready to Grow
        </p>

        <h2 className="text-4xl md:text-4xl font-bold mb-6">
          We’re Here to Help You Upskill!
        </h2>

        {/* Blue underline */}
        <div className="w-20 h-1 bg-[#2873B8] mx-auto mb-12 rounded"></div>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* First Name */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <Input placeholder="First" className="h-12" />
          </div>

          {/* Last Name */}
          <div className="flex flex-col">
            <label className="opacity-0 mb-1">Hidden</label>
            <Input placeholder="Last" className="h-12" />
          </div>

          {/* Email and Phone Number - Span both columns on medium screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:col-span-2">
            {/* Email */}
            <div className="flex flex-col w-full">
              <label className="font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                placeholder="yourname@example.com"
                className="h-12"
              />
            </div>

            {/* Phone Number */}
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
          </div>

          {/* Country - Span both columns */}
          <div className="flex flex-col w-full md:col-span-2">
            <label className="font-medium mb-1">
              Country <span className="text-red-500">*</span>
            </label>

            <Select>
              <SelectTrigger className="!h-12 w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>

              <SelectContent className="w-full">
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="uae">UAE</SelectItem>
                <SelectItem value="usa">USA</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-start">
            <Button className="!bg-[#2873B8] hover:bg-[#1f5a8f] text-white px-8 py-6 text-lg rounded-md">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}