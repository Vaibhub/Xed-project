import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  updateTestimonialStatus,
  deleteTestimonial,
} from "@/src/services/testimonials.service";
import {
  CreateTestimonialDto,
  UpdateTestimonialDto,
} from "@/app/types/Testimonial";

/* =======================
   GET TESTIMONIALS
======================= */
export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await getTestimonials();
      return res.data;
    },
  });
};

/* =======================
   ADD TESTIMONIAL
======================= */
export const useAddTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTestimonialDto) =>
      addTestimonial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      });
    },
  });
};

/* =======================
   UPDATE TESTIMONIAL
======================= */
export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateTestimonialDto;
    }) => updateTestimonial(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      });
    },
  });
};

/* =======================
   UPDATE STATUS
======================= */
export const useUpdateTestimonialStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: boolean;
    }) => updateTestimonialStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      });
    },
  });
};

/* =======================
   DELETE TESTIMONIAL
======================= */
export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["testimonials"],
      });
    },
  });
};
