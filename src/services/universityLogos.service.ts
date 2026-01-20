import { CreateUniversityLogoDto, UniversityLogo } from "@/app/types/universityLogo";
import API from "./api";

export const getLogos = () =>
  API.get<UniversityLogo[]>("/admin/university-logos");

export const addLogo = (data: CreateUniversityLogoDto) =>
  API.post<UniversityLogo>("/admin/university-logos", data);

export const updateLogoStatus = (id: string, status: boolean) =>
  API.patch(`/admin/university-logos/${id}/status`, {
    is_active: status ? "Y" : "N",
  });


export const deleteLogo = (id: string) =>
  API.delete(`/admin/university-logos/${id}`);
