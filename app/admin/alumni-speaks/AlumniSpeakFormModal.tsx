"use client";

import { useEffect, useState } from "react";
import {
  X,
  User,
  Briefcase,
  GraduationCap,
  Video,
  Image as ImageIcon,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoTestimonial } from "@/app/types/VideoTestimonial";
import {
  useAddAlumniSpeak,
  useUpdateAlumniSpeak,
} from "@/app/hooks/useAlumniSpeaks";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: VideoTestimonial | null;
}

interface AlumniFormState {
  speaker_name: string;
  company: string;
  batch: string;
  video_link: string; // Naya field for video binary
  video_preview: string; // Video preview ke liye
  thumbnail_image: File | null;
  preview_url: string;
  is_active: "Y" | "N";
}

const INITIAL_STATE: AlumniFormState = {
  speaker_name: "",
  company: "",
  batch: "",
  video_link: "",
  video_preview: "",
  thumbnail_image: null,
  preview_url: "",
  is_active: "Y",
};

export default function AlumniSpeakFormModal({
  open,
  onClose,
  editData,
}: Props) {
  const addMutation = useAddAlumniSpeak();
  const updateMutation = useUpdateAlumniSpeak();
  const [form, setForm] = useState<AlumniFormState>(INITIAL_STATE);

  useEffect(() => {
    if (open) {
      if (editData) {
        setForm({
          speaker_name: editData.speaker_name || "",
          company: editData.company || "",
          batch: editData.batch || "",
          video_link: editData?.video_link,
          video_preview: (editData as any).video_link || "",
          thumbnail_image: null,
          preview_url: editData.thumbnail_image || "",
          is_active: editData.is_active || "Y",
        });
      } else {
        setForm(INITIAL_STATE);
      }
    }
  }, [open, editData]);

  if (!open) return null;



  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        thumbnail_image: file,
        preview_url: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("speaker_name", form.speaker_name);
    payload.append("company", form.company);
    payload.append("batch", form.batch);
    payload.append("is_active", form.is_active);
    payload.append("video_link", form.video_link);

    if (form.thumbnail_image) {
      payload.append("thumbnail_image", form.thumbnail_image);
    }

    try {
      if (editData) {
        await updateMutation.mutateAsync({
          id: editData.id,
          data: payload as any,
        });
      } else {
        await addMutation.mutateAsync(payload as any);
      }
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-emerald-50/30">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-lg text-white">
              <GraduationCap size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              {editData ? "Edit Alumni Story" : "Add Alumni Story"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white rounded-full transition-colors border border-transparent hover:border-slate-200"
          >
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 max-h-[80vh] overflow-y-auto"
        >
          {/* Identity Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <User size={14} /> Alumnus Name
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500"
                value={form.speaker_name}
                onChange={(e) =>
                  setForm({ ...form, speaker_name: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <Briefcase size={14} /> Company
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <GraduationCap size={14} /> Batch
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500"
                value={form.batch}
                onChange={(e) => setForm({ ...form, batch: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            {/* 🎥 Video Upload Section */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <GraduationCap size={14} /> Video LinK
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500"
                value={form.video_link}
                placeholder="Video URL"
                onChange={(e) => setForm({ ...form, video_link: e.target.value })}
              />
            </div>

            {/* 🖼️ Thumbnail Upload Section */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                <ImageIcon size={14} /> Thumbnail Image
              </label>
              <div className="flex gap-4 items-center p-3 border border-dashed border-slate-200 rounded-xl">
                <div className="h-16 w-24 rounded-lg bg-slate-50 flex-shrink-0 overflow-hidden border border-slate-100">
                  {form.preview_url ? (
                    <img
                      src={form.preview_url}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-300">
                      <ImageIcon size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    id="thumbnail-upload"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer inline-flex items-center px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-md hover:bg-emerald-100"
                  >
                    {form.thumbnail_image ? "Change Image" : "Upload Thumbnail"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 flex items-center gap-2">
              <CheckCircle2 size={14} /> Display Status
            </label>
            <select
              className="w-full border border-slate-200 rounded-lg p-2.5 text-sm bg-white outline-none focus:ring-2 focus:ring-emerald-500/20"
              value={form.is_active}
              onChange={(e) =>
                setForm({ ...form, is_active: e.target.value as "Y" | "N" })
              }
            >
              <option value="Y">Active</option>
              <option value="N">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-slate-50">
            <Button variant="ghost" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
              disabled={addMutation.isPending || updateMutation.isPending}
            >
              {addMutation.isPending || updateMutation.isPending
                ? "Uploading..."
                : editData
                  ? "Save Changes"
                  : "Publish Story"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
