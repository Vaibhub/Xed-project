"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const navItems = [
    { label: "Programs", href: "/programs" },
    { label: "Knowledge Hub", href: "/knowledge-hub" },
    { label: "Preferiti Series", href: "https://preferiti.xedinstitute.org" },
    { label: "XED Alumni", href: "https://alumni.xedinstitute.org" },
    { label: "Enterprise Business", href: "/enterprise-business" },
    { label: "University in a Day Series", href: "/university-in-a-day" },
    { label: "Investor Relations", href: "/investor-relations" },
  ];
  const defaultPrograms:any = [
  {
    id: 1,
    title: "CXO Leadership Program",
    href: "/programs/cxo-leadership"
  },
  {
    id: 2,
    title: "Senior Executive Leadership Program",
    href: "/programs/senior-executive"
  },
  {
    id: 3,
    title: "Certification Program",
    href: "/programs/certification"
  }
];

 const searchPrograms = [
  {
    id: 1,
    title: "Strategic Foresight & Resilient Leadership",
    university: "Michigan Ross School of Business",
    href: "/programs/strategic-foresight-resilient-leadership"
  },
  {
    id: 2,
    title: "Strategic Thinking and Execution",
    university: "Carnegie Mellon University, Tepper School of Business",
    href: "/programs/strategic-thinking-execution"
  },
  {
    id: 3,
    title: "Leading High Performing Organisations",
    university: "Darden School Of Business",
    href: "/programs/leading-high-performing-organisations"
  },
  {
    id: 4,
    title: "Oxford Negotiation Strategies Programme",
    university: "Oxford Saïd Business School",
    href: "/programs/oxford-negotiation-strategies"
  },
  {
    id: 5,
    title: "Oxford Senior Executive Leadership Programme",
    university: "Oxford Saïd Business School",
    href: "/programs/oxford-senior-executive-leadership"
  },
  {
    id: 6,
    title: "Oxford General Management Programme",
    university: "Oxford Saïd Business School",
    href: "/programs/oxford-general-management"
  },
  {
    id: 7,
    title: "Darden CEO Leadership Program",
    university: "Darden School Of Business",
    href: "/programs/darden-ceo-leadership"
  },
  {
    id: 8,
    title: "Cornell CXO Leadership Program",
    university: "Cornell University",
    href: "/programs/cornell-cxo-leadership"
  },
  {
    id: 9,
    title: "Michigan Ross CXO Leadership Program",
    university: "University of Michigan's Ross School of Business",
    href: "/programs/michigan-ross-cxo-leadership"
  },
  {
    id: 10,
    title: "Cornell CHRO Leadership Program",
    university: "Cornell University",
    href: "/programs/cornell-chro-leadership"
  },
  {
    id: 11,
    title: "Cornell Senior Executive Leadership Program",
    university: "Cornell University",
    href: "/programs/cornell-senior-executive-leadership"
  }
];

const [query, setQuery] = useState("");
  const [results, setResults] = useState(searchPrograms);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
   useEffect(() => {
    if (!query.trim()) {
      setResults(defaultPrograms); // default 3
      return;
    }

    setResults(
      searchPrograms.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

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
        <div className="absolute z-50  w-[350px] right-0 mt-2   bg-white border rounded-md shadow-lg">
          {results.map((item) => (
            <Link
              key={item.id}
              href={item.href} // use href for Next.js
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
              onClick={() => setOpen(false)}
            >
              <span>{item.title}</span>
            </Link>
          ))}
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
