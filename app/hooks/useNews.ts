import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNews,
  addNews,
  updateNews,
  updateNewsStatus,
  deleteNews,
} from "@/src/services/news.service";
import {
  CreateNewsDto,
  UpdateNewsDto,
} from "@/app/types/news";

/* =======================
   GET NEWS
======================= */
export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const res = await getNews();
      return res.data;
    },
  });
};

/* =======================
   ADD NEWS
======================= */
export const useAddNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewsDto) =>
      addNews(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
  });
};

/* =======================
   UPDATE NEWS
======================= */
export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: UpdateNewsDto;
    }) => updateNews(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
  });
};

/* =======================
   UPDATE NEWS STATUS
======================= */
export const useUpdateNewsStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: boolean;
    }) => updateNewsStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
  });
};

/* =======================
   DELETE NEWS
======================= */
export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) =>
      deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["news"],
      });
    },
  });
};
