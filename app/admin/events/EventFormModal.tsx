"use client";

import { useEffect, useState } from "react";
import { X, Calendar, Image as ImageIcon, Type, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddEvent, useUpdateEvent } from "@/app/hooks/useEvents";
import { Event } from "@/app/types/events";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: Event | null;
}

const INITIAL_STATE = {
  event_image: "",
  description: "",
  is_active: "Y" as "Y" | "N",
};

export default function EventFormModal({ open, onClose, editData }: Props) {
  const addEvent = useAddEvent();
  const updateEvent = useUpdateEvent();
  const [form, setForm] = useState(INITIAL_STATE);

  useEffect(() => {
    if (open) {
      setForm(editData ? { 
        event_image: editData.event_image, 
        description: editData.description, 
        is_active: editData.is_active 
      } : INITIAL_STATE);
    }
  }, [open, editData]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editData) {
      updateEvent.mutate({ id: editData.id, data: form });
    } else {
      addEvent.mutate(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
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
          
          {/* Image Preview Area */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <ImageIcon size={14} /> Event Preview
            </label>
            <div className="relative aspect-video w-full rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 overflow-hidden flex items-center justify-center group">
              {form.event_image ? (
                <img 
                  src={form.event_image} 
                  alt="Preview" 
                  className="h-full w-full object-cover transition-opacity group-hover:opacity-75"
                  onError={(e) => (e.currentTarget.src = "https://placehold.co/600x400?text=Invalid+Image+URL")}
                />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="mx-auto text-slate-300 mb-2" size={32} />
                  <p className="text-xs text-slate-400 font-medium text-balance text-center">No image selected</p>
                </div>
              )}
            </div>
            <input
              placeholder="Paste Image URL here..."
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all"
              value={form.event_image}
              onChange={(e) => setForm({ ...form, event_image: e.target.value })}
              required
            />
          </div>

          {/* Description Field */}
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

          {/* Status Selection */}
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

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
            <Button variant="ghost" type="button" onClick={onClose} className="text-slate-500 font-medium hover:bg-slate-100">
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 font-semibold shadow-md shadow-orange-100 transition-all active:scale-95"
              disabled={addEvent.isPending || updateEvent.isPending}
            >
              {editData ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}