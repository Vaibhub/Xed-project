"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react"; // Assuming you have lucide-react
import { Button } from "@/components/ui/button";
import { News } from "@/app/types/news";
import { useAddNews, useUpdateNews } from "@/app/hooks/useNews";

interface Props {
  open: boolean;
  onClose: () => void;
  editData?: News | null;
}

const INITIAL_STATE = {
  news_image: "",
  news_link: "",
  is_active: "Y" as "Y" | "N",
};

export default function NewsFormModal({ open, onClose, editData }: Props) {
  const addNews = useAddNews();
  const updateNews = useUpdateNews();
  const [form, setForm] = useState(INITIAL_STATE);

  // Sync form with editData or reset when opening/closing
  useEffect(() => {
    if (open) {
      setForm(editData ? { 
        news_image: editData.news_image, 
        news_link: editData.news_link, 
        is_active: editData.is_active 
      } : INITIAL_STATE);
    }
  }, [open, editData]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.news_image || !form.news_link) return alert("Please fill all fields");

    if (editData) {
      updateNews.mutate({ id: editData.id, data: form });
    } else {
      addNews.mutate(form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white p-6 shadow-2xl transition-all">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">
            {editData ? "Edit News Entry" : "Create New News"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
            <input
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.news_image}
              onChange={(e) => setForm({ ...form, news_image: e.target.value })}
              className="w-full rounded-md border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">News Link</label>
            <input
              type="url"
              placeholder="https://news-site.com/article"
              value={form.news_link}
              onChange={(e) => setForm({ ...form, news_link: e.target.value })}
              className="w-full rounded-md border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
            <select
              value={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.value as "Y" | "N" })}
              className="w-full rounded-md border border-slate-300 p-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-white"
            >
              <option value="Y">Active (Visible)</option>
              <option value="N">Inactive (Hidden)</option>
            </select>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <Button variant="ghost" type="button" onClick={onClose} className="text-slate-600">
              Cancel
            </Button>
            <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                disabled={addNews.isPending || updateNews.isPending}
            >
              {editData ? "Save Changes" : "Publish News"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}