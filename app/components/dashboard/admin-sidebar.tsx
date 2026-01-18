"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Images,
  MessageSquare,
  Users,
  Newspaper,
  Calendar,
  Video,
  Settings,
  LogOut,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { useLogoutAdmin, useMe } from "@/app/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}
const navGroups = [
  {
    label: "Overview",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Content Management",
    items: [
      { href: "/admin/university-logos", label: "University Logos", icon: Images },
      { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
      { href: "/admin/alumni-speaks", label: "Alumni Speaks", icon: Users },
      { href: "/admin/news", label: "News", icon: Newspaper },
      { href: "/admin/events", label: "Events", icon: Calendar },
      { href: "/admin/webinars", label: "Webinars", icon: Video },
    ],
  },
];

export function AdminSidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logoutMutation = useLogoutAdmin();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        // ✅ Remove token
        localStorage.removeItem("token");

        // ✅ Clear react-query cache
        queryClient.clear();
        router.push("/login");
      },
    });
  };

const { data: admin } = useMe();

  return (
    <>
      {/* Mobile Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 h-full z-60 md:hidden p-2 rounded-full bg-white shadow-lg border border-slate-200"
      >
        <Menu size={20} className="text-slate-600" />
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 h-screen bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col
          ${isOpen ? "w-64" : "w-20 -translate-x-full md:w-20 md:translate-x-0"}
        `}
      >
        {/* Header / Brand */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <div className={`flex items-center gap-3 ${!isOpen && "md:hidden"}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              X
            </div>
            <span className="font-bold text-slate-800 tracking-tight text-lg">XED Admin {admin?.email}</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex p-1.5 hover:bg-slate-100 rounded-md text-slate-400 transition-colors"
          >
            <ChevronLeft className={`transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`} size={18} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-6 space-y-8 overflow-y-auto no-scrollbar">
          {navGroups.map((group) => (
            <div key={group.label} className="space-y-2">
              <p className={`px-4 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] ${!isOpen && "md:hidden"}`}>
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all
                        ${isActive
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
                      `}
                    >
                      <Icon size={20} className={`${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                      <span className={`text-sm whitespace-nowrap transition-opacity ${!isOpen && "md:hidden"}`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer / Profile */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="space-y-1">
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:bg-white hover:text-slate-900 transition-all"
            >
              <Settings size={18} />
              <span className={`text-sm font-medium ${!isOpen && "md:hidden"}`}>Settings</span>
            </Link>
            <button onClick={handleLogout}
              className="w-full cursor-pointer z-50 flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
              <LogOut size={18} />
              <span className={`text-sm font-medium ${!isOpen && "md:hidden"}`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isOpen && <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
}