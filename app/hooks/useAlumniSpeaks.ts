import { addAlumniSpeak, deleteAlumniSpeak, getAlumniSpeaks, updateAlumniSpeak, updateAlumniSpeaksOrder, updateAlumniSpeakStatus } from "@/src/services/alumniSpeaks.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateVideoTestimonialDto, UpdateVideoTestimonialDto } from "../types/VideoTestimonial";

/* =======================
   GET
======================= */
export const useAlumniSpeaks = () => {
  return useQuery({
    queryKey: ["alumni-speaks"],
    queryFn: async () => {
      const res = await getAlumniSpeaks();
      return res.data;
    },
  });
};

/* =======================
   CREATE
======================= */
export const useAddAlumniSpeak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVideoTestimonialDto) =>
      addAlumniSpeak(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alumni-speaks"],
      });
    },
  });
};

/* =======================
   UPDATE
======================= */
export const useUpdateAlumniSpeak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateVideoTestimonialDto;
    }) => updateAlumniSpeak(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alumni-speaks"],
      });
    },
  });
};

/* =======================
   UPDATE STATUS
======================= */
export const useUpdateAlumniSpeakStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: boolean;
    }) => updateAlumniSpeakStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alumni-speaks"],
      });
    },
  });
};

/* =======================
   DELETE
======================= */
export const useDeleteAlumniSpeak = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAlumniSpeak(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alumni-speaks"],
      });
    },
  });
};

export const useUpdateAlumniSpeaksOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: { id: number; order_index: number }[]
    ) => updateAlumniSpeaksOrder(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["alumni-speaks"],
      });
    },
  });
};
