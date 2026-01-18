import { addEvent, deleteEvent, getEvents, updateEvent, updateEventStatus } from "@/src/services/events.service";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateEventDto, UpdateEventDto } from "../types/events";


/* =======================
   GET EVENTS
======================= */
export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await getEvents();
      return res.data;
    },
  });
};

/* =======================
   ADD EVENT
======================= */
export const useAddEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateEventDto) =>
      addEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
};

/* =======================
   UPDATE EVENT
======================= */
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateEventDto;
    }) => updateEvent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
};

/* =======================
   UPDATE EVENT STATUS
======================= */
export const useUpdateEventStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: boolean;
    }) => updateEventStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
};

/* =======================
   DELETE EVENT
======================= */
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });
};
