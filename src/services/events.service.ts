import API from "./api";
import {
  Event,
  CreateEventDto,
  UpdateEventDto,
} from "@/app/types/events";

/* =======================
   GET ALL EVENTS
======================= */
export const getEvents = () =>
  API.get<Event[]>("/admin/events");

/* =======================
   CREATE EVENT
======================= */
export const addEvent = (data: CreateEventDto) =>
  API.post<Event>("/admin/events", data);

/* =======================
   UPDATE EVENT
======================= */
export const updateEvent = (
  id: number,
  data: UpdateEventDto
) =>
  API.put<Event>(`/admin/events/${id}`, data);

/* =======================
   UPDATE EVENT STATUS
======================= */
export const updateEventStatus = (
  id: number,
  status: boolean
) =>
  API.patch<Event>(`/admin/events/${id}/status`, {
    is_active: status ? "Y" : "N",
  });

/* =======================
   DELETE EVENT
======================= */
export const deleteEvent = (id: number) =>
  API.delete(`/admin/events/${id}`);
