"use client";

import { useState } from "react";
import { Plus, CalendarDays, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventList from "./EventList";
import EventFormModal from "./EventFormModal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500 rounded-xl text-white shadow-lg shadow-orange-200">
                <CalendarDays size={22} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Event Management
                </h1>
                <div className="flex items-center gap-1.5 text-orange-600 mt-0.5">
                  <Sparkles size={14} />
                  <span className="text-xs font-semibold uppercase tracking-wider">Live Gallery</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-100 flex items-center gap-2 px-6 h-11 transition-all active:scale-95"
          >
            <Plus size={18} />
            Add New Event
          </Button>
        </div>

        {/* Content Section */}
        <div className="animate-in fade-in slide-in-from-bottom-3 duration-700">
          <EventList />
        </div>

      </div>

      {/* Modal logic remains the same */}
      <EventFormModal 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </div>
  );
}