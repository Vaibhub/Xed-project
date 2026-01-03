import {
  programs,
  dayPrograms,
  alumniSpeak,
  news,
  events,
  webinars,
  testimonials,
  collegeLogos,
} from "./data";

export async function loadPrograms(): Promise<any[]> {
  return programs;
}

export async function loadDayPrograms(): Promise<any[]> {
  return dayPrograms;
}

export async function loadAlumniSpeak(): Promise<any[]> {
  return alumniSpeak;
}

export async function loadNews(): Promise<any[]> {
  return news;
}

export async function loadEvents(): Promise<any[]> {
  return events;
}

export async function loadWebinars(): Promise<any[]> {
  return webinars;
}

export async function loadTestimonials(): Promise<any[]> {
  return testimonials;
}

export async function loadCollegeLogos(): Promise<any[]> {
  return collegeLogos;
}
