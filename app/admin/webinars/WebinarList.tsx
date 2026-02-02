"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, PlayCircle, GraduationCap, CheckCircle2, Circle, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import WebinarFormModal from "./WebinarFormModal";
import { Webinar } from "@/app/types/Webinar";
import { useDeleteWebinar, useUpdateWebinarStatus, useWebinars, useUpdateWebinarsOrder } from "@/app/hooks/useWebinars";

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
  item: Webinar;
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

export default function WebinarList() {
  const { data = [], isLoading } = useWebinars();
  const deleteWebinar = useDeleteWebinar();
  const updateStatus = useUpdateWebinarStatus();
  const updateOrderMutation = useUpdateWebinarsOrder();

  const [rows, setRows] = useState<Webinar[]>([]);
  const [editData, setEditData] = useState<Webinar | null>(null);

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

  if (isLoading) return <div className="p-12 text-center text-slate-500 animate-pulse">Loading webinars...</div>;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
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
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Webinar Content</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Speaker & University</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.length > 0 ? (
                  rows.map((item) => (
                    <SortableRow key={item.id} item={item}>
                      {/* Content Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-4">
                          <div className="relative h-16 w-28 rounded-md bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 group/thumb">
                            <img 
                              src={item.thumbnail_image} 
                              className="h-full w-full object-cover transition-transform group-hover/thumb:scale-105" 
                              alt="Thumbnail" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/thumb:bg-black/40 transition-colors">
                              <PlayCircle className="text-white opacity-80" size={20} />
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900 line-clamp-1">{item.title}</span>
                            <a 
                              href={item.video_link} 
                              target="_blank" 
                              className="text-[11px] text-blue-500 hover:underline mt-1 truncate max-w-[150px]"
                            >
                              View Video Link
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Speaker Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.speaker_image} 
                            className="h-9 w-9 rounded-full object-cover border border-slate-100" 
                            alt={item.speaker_name} 
                          />
                          <div>
                            <p className="text-sm font-medium text-slate-800 leading-none">{item.speaker_name}</p>
                            <div className="flex items-center gap-1 text-slate-500 mt-1">
                              <GraduationCap size={12} />
                              <span className="text-xs">{item.university_name}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => updateStatus.mutate({ id: item.id, status: item.is_active === "N" })}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                            item.is_active === "Y" 
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-100" 
                              : "bg-slate-50 text-slate-500 border border-slate-100"
                          }`}
                        >
                          {item.is_active === "Y" ? <CheckCircle2 size={12} /> : <Circle size={12} />}
                          {item.is_active === "Y" ? "Active" : "Inactive"}
                        </button>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:bg-white hover:text-blue-600 shadow-none border-none"
                            onClick={() => setEditData(item)}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:bg-white hover:text-red-600 shadow-none border-none"
                            onClick={() => {
                              if(confirm("Are you sure you want to delete this webinar?")) {
                                deleteWebinar.mutate(item.id);
                              }
                            }}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </SortableRow>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-slate-400 text-sm">
                      No webinars available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      <WebinarFormModal
        open={!!editData}
        editData={editData}
        onClose={() => setEditData(null)}
      />
    </div>
  );
}