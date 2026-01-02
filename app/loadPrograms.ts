import { Program } from "./types/program";


const API_URL = "https://xite.xedinstitute.org/api/cohorts";
const API_KEY = "key_AsdewDax524DASF234233";

export async function loadPrograms(): Promise<Program[]> {
  console.log(" loadPrograms called");

  try {
    console.log(" Sending request to:", API_URL);
    console.log(" Using API Key:", API_KEY);

    const res = await fetch(API_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    console.log("Response received");
    console.log(" Status:", res.status);
    console.log(" Status Text:", res.statusText);

    const text = await res.json();
    console.log(" Raw response text:", text);
    return text as Program[]

  } catch (error) {
    console.error("FETCH FAILED:", error);
    throw error;
  }
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