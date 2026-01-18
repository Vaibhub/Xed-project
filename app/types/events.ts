// event.ts

export type YesNo = "Y" | "N";

export interface Event {
  id: number;
  event_image: string;
  description: string;
  is_active: YesNo;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEventDto {
  event_image: string;
  description: string;
  is_active: YesNo;
}

export interface UpdateEventDto {
  event_image?: string;
  description?: string;
  is_active?: YesNo;
}
