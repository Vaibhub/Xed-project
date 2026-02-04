"use client";

import { useEffect, useState } from "react";
import {
  X,
  Video,
  User,
  Image as ImageIcon,
  PlayCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Webinar } from "@/app/types/Webinar";
import { useAddWebinar, useUpdateWebinar } from "@/app/hooks/useWebinars";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: Webinar | null;
}
interface WebinarFormState {
  title: string;
  speaker_name: string;
  university_name: string;
  speaker_image: File | null;
  thumbnail_image: File | null;
  video_file: File | null;
  is_active: "Y" | "N";
  // Previews
  speaker_preview: string;
  thumbnail_preview: string;
  video_preview: string;
}

const INITIAL_STATE: WebinarFormState = {
  title: "",
  speaker_name: "",
  university_name: "",
  speaker_image: null,
  thumbnail_image: null,
  video_file: null,
  is_active: "Y",
  speaker_preview: "",
  thumbnail_preview: "",
  video_preview: "",
};

export default function WebinarFormModal({ open, onClose, editData }: Props) {
  const addWebinar = useAddWebinar();
  const updateWebinar = useUpdateWebinar();
  const [form, setForm] = useState<WebinarFormState>(INITIAL_STATE);

  useEffect(() => {
    if (open) {
      if (editData) {
        setForm({
          ...INITIAL_STATE,
          title: editData.title || "",
          speaker_name: editData.speaker_name || "",
          university_name: editData.university_name || "",
          is_active: editData.is_active || "Y",
          speaker_preview: editData.speaker_image || "",
          thumbnail_preview: editData.thumbnail_image || "",
          video_preview: (editData as any).video_link || "",
        });
      } else {
        setForm(INITIAL_STATE);
      }
    }
  }, [open, editData]);

  if (!open) return null;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "speaker_image" | "thumbnail_image" | "video_file",
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewKey =
        field === "video_file"
          ? "video_preview"
          : field === "speaker_image"
            ? "speaker_preview"
            : "thumbnail_preview";
      setForm((prev) => ({
        ...prev,
        [field]: file,
        [previewKey]: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("speaker_name", form.speaker_name);
    payload.append("university_name", form.university_name);
    payload.append("is_active", form.is_active);

    // Matching backend keys in upload.fields
    if (form.speaker_image) payload.append("speaker_image", form.speaker_image);
    if (form.thumbnail_image)
      payload.append("thumbnail_image", form.thumbnail_image);
    if (form.video_file) payload.append("video", form.video_file); 

    try {
      if (editData) {
        await updateWebinar.mutateAsync({
          id: editData.id,
          data: payload as any,
        });
      } else {
        await addWebinar.mutateAsync(payload as any);
      }
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 bg-white sticky top-0 z-10 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {editData ? "Update Webinar" : "Schedule New Webinar"}
            </h2>
            <p className="text-xs text-slate-500">
              Upload video and speaker assets below.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
              <Video size={16} /> Webinar Details
            </h3>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Webinar Title
              </label>
              <input
                className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:border-blue-500 outline-none"
                value={form.title}
                placeholder="Webinar Title"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-700">
                Webinar Video
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 bg-slate-50/50">
                {form.video_preview && (
                  <video
                    src={form.video_preview}
                    className="w-full h-32 rounded bg-black mb-3"
                    controls
                  />
                )}
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="video/*"
                    id="v-file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "video_file")}
                  />
                  <label
                    htmlFor="v-file"
                    className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border rounded text-xs font-semibold hover:bg-slate-50"
                  >
                    <PlayCircle size={14} />{" "}
                    {form.video_file ? "Change Video" : "Upload Video File"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-50">
            <h3 className="text-sm font-semibold text-blue-600 flex items-center gap-2">
              <User size={16} /> Speaker & Branding
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Speaker Name"
                className="border border-slate-200 rounded-lg p-2.5 text-sm outline-none"
                value={form.speaker_name}
                onChange={(e) =>
                  setForm({ ...form, speaker_name: e.target.value })
                }
              />
              <input
                placeholder="University"
                className="border border-slate-200 rounded-lg p-2.5 text-sm outline-none"
                value={form.university_name}
                onChange={(e) =>
                  setForm({ ...form, university_name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Speaker Image */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">
                  Speaker Photo
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-slate-100 border flex-shrink-0 overflow-hidden">
                    {form.speaker_preview ? (
                      <img
                        src={form.speaker_preview}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="p-4 text-slate-300" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id="s-img"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "speaker_image")}
                  />
                  <label
                    htmlFor="s-img"
                    className="cursor-pointer text-[10px] font-bold uppercase text-blue-600 hover:underline"
                  >
                    Choose File
                  </label>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-700">
                  Thumbnail
                </label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-24 rounded bg-slate-100 border flex-shrink-0 overflow-hidden">
                    {form.thumbnail_preview ? (
                      <img
                        src={form.thumbnail_preview}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="p-4 text-slate-300" />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    id="t-img"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, "thumbnail_image")}
                  />
                  <label
                    htmlFor="t-img"
                    className="cursor-pointer text-[10px] font-bold uppercase text-blue-600 hover:underline"
                  >
                    Choose File
                  </label>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            disabled={addWebinar.isPending || updateWebinar.isPending}
          >
            {addWebinar.isPending || updateWebinar.isPending
              ? "Uploading..."
              : editData
                ? "Save Changes"
                : "Create"}
          </Button>
        </div>
      </div>
    </div>
  );
}
