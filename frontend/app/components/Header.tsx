"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [programsOpen, setProgramsOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const openPrograms = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setProgramsOpen(true);
  };

  const closePrograms = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setProgramsOpen(false);
    }, 140);
  };

  return (
    <header
      className={`${
        isHomePage ? "absolute inset-x-0 top-0 z-30" : "relative z-20 bg-[#F4BE36]"
      } px-4 py-4 text-[0.72rem] font-semibold uppercase tracking-[0.2em] sm:px-8`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex w-full max-w-6xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-3 shadow-none backdrop-blur-0 sm:gap-x-5 sm:px-5 ${
          isHomePage
            ? "bg-transparent text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            : " bg-[#F4BE36] text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
        }`}
      >
        <Link
          href="/"
          className={`transition-colors ${
            isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`transition-colors ${
            isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
          }`}
        >
          About
        </Link>
        <div
          className="relative"
          onMouseEnter={openPrograms}
          onMouseLeave={closePrograms}
          onFocusCapture={openPrograms}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              closePrograms();
            }
          }}
        >
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={programsOpen}
            className={`cursor-pointer transition-colors ${
              isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              OUR PROGRAMS
              <span
                className={`text-[0.62rem] transition-transform duration-200 ${
                  programsOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </span>
          </button>
          <div
            className={`absolute left-1/2 top-full z-30 w-[17rem] -translate-x-1/2 pt-3 transition-all duration-150 ${
              programsOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible translate-y-2 opacity-0"
            }`}
          >
            <div className="border border-slate-200/80 bg-white/96 p-2 text-slate-700 shadow-[0_24px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl">
              <Link
                href="/programs#homeschool-support"
                className="block px-4 py-3 text-left text-[0.7rem] tracking-[0.16em] transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                Homeschool Support
              </Link>
              <Link
                href="/programs#after-school-enrichment"
                className="block px-4 py-3 text-left text-[0.7rem] tracking-[0.16em] transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                After School Enrichment
              </Link>
              <Link
                href="/programs#adult-learning"
                className="block px-4 py-3 text-left text-[0.7rem] tracking-[0.16em] transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                Adult Learning
              </Link>
            </div>
          </div>
        </div>
        <Link
          href="/staff"
          className={`transition-colors ${
            isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
          }`}
        >
          Meet the Staff
        </Link>
        <Link
          href="/enrolment"
          className={`transition-colors ${
            isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
          }`}
        >
          Course Enrolment
        </Link>
        <Link
          href="/contact"
          className={`transition-colors ${
            isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
          }`}
        >
          Contact Us
        </Link>
        {/* <Link
          href="/summer-camp"
          className={`transition-colors ${
            isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
          }`}
        >
          Summer Camp
        </Link> */}
      </nav>
    </header>
  );
}
