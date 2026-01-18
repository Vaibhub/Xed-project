export type YesNo = "Y" | "N";

export interface News {
  id: number;
  news_image: string;
  news_link: string;
  is_active: YesNo;
  created_at?: string;
  updated_at?: string;
}
export interface CreateNewsDto {
  news_image: string;
  news_link: string;
  is_active: YesNo;
}
export interface UpdateNewsDto {
  news_image?: string;
  news_link?: string;
  is_active?: YesNo;
}
