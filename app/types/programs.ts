export interface Currency {
  id: string;
  name: string;
  symbol: string;
  code: string;
}

export interface Fee {
  amount: number;
  currency: Currency;
}

export interface AcademicPartner {
  id: string;
  name: string;
  display_name: string;
  description: string;
  logo_url: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface ProgramMeta {
  id: string;
  name: string;
  program_key: string;
  status: "ACTIVE" | "INACTIVE";
  type: "OPEN" | "CLOSED";
  description: string;
  academic_partner: AcademicPartner;
}

export interface Program {
  id: string;
  name: string;
  cohort_key: string;
  cohort_num: number;
  duration: string;
  format: string;
  location: string;
  start_date: string;
  end_date: string;
  fees: Fee[];
  status: "ACTIVE" | "INACTIVE";
  program: ProgramMeta;
  created_at: string;
  updated_at: string;

  microsite_section?: {
    custom_domain?: string;
  };

  media_section?: {
    university_banner_url?: string;
  };
}
