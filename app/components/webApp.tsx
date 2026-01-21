"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import { Program } from "../types/programs";

export default function WepApp({
  children,
  programs,
}: {
  children: React.ReactNode;
  programs: Program[];
}) {
  const pathname = usePathname();

  // check if route starts with /admin
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Header programs={programs} />}
      {children}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
