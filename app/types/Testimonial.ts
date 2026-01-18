export type YesNo = "Y" | "N";
export interface Testimonial {
  id: number;
  name: string;
  designation: string;
  message: string;
  speaker_image: string;
  is_active: YesNo;
  created_at?: string;
  updated_at?: string;
}
export interface CreateTestimonialDto {
  name: string;
  designation: string;
  message: string;
  speaker_image: string;
  is_active: YesNo;
}
export interface UpdateTestimonialDto {
  name?: string;
  designation?: string;
  message?: string;
  speaker_image?: string;
  is_active?: YesNo;
}
