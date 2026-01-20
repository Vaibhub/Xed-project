"use client";

import { useEffect, useState } from "react";
import { X, User, Briefcase, GraduationCap, Video, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoTestimonial } from "@/app/types/VideoTestimonial";
import { useAddAlumniSpeak, useUpdateAlumniSpeak } from "@/app/hooks/useAlumniSpeaks";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: VideoTestimonial | null;
}

const INITIAL_STATE = {
  speaker_name: "",
  company: "",
  batch: "",
  video_link: "",
  thumbnail_image: "",
  is_active: "Y" as "Y" | "N",
};

export default function AlumniSpeakFormModal({ open, onClose, editData }: Props) {
  const addMutation = useAddAlumniSpeak();
  const updateMutation = useUpdateAlumniSpeak();
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    if (open) {
      setForm(editData ? { ...editData } : INITIAL_STATE);
    }
  }, [open, editData]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      updateMutation.mutate({ id: editData.id, data: form });
    } else {
      addMutation.mutate(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-emerald-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <GraduationCap size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              {editData ? "Edit Alumni Story" : "Add Alumni Story"}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Identity Section */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <User size={14} /> Alumnus Name
              </label>
              <input
                placeholder="Full Name"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                value={form.speaker_name}
                onChange={(e) => setForm({ ...form, speaker_name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Briefcase size={14} /> Company
              </label>
              <input
                placeholder="e.g. Google"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <GraduationCap size={14} /> Batch
              </label>
              <input
                placeholder="e.g. 2018 - 2022"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                value={form.batch}
                onChange={(e) => setForm({ ...form, batch: e.target.value })}
              />
            </div>
          </div>

          {/* Media Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Video size={14} /> Video Link
              </label>
              <input
                placeholder="YouTube or Vimeo URL"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none"
                value={form.video_link}
                onChange={(e) => setForm({ ...form, video_link: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <ImageIcon size={14} /> Thumbnail Preview
              </label>
              <div className="flex gap-4">
                <div className="h-16 w-24 rounded-lg bg-slate-50 border-2 border-dashed border-slate-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {form.thumbnail_image ? (
                    <img src={form.thumbnail_image} className="h-full w-full object-cover" />
                  ) : (
                    <Video size={20} className="text-slate-300" />
                  )}
                </div>
                <input
                  placeholder="Thumbnail URL"
                  className="flex-1 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none h-fit self-center"
                  value={form.thumbnail_image}
                  onChange={(e) => setForm({ ...form, thumbnail_image: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2 mb-1">
              <CheckCircle2 size={14} /> Display Status
            </label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-emerald-500/20 outline-none"
              value={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.value as "Y" | "N" })}
            >
              <option value="Y">Active (Visible on Site)</option>
              <option value="N">Inactive (Hidden)</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
            <Button variant="ghost" type="button" onClick={onClose} className="text-slate-500">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 shadow-lg shadow-emerald-100 transition-all active:scale-95"
              disabled={addMutation.isPending || updateMutation.isPending}
            >
              {editData ? "Save Changes" : "Publish Story"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}