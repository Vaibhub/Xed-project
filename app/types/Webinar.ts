export type YesNo = "Y" | "N";
export interface Webinar {
  id: number;
  title: string;
  speaker_name: string;
  university_name: string;
  speaker_image: string;
  thumbnail_image: string;
  video_link: string;
  is_active: YesNo;
  created_at?: string;
  updated_at?: string;
}
export interface CreateWebinarDto {
  title: string;
  speaker_name: string;
  university_name: string;
  speaker_image: string;
  thumbnail_image: string;
  video_link: string;
  is_active: YesNo;
}
export interface UpdateWebinarDto {
  title?: string;
  speaker_name?: string;
  university_name?: string;
  speaker_image?: string;
  thumbnail_image?: string;
  video_link?: string;
  is_active?: YesNo;
}
