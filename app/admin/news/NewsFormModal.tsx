"use client";

import { useEffect, useState } from "react";
import { X, ImageIcon, UploadCloud } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { News } from "@/app/types/news";
import { useAddNews, useUpdateNews } from "@/app/hooks/useNews";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: News | null;
}

// 1. State Interface update karein
interface NewsFormState {
  news_image: File | null; // Ab URL string ki jagah File object hoga
  preview_url: string;     // UI mein image preview dikhane ke liye
  news_link: string;
  is_active: "Y" | "N";
}

const INITIAL_STATE: NewsFormState = {
  news_image: null,
  preview_url: "",
  news_link: "",
  is_active: "Y",
};

export default function NewsFormModal({ open, onClose, editData }: Props) {
  const addNews = useAddNews();
  const updateNews = useUpdateNews();
  const [form, setForm] = useState<NewsFormState>(INITIAL_STATE);

  useEffect(() => {
    if (open) {
      if (editData) {
        setForm({
          news_image: null, // Binary file edit mode mein reset rahegi
          preview_url: editData.news_image || "", // Existing URL ko preview mein dalein
          news_link: editData.news_link || "",
          is_active: editData.is_active || "Y",
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
        news_image: file,
        preview_url: URL.createObjectURL(file), // Temporary preview generate karein
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 3. FormData create karein
    const payload = new FormData();
    payload.append("news_link", form.news_link);
    payload.append("is_active", form.is_active);
    
    // Agar image select hui hai toh 'news_image' name se bhejien
    if (form.news_image) {
      payload.append("news_image", form.news_image);
    }

    if (editData) {
      updateNews.mutate({ id: editData.id, data: payload as any });
    } else {
      addNews.mutate(payload as any);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            {editData ? "Edit News Entry" : "Create New News"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* news_image file upload field */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">News Image</label>
            <div className="flex flex-col items-center gap-4 p-4 border-2 border-dashed border-slate-200 rounded-lg bg-slate-50/50">
              {form.preview_url ? (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                  <img src={form.preview_url} alt="Preview" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="flex flex-col items-center text-slate-400 py-4">
                  <ImageIcon size={40} className="mb-2 opacity-50" />
                  <span className="text-xs italic">No image selected</span>
                </div>
              )}
              
              <input
                type="file"
                id="news-upload"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="news-upload" 
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-md text-sm font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-all shadow-sm"
              >
                <UploadCloud size={16} />
                {form.news_image ? "Change Image" : "Choose Image File"}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">News Link</label>
            <input
              type="url"
              placeholder="https://news-site.com/article"
              value={form.news_link}
              onChange={(e) => setForm({ ...form, news_link: e.target.value })}
              className="w-full rounded-md border border-slate-300 p-2.5 text-sm focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.value as "Y" | "N" })}
              className="w-full rounded-md border border-slate-300 p-2.5 text-sm bg-white outline-none"
            >
              <option value="Y">Active (Visible)</option>
              <option value="N">Inactive (Hidden)</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <Button variant="ghost" type="button" onClick={onClose}>Cancel</Button>
            <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                disabled={addNews.isPending || updateNews.isPending}
            >
              {addNews.isPending || updateNews.isPending ? "Processing..." : editData ? "Save Changes" : "Publish News"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}