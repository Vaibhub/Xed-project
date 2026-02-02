import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getWebinars,
  addWebinar,
  updateWebinar,
  updateWebinarStatus,
  deleteWebinar,
  updateWebinarOrder,
} from "@/src/services/webinars.service";
import {
  CreateWebinarDto,
  UpdateWebinarDto,
} from "@/app/types/Webinar";
/* =======================
   GET WEBINARS
======================= */
export const useWebinars = () => {
  return useQuery({
    queryKey: ["webinars"],
    queryFn: async () => {
      const res = await getWebinars();
      return res.data;
    },
  });
};

/* =======================
   ADD WEBINAR
======================= */
export const useAddWebinar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWebinarDto) =>
      addWebinar(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["webinars"],
      });
    },
  });
};

/* =======================
   UPDATE WEBINAR
======================= */
export const useUpdateWebinar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateWebinarDto;
    }) => updateWebinar(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["webinars"],
      });
    },
  });
};

/* =======================
   UPDATE WEBINAR STATUS
======================= */
export const useUpdateWebinarStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: boolean;
    }) => updateWebinarStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["webinars"],
      });
    },
  });
};

/* =======================
   DELETE WEBINAR
======================= */
export const useDeleteWebinar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      deleteWebinar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["webinars"],
      });
    },
  });
};


export const useUpdateWebinarsOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: { id: number; order_index: number }[]
    ) => updateWebinarOrder(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["webinars"],
      });
    },
  });
};