"use client";

import { useState } from "react";
import { Plus, GraduationCap, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import AlumniSpeakList from "./AlumniSpeakList";
import AlumniSpeakFormModal from "./AlumniSpeakFormModal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-200">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Alumni Success Stories
                </h1>
                <div className="flex items-center gap-1.5 text-emerald-600 mt-0.5">
                  <Award size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider italic">Alumni Speak</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2 ml-14">
              Showcase the professional journey and testimonials of your distinguished alumni.
            </p>
          </div>

          <Button 
            onClick={() => setOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-100 flex items-center gap-2 px-6 h-11 transition-all active:scale-95"
          >
            <Plus size={18} />
            Add New Story
          </Button>
        </div>

        {/* Content Section */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <AlumniSpeakList />
        </div>

      </div>

      {/* Modal for adding/editing */}
      <AlumniSpeakFormModal 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </div>
  );
}