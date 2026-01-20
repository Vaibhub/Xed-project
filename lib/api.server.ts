import { UniversityLogo } from "@/app/types/universityLogo";
import { Testimonial } from "@/app/types/Testimonial";
import { VideoTestimonial } from "@/app/types/VideoTestimonial";
import { News } from "@/app/types/news";
import { Event } from "@/app/types/events";
import { Webinar } from "@/app/types/Webinar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.API_KEY;

async function fetchFromApi<T>(endpoint: string): Promise<T[]> {
  const url = `${API_URL}${endpoint}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    next: {
      revalidate: 60, // ISR
    },
  });

  if (!res.ok) {
    console.error(`API failed for ${endpoint}:`, res.status);
    return [];
  }

  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : (Array.isArray(json) ? json : []);
}

export async function fetchUniversityLogos(): Promise<UniversityLogo[]> {
  return fetchFromApi<UniversityLogo>("/admin/university-logos");
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  return fetchFromApi<Testimonial>("/admin/testimonials");
}

export async function fetchAlumniSpeaks(): Promise<VideoTestimonial[]> {
  return fetchFromApi<VideoTestimonial>("/admin/alumni-speaks");
}

export async function fetchNews(): Promise<News[]> {
  return fetchFromApi<News>("/admin/news");
}

export async function fetchEvents(): Promise<Event[]> {
  return fetchFromApi<Event>("/admin/events");
}

export async function fetchWebinars(): Promise<Webinar[]> {
  return fetchFromApi<Webinar>("/admin/webinars");
}
