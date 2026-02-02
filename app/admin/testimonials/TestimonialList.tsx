"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, Quote, CheckCircle2, XCircle, MoreVertical, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import TestimonialFormModal from "./TestimonialFormModal";
import { Testimonial } from "@/app/types/Testimonial";
import { useDeleteTestimonial, useTestimonials, useUpdateTestimonialStatus, useUpdateTestimonialOrder } from "@/app/hooks/useTestimonials";

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
  item: Testimonial;
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

export default function TestimonialList() {
  const { data = [], isLoading } = useTestimonials();
  const deleteTestimonial = useDeleteTestimonial();
  const updateStatus = useUpdateTestimonialStatus();
  const updateOrderMutation = useUpdateTestimonialOrder();

  const [rows, setRows] = useState<Testimonial[]>([]);
  const [editData, setEditData] = useState<Testimonial | null>(null);

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

  if (isLoading) return <div className="p-10 text-center animate-pulse text-slate-400">Loading testimonials...</div>;

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
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="w-8"></th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Speaker</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Message</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.length > 0 ? (
                  rows.map((item) => (
                    <SortableRow key={item.id} item={item}>
                      {/* Speaker Profile Column */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full border border-slate-200 bg-slate-100 overflow-hidden flex-shrink-0">
                            <img 
                              src={item.speaker_image || "https://ui-avatars.com/api/?name=" + item.name} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">{item.name}</div>
                            <div className="text-xs text-slate-500">{item.designation}</div>
                          </div>
                        </div>
                      </td>

                      {/* Message Snippet Column */}
                      <td className="px-6 py-4 max-w-xs">
                        <div className="flex gap-2">
                          <Quote size={14} className="text-slate-300 flex-shrink-0 mt-1" />
                          <p className="text-sm text-slate-600 line-clamp-2 italic">
                            {item.message}
                          </p>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => updateStatus.mutate({ id: item.id, status: item.is_active === "N" })}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                            item.is_active === "Y" 
                              ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" 
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {item.is_active === "Y" ? (
                            <CheckCircle2 size={12} />
                          ) : (
                            <XCircle size={12} />
                          )}
                          {item.is_active === "Y" ? "Active" : "Hidden"}
                        </button>
                      </td>

                      {/* Actions Column */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => setEditData(item)}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                              if(confirm("Delete this testimonial?")) deleteTestimonial.mutate(item.id);
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
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <p className="text-slate-400 text-sm">No testimonials found.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      <TestimonialFormModal
        open={!!editData}
        editData={editData}
        onClose={() => setEditData(null)}
      />
    </div>
  );
}