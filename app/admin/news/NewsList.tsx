"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Edit2, Trash2, Power, Image as ImageIcon, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import NewsFormModal from "./NewsFormModal";
import { News } from "@/app/types/news";
import { useDeleteNews, useNews, useUpdateNewsStatus, useUpdateNewsOrder } from "@/app/hooks/useNews";

// 🔹 DND
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/* ============================
   SORTABLE ROW
============================ */
function SortableRow({
  item,
  children,
}: {
  item: News;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className="hover:bg-slate-50/50 transition-colors group"
    >
      {/* Drag Handle */}
      <td className="px-3 py-4 text-slate-400 cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={16} />
      </td>

      {children}
    </tr>
  );
}

export default function NewsList() {
  const { data = [], isLoading } = useNews();
  const deleteNews = useDeleteNews();
  const updateStatus = useUpdateNewsStatus();
  const updateOrderMutation = useUpdateNewsOrder();

  const [rows, setRows] = useState<News[]>([]);
  const [editData, setEditData] = useState<News | null>(null);

  // Sync backend data → local state
  useEffect(() => {
    setRows(data);
  }, [data]);

  // Drag end
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setRows((items) => {
      const oldIndex = items.findIndex(i => i.id === active.id);
      const newIndex = items.findIndex(i => i.id === over.id);

      const newOrder = arrayMove(items, oldIndex, newIndex);

      // 🔥 Backend payload
      const payload = newOrder.map((item, index) => ({
        id: item.id,
        order_index: index + 1,
      }));

      updateOrderMutation.mutate(payload);

      return newOrder;
    });
  };

  if (isLoading) return <div className="p-8 text-center text-slate-500">Loading news...</div>;

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={rows.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="w-8"></th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Preview</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Link</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900">Status</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.length > 0 ? (
                rows.map((item) => (
                  <SortableRow key={item.id} item={item}>
                    <td className="px-6 py-4">
                      <div className="h-12 w-20 rounded-md bg-slate-100 overflow-hidden border border-slate-200 flex items-center justify-center">
                        {item.news_image ? (
                          <img src={item.news_image} alt="News" className="h-full w-full object-cover" />
                        ) : (
                          <ImageIcon className="text-slate-400" size={18} />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <a 
                        href={item.news_link} 
                        target="_blank" 
                        className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        View Article <ExternalLink size={14} />
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.is_active === 'Y' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.is_active === 'Y' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Toggle Status"
                          className={item.is_active === 'Y' ? 'text-emerald-600' : 'text-slate-400'}
                          onClick={() => updateStatus.mutate({ id: item.id, status: item.is_active === "N" })}
                        >
                          <Power size={18} />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-600 hover:text-blue-600"
                          onClick={() => setEditData(item)}
                        >
                          <Edit2 size={18} />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-600"
                          onClick={() => {
                            if(confirm("Are you sure you want to delete this news?")) {
                              deleteNews.mutate(item.id);
                            }
                          }}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </td>
                  </SortableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No news found. Click the "Add News" button to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>

      <NewsFormModal
        open={!!editData}
        editData={editData}
        onClose={() => setEditData(null)}
      />
    </div>
  );
}