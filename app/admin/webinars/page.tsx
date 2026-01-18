"use client";

import { useState } from "react";
import { Plus, MonitorPlay } from "lucide-react"; // Icons for video/webinar theme
import { Button } from "@/components/ui/button";
import WebinarList from "./WebinarList";
import WebinarFormModal from "./WebinarFormModal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-200">
                <MonitorPlay size={22} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Webinar Library
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-2 ml-12">
              Manage your video sessions, speaker profiles, and university partnerships.
            </p>
          </div>

          <Button 
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 px-6 h-11 transition-all active:scale-95"
          >
            <Plus size={18} />
            Add Webinar
          </Button>
        </div>

        {/* List Section */}
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <WebinarList />
        </div>

      </div>

      {/* Modal Overlay */}
      <WebinarFormModal 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </div>
  );
}