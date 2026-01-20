"use client";

import { useState } from "react";
import { Edit2, Trash2, Eye, EyeOff, CalendarRange, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventFormModal from "./EventFormModal";
import { Event } from "@/app/types/events";
import { useDeleteEvent, useEvents, useUpdateEventStatus } from "@/app/hooks/useEvents";

export default function EventList() {
  const { data = [], isLoading } = useEvents();
  const deleteEvent = useDeleteEvent();
  const updateStatus = useUpdateEventStatus();

  const [editData, setEditData] = useState<Event | null>(null);

  if (isLoading) {
    return <div className="p-12 text-center text-slate-400 animate-pulse">Loading events...</div>;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Event Image</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Description</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/50 transition-colors">
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <CalendarRange className="text-slate-200" size={48} />
                    <p className="text-slate-400 font-medium">No events found.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EventFormModal
        open={!!editData}
        editData={editData}
        onClose={() => setEditData(null)}
      />
    </div>
  );
}