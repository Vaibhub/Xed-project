import API from "./api";
import { LoginRequest, LoginResponse, Admin } from "@/app/types/auth";

/* =======================
   LOGIN
======================= */
export const loginAdmin = (data: LoginRequest) =>
  API.post<LoginResponse>("/admin/auth/login", data);

/* =======================
   GET LOGGED IN ADMIN
======================= */
export const getMe = () =>
  API.get<Admin>("/admin/auth/me");

/* =======================
   LOGOUT
======================= */
export const logoutAdmin = () =>
  API.post("/admin/auth/logout");
