"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function WepApp({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // check if route starts with /admin
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div>
      {!isAdminRoute && <Header />}
      {children}
      {!isAdminRoute && <Footer />}
    </div>
  );
}
