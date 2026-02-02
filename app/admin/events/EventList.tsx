"use client";

import { useEffect, useState } from "react";
import { Edit2, Trash2, Eye, EyeOff, CalendarRange, Image as ImageIcon, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventFormModal from "./EventFormModal";
import { Event } from "@/app/types/events";
import { useDeleteEvent, useEvents, useUpdateEventStatus, useUpdateEventsOrder } from "@/app/hooks/useEvents";

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
  item: Event;
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
      className="group hover:bg-slate-50/50 transition-colors"
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

export default function EventList() {
  const { data = [], isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();
  const updateStatus = useUpdateEventStatus();
  const updateOrderMutation = useUpdateEventsOrder();

  const [rows, setRows] = useState<Event[]>([]);
  const [editData, setEditData] = useState<Event | null>(null);

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

  if (isLoading) {
    return <div className="p-12 text-center text-slate-400 animate-pulse">Loading events...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
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
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-8"></th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Event Image</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Description</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.length > 0 ? (
                  rows.map((item) => (
                    <SortableRow key={item.id} item={item}>
                      {/* Image Column */}
                      <td className="px-6 py-4">
                        <div className="relative h-16 w-28 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shadow-sm">
                          {item.event_image ? (
                            <img 
                              src={item.event_image} 
                              alt="Event" 
                              className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center">
                              <ImageIcon className="text-slate-300" size={20} />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Description Column */}
                      <td className="px-6 py-4 max-w-sm">
                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description || <span className="text-slate-300 italic">No description provided</span>}
                        </p>
                      </td>

                      {/* Status Column */}
                      <td className="px-6 py-4">
                        <button
                          onClick={() => updateStatus.mutate({ id: item.id, status: item.is_active === "N" })}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all shadow-sm border ${
                            item.is_active === "Y" 
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                              : "bg-slate-50 text-slate-500 border-slate-200"
                          }`}
                        >
                          {item.is_active === "Y" ? <Eye size={12} /> : <EyeOff size={12} />}
                          {item.is_active === "Y" ? "Visible" : "Hidden"}
                        </button>
                      </td>

                      {/* Action Column */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-600 hover:text-orange-600 hover:bg-orange-50"
                            onClick={() => setEditData(item)}
                          >
                            <Edit2 size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 text-slate-400 hover:text-red-600 hover:bg-red-50"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this event?")) {
                                deleteEvent.mutate(item.id);
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
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <CalendarRange className="text-slate-200" size={48} />
                        <p className="text-slate-400 font-medium">No events found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </SortableContext>
        </DndContext>
      </div>

      <EventFormModal
        open={!!editData}
        editData={editData}
        onClose={() => setEditData(null)}
      />
    </div>
  );
}