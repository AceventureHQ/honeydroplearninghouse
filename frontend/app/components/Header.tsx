"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return <HeaderContent key={pathname} pathname={pathname} />;
}

function HeaderContent({ pathname }: { pathname: string }) {
  const isHomePage = pathname === "/";
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    return;
  }, [mobileMenuOpen]);

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

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setProgramsOpen(false);
  };

  const togglePrograms = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    setProgramsOpen((open) => !open);
  };

  // Track whether we're running on the client. Initialize from `window`
  // to avoid setting state inside an effect (prevents cascading-render warnings).
  // No `mounted` state — render portal only when `document` is available.

  const linkClasses = `transition-colors text-left text-[0.72rem] font-semibold uppercase tracking-[0.18em] ${
    isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
  }`;

  return (
    <header
      className={`${
        isHomePage ? "absolute inset-x-0 top-0 z-30" : "relative z-20 bg-[#F4BE36]"
      } px-3 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] sm:px-8 sm:py-4`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-3 shadow-none backdrop-blur-0 sm:px-5 ${
          isHomePage
            ? "bg-transparent text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
            : "bg-[#F4BE36] text-slate-950 shadow-[0_12px_30px_rgba(15,23,42,0.12)]"
        }`}
      >
        <div className="flex items-center justify-between md:hidden">
          {!isHomePage && (
            <Link href="/" className="flex items-center gap-3 text-slate-950">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/96 shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                <Image
                  src="/images/simple-logo.png"
                  alt="Honeydrop Learning House logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="hidden text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-950 sm:inline-flex">
                Honeydrop Learning House
              </span>
            </Link>
          )}

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 text-current transition-colors hover:bg-white/20"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {!mobileMenuOpen ? (
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M0 1.5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M0 12.5H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M2 2L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>

        <div className={`hidden md:flex w-full items-center gap-6 ${isHomePage ? "justify-center" : "justify-between"}`}>
          {!isHomePage && (
            <Link href="/" className="flex items-center gap-3 text-slate-950">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/96 shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
                <Image
                  src="/images/simple-logo.png"
                  alt="Honeydrop Learning House logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </span>
            </Link>
          )}

          <div className={`flex flex-1 flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-5 ${isHomePage ? "justify-center" : "justify-center"}`}>
            <Link href="/" className={linkClasses}>
              Home
            </Link>
            <Link href="/about" className={linkClasses}>
              About
            </Link>
            {/* <div
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
                onClick={togglePrograms}
                className={`cursor-pointer text-left text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  isHomePage ? "hover:text-[#F4BE36]" : "hover:text-slate-800"
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  Our Programs
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
                className={`absolute left-1/2 top-full z-30 w-[17rem] -translate-x-1/2 pt-1 transition-all duration-150 ${
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
            </div> */}
            <Link href="/staff" className={linkClasses}>
              Meet the Staff
            </Link>
            <Link href="/enrolment" className={linkClasses}>
              Course Enrolment
            </Link>
            <Link href="/contact" className={linkClasses}>
              Contact Us
            </Link>
          </div>
        </div>

        {typeof document !== "undefined" &&
          mobileMenuOpen &&
          createPortal(
            <div className="md:hidden">
              <div className="fixed inset-0 z-[9999]">
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={closeMenu}
                  className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                <div className="relative z-[10000] h-full w-full overflow-auto">
                  <div className="flex h-full w-full flex-col">
                    <div className="flex items-center justify-end p-4">
                      <button
                        type="button"
                        aria-label="Close menu"
                        onClick={closeMenu}
                        className="rounded-md p-2 text-lg leading-none hover:bg-transparent"
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                          <path d="M3 3L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M17 3L3 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-1 items-start justify-center">
                      <nav id="mobile-navigation" className="mx-auto w-full max-w-xl px-8 py-6 text-white">
                        <ul className="flex flex-col gap-8">
                          <li>
                            <Link href="/" className={`${linkClasses} block text-2xl sm:text-3xl`} onClick={closeMenu}>Home</Link>
                          </li>
                          <li>
                            <Link href="/about" className={`${linkClasses} block text-2xl sm:text-3xl`} onClick={closeMenu}>About</Link>
                          </li>
                          {/* <li>
                            <button type="button" className={`${linkClasses} flex w-full items-center justify-between text-2xl sm:text-3xl`} onClick={togglePrograms}>
                              <span>Our Programs</span>
                              <span className="ml-4 text-xl">{programsOpen ? '−' : '+'}</span>
                            </button>

                            {programsOpen && (
                              <ul className="mt-3 flex flex-col gap-4 pl-4">
                                <li>
                                  <Link href="/programs#homeschool-support" className="text-lg" onClick={closeMenu}>Homeschool Support</Link>
                                </li>
                                <li>
                                  <Link href="/programs#after-school-enrichment" className="text-lg" onClick={closeMenu}>After School Enrichment</Link>
                                </li>
                                <li>
                                  <Link href="/programs#adult-learning" className="text-lg" onClick={closeMenu}>Adult Learning</Link>
                                </li>
                              </ul>
                            )}
                          </li> */}
                          <li>
                            <Link href="/staff" className={`${linkClasses} block text-2xl sm:text-3xl`} onClick={closeMenu}>Meet the Staff</Link>
                          </li>
                          <li>
                            <Link href="/enrolment" className={`${linkClasses} block text-2xl sm:text-3xl`} onClick={closeMenu}>Course Enrolment</Link>
                          </li>
                          <li>
                            <Link href="/contact" className={`${linkClasses} block text-2xl sm:text-3xl`} onClick={closeMenu}>Contact Us</Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>,
            document.body
          )}
      </nav>
    </header>
  );
}
