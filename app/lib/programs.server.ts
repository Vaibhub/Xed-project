import { Program } from "@/app/types/programs";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/cohorts";
const API_KEY = process.env.API_KEY;

export async function fetchPrograms(): Promise<Program[]> {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
    next: {
      revalidate: 60, // ISR
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch programs");
  }

  const json = await res.json();

  // ✅ API safety
  return Array.isArray(json?.data) ? json.data : [];
}
