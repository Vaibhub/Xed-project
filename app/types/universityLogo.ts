export type YesNo = "Y" | "N";

export interface UniversityLogo {
  id: string;
  logo_url: string;
  is_active: YesNo;
  name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateUniversityLogoDto {
  logo_url: string;
  is_active: YesNo;
  name?: string;
}

export interface UpdateUniversityLogoDto {
  logo_url?: string;
  is_active?: YesNo;
  name?: string;
}
