"use client";

import { useState } from "react";
import { Plus, MessageSquareQuote } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialList from "./TestimonialList";
import TestimonialFormModal from "./TestimonialFormModal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-indigo-600 rounded-lg text-white">
                <MessageSquareQuote size={20} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Customer Testimonials
              </h1>
            </div>
            <p className="text-sm text-slate-500 ml-10">
              Manage and showcase what your clients are saying about your services.
            </p>
          </div>

          <Button 
            onClick={() => setOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-2 px-5 py-6 sm:py-2"
          >
            <Plus size={18} />
            Add Testimonial
          </Button>
        </div>

        {/* List Section */}
        <div className="relative">
          <TestimonialList />
        </div>
      </div>

      {/* Modal Overlay */}
      <TestimonialFormModal 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </div>
  );
}