import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WepApp from "./components/webApp";
import Providers from "./providers";
import { fetchPrograms } from "@/lib/programs.server";
import { Program } from "./types/programs";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Xed Institute",
  description: "Learn to build web3 apps with Xed",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let programs: Program[] = [];
  try {
    programs = await fetchPrograms();
  } catch (error) {
    console.error("Failed to fetch programs:", error);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <WepApp programs={programs}>
            {children}
          </WepApp>
        </Providers>
      </body>
    </html>
  );
}
