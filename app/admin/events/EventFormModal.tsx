"use client";

import { useEffect, useState } from "react";
import { X, Calendar, Image as ImageIcon, Type, Globe, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddEvent, useUpdateEvent } from "@/app/hooks/useEvents";
import { Event } from "@/app/types/events";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: Event | null;
}

// 1. Interface for binary file and preview
interface EventFormState {
  event_image: File | null;
  description: string;
  is_active: "Y" | "N";
  preview_url: string;
}

const INITIAL_STATE: EventFormState = {
  event_image: null,
  description: "",
  is_active: "Y",
  preview_url: "",
};

export default function EventFormModal({ open, onClose, editData }: Props) {
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const [form, setForm] = useState<EventFormState>(INITIAL_STATE);

  useEffect(() => {
    if (open) {
      if (editData) {
        setForm({
          event_image: null,
          description: editData.description || "",
          is_active: editData.is_active || "Y",
          preview_url: editData.event_image || "", // Existing image link
        });
      } else {
        setForm(INITIAL_STATE);
      }
    }
  }, [open, editData]);

  if (!open) return null;

  // 2. Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        event_image: file,
        preview_url: URL.createObjectURL(file), // Generate temporary URL for preview
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. FormData create karein
    const payload = new FormData();
    payload.append("description", form.description);
    payload.append("is_active", form.is_active);

    // Key 'event_image' hi rakha hai backend compatibility ke liye
    if (form.event_image) {
      payload.append("event_image", form.event_image);
    }

    try {
      if (editData) {
        await updateEvent.mutateAsync({ id: editData.id, data: payload as any });
      } else {
        await addEvent.mutateAsync(payload as any);
      }
      onClose();
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Calendar className="text-orange-500" size={20} />
            <h2 className="text-xl font-bold text-slate-800">
              {editData ? "Update Event" : "Create Event"}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <ImageIcon size={14} /> Event Image
            </label>
            
            <div className="relative aspect-video w-full rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex flex-col items-center justify-center group transition-colors hover:border-orange-300">
              {form.preview_url ? (
                <img 
                  src={form.preview_url} 
                  alt="Preview" 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="mx-auto text-slate-300 mb-2" size={32} />
                  <p className="text-xs text-slate-400 font-medium">No image selected</p>
                </div>
              )}
              
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                id="event-image-upload"
                className="hidden"
                onChange={handleFileChange}
              />
              
              {/* Overlay Button */}
              <label 
                htmlFor="event-image-upload"
                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer"
              >
                <Upload size={24} className="mb-1" />
                <span className="text-xs font-bold">Click to Upload</span>
              </label>
            </div>
            {form.event_image && (
              <p className="text-[10px] text-emerald-600 font-medium truncate">
                Selected: {form.event_image.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Type size={14} /> Description
            </label>
            <textarea
              placeholder="What's happening at this event?"
              rows={4}
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Globe size={14} /> Visibility Status
            </label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none appearance-none cursor-pointer"
              value={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.value as "Y" | "N" })}
            >
              <option value="Y">Live / Published</option>
              <option value="N">Hidden / Draft</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <Button variant="ghost" type="button" onClick={onClose} className="text-slate-500">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 font-semibold shadow-md"
              disabled={addEvent.isPending || updateEvent.isPending}
            >
              {addEvent.isPending || updateEvent.isPending ? "Uploading..." : editData ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}