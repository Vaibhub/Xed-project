"use client";

import { useState } from "react";
import { 
  Edit2, 
  Trash2, 
  PlayCircle, 
  Building2, 
  GraduationCap, 
  CheckCircle2, 
  PauseCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AlumniSpeakFormModal from "./AlumniSpeakFormModal";
import { VideoTestimonial } from "@/app/types/VideoTestimonial";
import { 
  useAlumniSpeaks, 
  useDeleteAlumniSpeak, 
  useUpdateAlumniSpeakStatus 
} from "@/app/hooks/useAlumniSpeaks";

export default function AlumniSpeakList() {
  const { data = [], isLoading } = useAlumniSpeaks();
  const deleteMutation = useDeleteAlumniSpeak();
  const statusMutation = useUpdateAlumniSpeakStatus();

  const [editData, setEditData] = useState<VideoTestimonial | null>(null);

  if (isLoading) {
    return <div className="p-12 text-center text-slate-400 animate-pulse">Loading success stories...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Alumnus Profile</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Career Info</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-center">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="group hover:bg-emerald-50/30 transition-colors">
                  {/* Speaker & Thumbnail Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-14 w-24 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 group/video">
                        <img 
                          src={item.thumbnail_image} 
                          className="h-full w-full object-cover transition-transform group-hover/video:scale-105" 
                          alt={item.speaker_name} 
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/40 transition-colors">
                          <PlayCircle className="text-white opacity-90" size={18} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{item.speaker_name}</span>
                        <a 
                          href={item.video_link} 
                          target="_blank" 
                          className="text-[11px] text-emerald-600 hover:underline mt-0.5"
                        >
                          View Video Story
                        </a>
                      </div>
                    </div>
                  </td>

                  {/* Company & Batch Column */}
                  <td className="px-6 py-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Building2 size={14} className="text-slate-400" />
                        <span className="text-sm font-medium">{item.company || "Self Employed"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <GraduationCap size={14} className="text-slate-400" />
                        <span className="text-xs uppercase tracking-tight">Batch {item.batch}</span>
                      </div>
                    </div>
                  </td>

                  {/* Status Column */}
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => statusMutation.mutate({ id: item.id, status: item.is_active === "N" })}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                        item.is_active === "Y" 
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                          : "bg-slate-100 text-slate-500 border-slate-200"
                      }`}
                    >
                      {item.is_active === "Y" ? <CheckCircle2 size={12} /> : <PauseCircle size={12} />}
                      {item.is_active === "Y" ? "Active" : "Paused"}
                    </button>
                  </td>

                  {/* Actions Column */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-600 hover:text-emerald-600 hover:bg-white shadow-sm border border-transparent hover:border-emerald-100"
                        onClick={() => setEditData(item)}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-white shadow-sm border border-transparent hover:border-red-100"
                        onClick={() => {
                          if (confirm(`Delete ${item.speaker_name}'s story?`)) {
                            deleteMutation.mutate(item.id);
                          }
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center text-slate-400">
                  <div className="flex flex-col items-center gap-2">
                    <GraduationCap size={40} className="text-slate-200" />
                    <p className="text-sm font-medium">No alumni stories published yet.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AlumniSpeakFormModal
        open={!!editData}
        editData={editData}
        onClose={() => setEditData(null)}
      />
    </div>
  );
}