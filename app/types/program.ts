export interface Program {
  id: number;
  university: string;
  title: string;
  duration: string;
  location: string;
  mode: string;
  fee: string;
  category: string;
  img: string;
}

export interface DayProgram {
  id: number;
  img: string;
  university: string;
  title: string;
  duration: string;
  dates?: {
    date: string;
    city: string;
  }[];
  date?: string;
  location?: string;
  fee?: string;
  cta?: string;
  status: "open" | "completed";
}
