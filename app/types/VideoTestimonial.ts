export type YesNo = "Y" | "N";
export interface VideoTestimonial {
  id: number;
  speaker_name: string;
  company: string;
  batch: string;
  video_link: string;
  thumbnail_image: string;
  is_active: YesNo;
  created_at?: string;
  updated_at?: string;
}
export interface CreateVideoTestimonialDto {
  speaker_name: string;
  company: string;
  batch: string;
  video_link: string;
  thumbnail_image: string;
  is_active: YesNo;
}
export interface UpdateVideoTestimonialDto {
  speaker_name?: string;
  company?: string;
  batch?: string;
  video_link?: string;
  thumbnail_image?: string;
  is_active?: YesNo;
}
