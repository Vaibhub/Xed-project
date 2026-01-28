import API from "./api";
import {
  VideoTestimonial,
  CreateVideoTestimonialDto,
  UpdateVideoTestimonialDto,
  YesNo,
} from "@/app/types/VideoTestimonial";

// GET all
export const getAlumniSpeaks = () =>
  API.get<VideoTestimonial[]>("/admin/alumni-speaks");

// CREATE
export const addAlumniSpeak = (data: CreateVideoTestimonialDto) =>
  API.post<VideoTestimonial>("/admin/alumni-speaks", data);

// UPDATE
export const updateAlumniSpeak = (
  id: number,
  data: UpdateVideoTestimonialDto
) =>
  API.put<VideoTestimonial>(`/admin/alumni-speaks/${id}`, data);

// UPDATE STATUS
export const updateAlumniSpeakStatus = (
  id: number,
  status: boolean
) =>
  API.patch<VideoTestimonial>(
    `/admin/alumni-speaks/${id}/status`,
    {
      is_active: status ? "Y" : "N",
    }
  );

// DELETE
export const deleteAlumniSpeak = (id: number) =>
  API.delete(`/admin/alumni-speaks/${id}`);

// UPDATE ORDER (Drag & Drop)
export const updateAlumniSpeaksOrder = (
  data: { id: number; order_index: number }[]
) =>
  API.post("/admin/alumni-speaks/update-order", data);
