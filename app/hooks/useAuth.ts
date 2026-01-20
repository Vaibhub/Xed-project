import { useMutation, useQuery } from "@tanstack/react-query";
import { loginAdmin, getMe, logoutAdmin } from "@/src/services/auth.service";
import { LoginRequest } from "@/app/types/auth";

/* =======================
   LOGIN
======================= */
export const useLoginAdmin = () => {
  return useMutation({
    mutationFn: (data: LoginRequest) =>
      loginAdmin(data),
  });
};

/* =======================
   GET ME
======================= */
export const useMe = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await getMe();
      return res.data;
    },
    enabled: options?.enabled, // ✅ key change
  });
};


/* =======================
   LOGOUT
======================= */
export const useLogoutAdmin = () => {
  return useMutation({
    mutationFn: logoutAdmin,
  });
};
