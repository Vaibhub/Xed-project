"use client";

import { useState } from "react";
import { Plus, Newspaper } from "lucide-react"; // Icons for better visual cues
import { Button } from "@/components/ui/button";
import NewsList from "./NewsList";
import NewsFormModal from "./NewsFormModal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    // Light background for the whole page helps the white table look "lifted"
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <Newspaper size={20} />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                News Management
              </h1>
            </div>
            <p className="text-sm text-slate-500 mt-1 ml-10">
              Create, edit, and manage news articles appearing on your platform.
            </p>
          </div>

          <Button 
            onClick={() => setOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm flex items-center gap-2 px-5"
          >
            <Plus size={18} />
            Add News
          </Button>
        </div>

        {/* Content Section */}
        <div className="mt-8">
          <NewsList />
        </div>

      </div>

      {/* Modal remains hidden until state is triggered */}
      <NewsFormModal 
        open={open} 
        onClose={() => setOpen(false)} 
      />
    </div>
  );
}