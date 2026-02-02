import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  getLogos, 
  addLogo, 
  updateLogoStatus, 
  deleteLogo, 
  updateUniversityOrder
} from "@/src/services/universityLogos.service";
import { CreateUniversityLogoDto } from "@/app/types/universityLogo";

export const useUniversityLogos = () => {
  return useQuery({
    queryKey: ["university-logos"],
    queryFn: async () => {
      const { data } = await getLogos();
      return data;
    },
  });
};

export const useAddUniversityLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newLogo: CreateUniversityLogoDto) => addLogo(newLogo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["university-logos"] });
    },
  });
};

export const useUpdateUniversityLogoStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: boolean }) => 
      updateLogoStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["university-logos"] });
    },
  });
};

export const useDeleteUniversityLogo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteLogo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["university-logos"] });
    },
  });
};


export const useUpdateUniversityOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: { id: number; order_index: number }[]
    ) => updateUniversityOrder(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["university-logos"],
      });
    },
  });
};