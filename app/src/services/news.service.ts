import API from "./api";
import {
  News,
  CreateNewsDto,
  UpdateNewsDto,
} from "@/app/types/news";

/* =======================
   GET ALL NEWS
======================= */
export const getNews = () =>
  API.get<News[]>("/admin/news");

/* =======================
   CREATE NEWS
======================= */
export const addNews = (data: CreateNewsDto) =>
  API.post<News>("/admin/news", data);

/* =======================
   UPDATE NEWS
======================= */
export const updateNews = (
  id: number,
  data: UpdateNewsDto
) =>
  API.put<News>(`/admin/news/${id}`, data);

/* =======================
   UPDATE NEWS STATUS
======================= */
export const updateNewsStatus = (
  id: number,
  status: boolean
) =>
  API.patch<News>(`/admin/news/${id}/status`, {
    is_active: status ? "Y" : "N",
  });

/* =======================
   DELETE NEWS
======================= */
export const deleteNews = (id: number) =>
  API.delete(`/admin/news/${id}`);

// UPDATE ORDER (Drag & Drop)
export const updateNewsOrder = (
  data: { id: number; order_index: number }[]
) =>
  API.post("/admin/news/update-order", data);
