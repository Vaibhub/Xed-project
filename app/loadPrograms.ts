import { Program } from "./types/program";

export async function loadPrograms(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/programs");
  return res.json();
}
export async function loadDayPrograms(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/dayPrograms");
  return res.json();
}

export async function loadAlumniSpeak(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/alumni-speak");
  return res.json();
}
export async function loadNews(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/news");
  return res.json();
}
export async function loadEvents(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/events");
  return res.json();
}
export async function loadWebinars(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/webinars");
  return res.json();
}
export async function loadTestimonials(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/testimonials");
  return res.json();
}
export async function loadCollegeLogos(): Promise<Program[]> {
  const res = await fetch("http://localhost:4000/collegeLogos");
  return res.json();
}