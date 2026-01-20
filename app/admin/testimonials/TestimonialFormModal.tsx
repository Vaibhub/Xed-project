"use client";

import { useEffect, useState } from "react";
import { X, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Testimonial } from "@/app/types/Testimonial";
import { useAddTestimonial, useUpdateTestimonial } from "@/app/hooks/useTestimonials";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: Testimonial | null;
}

const INITIAL_STATE = {
  name: "",
  designation: "",
  message: "",
  speaker_image: "",
  is_active: "Y" as "Y" | "N",
};

export default function TestimonialFormModal({ open, onClose, editData }: Props) {
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
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
      updateTestimonial.mutate({ id: editData.id, data: form });
    } else {
      addTestimonial.mutate(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">
            {editData ? "Edit Testimonial" : "New Testimonial"}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Full Name</label>
              <input
                placeholder="John Doe"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Designation</label>
              <input
                placeholder="CEO at TechCorp"
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Message</label>
            <textarea
              placeholder="Write the testimonial content here..."
              rows={4}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Speaker Image URL</label>
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                {form.speaker_image ? (
                  <img src={form.speaker_image} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <UserCircle className="h-full w-full text-slate-300" />
                )}
              </div>
              <input
                placeholder="https://example.com/photo.jpg"
                className="flex-1 border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                value={form.speaker_image}
                onChange={(e) => setForm({ ...form, speaker_image: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Visibility Status</label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              value={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.value as "Y" | "N" })}
            >
              <option value="Y">Active (Published)</option>
              <option value="N">Inactive (Draft)</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-slate-50">
            <Button variant="ghost" type="button" onClick={onClose} className="text-slate-500">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[100px]"
              disabled={addTestimonial.isPending || updateTestimonial.isPending}
            >
              {editData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}