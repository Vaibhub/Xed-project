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

// 1. Form state ki proper type define karein
interface FormState {
  name: string;
  designation: string;
  message: string;
  speaker_image: File | null; // Nayi image file ke liye
  preview_url: string;        // Existing ya temporary image dikhane ke liye
  is_active: "Y" | "N";
}

const INITIAL_STATE: FormState = {
  name: "",
  designation: "",
  message: "",
  speaker_image: null,
  preview_url: "",
  is_active: "Y",
};

export default function TestimonialFormModal({ open, onClose, editData }: Props) {
  const addTestimonial = useAddTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);

  // 2. Sync editData with state properly
  useEffect(() => {
    if (open) {
      if (editData) {
        setForm({
          name: editData.name || "",
          designation: editData.designation || "",
          message: editData.message || "",
          speaker_image: null, // Edit mode mein purani image file nahi hoti, sirf URL hota hai
          preview_url: editData.speaker_image || "", // Existing URL ko preview mein dalein
          is_active: editData.is_active || "Y",
        });
      } else {
        setForm(INITIAL_STATE);
      }
    }
  }, [open, editData]);

  if (!open) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        speaker_image: file,
        preview_url: URL.createObjectURL(file), // Binary file ka temporary URL banayein
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 3. FormData logic
    const payload = new FormData();
    payload.append("name", form.name);
    payload.append("designation", form.designation);
    payload.append("message", form.message);
    payload.append("is_active", form.is_active);
    
    // Agar user ne nayi file select ki hai tabhi bhejein
    if (form.speaker_image) {
      payload.append("speaker_image", form.speaker_image);
    }

    try {
      if (editData) {
        // cast to 'any' if your hook expects a DTO instead of FormData
        await updateTestimonial.mutateAsync({ id: editData.id, data: payload as any });
      } else {
        await addTestimonial.mutateAsync(payload as any);
      }
      onClose();
    } catch (error) {
      console.error("Form Submission Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
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
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                value={form.name}
                placeholder="Enter Full Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Designation</label>
              <input
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500"
                value={form.designation}
                placeholder="Enter Designation"
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Message</label>
            <textarea
              rows={4}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-blue-500 resize-none"
              value={form.message}
              placeholder="Message"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          {/* 4. File Upload Section with Preview */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Speaker Image</label>
            <div className="flex gap-4 items-center p-3 border border-dashed border-slate-200 rounded-lg">
              <div className="h-16 w-16 rounded-full bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                {form.preview_url ? (
                  <img src={form.preview_url} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <UserCircle className="h-full w-full text-slate-300" />
                )}
              </div>
              
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={handleFileChange}
                />
                <label 
                  htmlFor="image-upload" 
                  className="inline-flex px-3 py-1.5 bg-slate-50 text-slate-700 text-xs font-medium rounded border border-slate-200 cursor-pointer hover:bg-slate-100"
                >
                  {form.speaker_image ? "Change Image" : "Choose Image"}
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Visibility Status</label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:border-blue-500"
              value={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.value as "Y" | "N" })}
            >
              <option value="Y">Active (Published)</option>
              <option value="N">Inactive (Draft)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={addTestimonial.isPending || updateTestimonial.isPending}
            >
              {addTestimonial.isPending || updateTestimonial.isPending ? "Saving..." : editData ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}