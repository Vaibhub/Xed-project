"use client";

import { useState } from "react";
import { AdminSidebar } from "../components/dashboard/admin-sidebar";
import AdminAuthGuard from "./AdminAuthGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Sidebar state ko Layout mein rakhein taaki main content ko control kar sakein
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
        <AdminAuthGuard>

    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar ko state aur toggle function pass karein */}
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content: Iski width sidebar ke hisaab se change hogi */}
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out 
          ${isSidebarOpen ? "md:ml-64" : "md:ml-20"}
        `}
      >
        <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
    </AdminAuthGuard>
  );
}