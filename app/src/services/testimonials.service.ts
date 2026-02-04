import API from "./api";
import {
  Testimonial,
  CreateTestimonialDto,
  UpdateTestimonialDto,
} from "@/app/types/Testimonial";

/* =======================
   GET ALL TESTIMONIALS
======================= */
export const getTestimonials = () =>
  API.get<Testimonial[]>("/admin/testimonials");

/* =======================
   CREATE TESTIMONIAL
======================= */
export const addTestimonial = (data: CreateTestimonialDto) =>
  API.post<Testimonial>("/admin/testimonials", data);

/* =======================
   UPDATE TESTIMONIAL
======================= */
export const updateTestimonial = (
  id: number,
  data: UpdateTestimonialDto
) =>
  API.put<Testimonial>(`/admin/testimonials/${id}`, data);

/* =======================
   UPDATE STATUS
======================= */
export const updateTestimonialStatus = (
  id: number,
  status: boolean
) =>
  API.patch<Testimonial>(`/admin/testimonials/${id}/status`, {
    is_active: status ? "Y" : "N",
  });

/* =======================
   DELETE TESTIMONIAL
======================= */
export const deleteTestimonial = (id: number) =>
  API.delete(`/admin/testimonials/${id}`);


export const updateTestimonialsOrder = (
  data: { id: number; order_index: number }[]
) =>
  API.post("/admin/testimonials/update-order", data);
