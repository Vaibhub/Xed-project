import type React from "react"
import type { Metadata } from "next"
import { AdminSidebar } from "../components/dashboard/admin-sidebar"

export const metadata: Metadata = {
  title: "Admin Dashboard - XED Institute",
  description: "Manage your website content",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 md:ml-64 bg-slate-50">
        <div className="p-6 md:p-8">{children}</div>
      </main>
    </div>
  )
}
