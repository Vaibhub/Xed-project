import API from "./api";
import {
  Webinar,
  CreateWebinarDto,
  UpdateWebinarDto,
} from "@/app/types/Webinar"

/* =======================
   GET ALL WEBINARS
======================= */
export const getWebinars = () =>
  API.get<Webinar[]>("/admin/webinars");

/* =======================
   CREATE WEBINAR
======================= */
export const addWebinar = (data: CreateWebinarDto) =>
  API.post<Webinar>("/admin/webinars", data);

/* =======================
   UPDATE WEBINAR
======================= */
export const updateWebinar = (
  id: number,
  data: UpdateWebinarDto
) =>
  API.put<Webinar>(`/admin/webinars/${id}`, data);

/* =======================
   UPDATE WEBINAR STATUS
======================= */
export const updateWebinarStatus = (
  id: number,
  status: boolean
) =>
  API.patch<Webinar>(`/admin/webinars/${id}/status`, {
    is_active: status ? "Y" : "N",
  });

/* =======================
   DELETE WEBINAR
======================= */
export const deleteWebinar = (id: number) =>
  API.delete(`/admin/webinars/${id}`);


export const updateWebinarOrder = (
  data: { id: number; order_index: number }[]
) =>
  API.post("/admin/webinars/update-order", data);