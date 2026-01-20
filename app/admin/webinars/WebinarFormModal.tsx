"use client";

import { useEffect, useState } from "react";
import { X, Video, User, GraduationCap, Image as ImageIcon, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Webinar } from "@/app/types/Webinar";
import { useAddWebinar, useUpdateWebinar } from "@/app/hooks/useWebinars";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: Webinar | null;
}

const INITIAL_STATE = {
  title: "",
  speaker_name: "",
  university_name: "",
  speaker_image: "",
  thumbnail_image: "",
  video_link: "",
  is_active: "Y" as "Y" | "N",
};

export default function WebinarFormModal({ open, onClose, editData }: Props) {
  const addWebinar = useAddWebinar();
  const updateWebinar = useUpdateWebinar();
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
      updateWebinar.mutate({ id: editData.id, data: form });
    } else {
      addWebinar.mutate(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editData ? "Update Webinar" : "Schedule New Webinar"}
            </h2>
            <p className="text-xs text-slate-500">Enter webinar details and speaker information.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          
          {/* Section 1: Content */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
              <Video size={16} /> Webinar Content
            </h3>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">Webinar Title</label>
              <input
                placeholder="e.g. Advanced React Patterns 2024"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Video Link</label>
                <div className="relative">
                  <Link2 className="absolute left-3 top-3 text-slate-400" size={14} />
                  <input
                    placeholder="YouTube/Vimeo URL"
                    className="w-full border border-slate-200 rounded-lg p-2.5 pl-9 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                    value={form.video_link}
                    onChange={(e) => setForm({ ...form, video_link: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Visibility</label>
                <select
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white outline-none"
                  value={form.is_active}
                  onChange={(e) => setForm({ ...form, is_active: e.target.value as "Y" | "N" })}
                >
                  <option value="Y">Active</option>
                  <option value="N">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Speaker Details */}
          <div className="space-y-4 pt-4 border-t border-slate-50">
            <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
              <User size={16} /> Speaker Information
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">Speaker Name</label>
                <input
                  placeholder="Dr. Sarah Connor"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                  value={form.speaker_name}
                  onChange={(e) => setForm({ ...form, speaker_name: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-700">University</label>
                <input
                  placeholder="Stanford University"
                  className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none"
                  value={form.university_name}
                  onChange={(e) => setForm({ ...form, university_name: e.target.value })}
                />
              </div>
            </div>

            {/* Image URL with Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Speaker Photo URL</label>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-100 border overflow-hidden flex-shrink-0">
                    {form.speaker_image ? <img src={form.speaker_image} className="object-cover h-full w-full" /> : <User className="p-2 text-slate-300" />}
                  </div>
                  <input
                    placeholder="URL"
                    className="flex-1 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    value={form.speaker_image}
                    onChange={(e) => setForm({ ...form, speaker_image: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">Thumbnail URL</label>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-16 rounded bg-slate-100 border overflow-hidden flex-shrink-0">
                    {form.thumbnail_image ? <img src={form.thumbnail_image} className="object-cover h-full w-full" /> : <ImageIcon className="p-2 text-slate-300" />}
                  </div>
                  <input
                    placeholder="URL"
                    className="flex-1 border border-slate-200 rounded-lg p-2 text-xs outline-none"
                    value={form.thumbnail_image}
                    onChange={(e) => setForm({ ...form, thumbnail_image: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
          <Button variant="ghost" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            disabled={addWebinar.isPending || updateWebinar.isPending}
          >
            {editData ? "Save Changes" : "Create Webinar"}
          </Button>
        </div>
      </div>
    </div>
  );
}