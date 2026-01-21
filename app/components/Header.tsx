"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Program } from "../types/programs";

export default function Header({ programs = [] }: { programs?: Program[] }) {
  const navItems = [
    { label: "Programs", href: "/programs" },
    { label: "Knowledge Hub", href: "/knowledge-hub" },
    { label: "Preferiti Series", href: "https://preferiti.xedinstitute.org" },
    { label: "XED Alumni", href: "https://alumni.xedinstitute.org" },
    { label: "Enterprise Business", href: "/enterprise-business" },
    { label: "University in a Day Series", href: "/university-in-a-day" },
    { label: "Investor Relations", href: "/investor-relations" },
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Program[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(programs.slice(0, 5)); // show first 5 as default
      return;
    }

    setResults(
      programs.filter((item) =>
        item.program.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, programs]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <img src="/logo.png" alt="Logo" width={220} height={200} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isExternal = item.href.startsWith("http");

              return isExternal ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-slate-900 text-black"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm hover:text-slate-900 text-black"
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative w-full max-w-lg" ref={wrapperRef}>
              {/* Search Input */}
              <div className="flex items-center gap-2 border rounded-md px-3 py-2">
                <Search size={16} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Programs..."
                  className="outline-none flex-1 text-sm"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                />
              </div>

              {/* Dropdown */}
              {open && results.length > 0 && (
                <div className="absolute z-50  w-[350px] right-0 mt-2   bg-white border rounded-md shadow-lg overflow-hidden">
                  {results.map((item) => {
                    const redirectUrl = item.microsite_section?.custom_domain 
                      ? `https://${item.microsite_section.custom_domain}` 
                      : `/programs/${item.cohort_key}`;
                    
                    return (
                      <a
                        key={item.id}
                        href={redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100 border-b last:border-0"
                        onClick={() => setOpen(false)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium text-slate-900">{item.program.name}</span>
                          {item.program.academic_partner?.name && (
                            <span className="text-xs text-slate-500">{item.program.academic_partner.name}</span>
                          )}
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="p-2 rounded-md hover:bg-slate-100">
                    <Menu size={22} />
                  </button>
                </SheetTrigger>

                <SheetContent className="p-4">
                  <div className="flex flex-col gap-4 mt-6">
                    {navItems.map((item) => {
                      const isExternal = item.href.startsWith("http");

                      return isExternal ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base text-slate-700 hover:text-black"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="text-base text-slate-700 hover:text-black"
                        >
                          {item.label}
                        </Link>
                      );
                    })}

                    {/* Mobile Search */}
                    <button className="flex items-center gap-2 px-3 py-2 border rounded-md w-fit mt-4">
                      <Search size={16} />
                      <span className="text-sm">Search</span>
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
