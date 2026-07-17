import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const socialLinks = [
    {
      label: "Facebook",
      href: "https://www.facebook.com/honeydrop.learning.house/",
      path: "M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/honeydroplearninghouse",
      path: "M8 3.5h8c2.48 0 4.5 2.02 4.5 4.5v8c0 2.48-2.02 4.5-4.5 4.5H8c-2.48 0-4.5-2.02-4.5-4.5V8C3.5 5.52 5.52 3.5 8 3.5zm8 1.5H8c-1.65 0-3 1.35-3 3v8c0 1.65 1.35 3 3 3h8c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3zm-4 2.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5.38-.88a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z",
    },
  ];

  return (
    <footer className="relative z-20 border-t border-[#d9a91c] bg-[#F4BE36] px-4 py-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-950 sm:px-8 sm:py-7">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 text-center md:flex-row md:items-start md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start md:items-start">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-white/96 shadow-[0_14px_38px_rgba(0,0,0,0.18)] sm:h-12 sm:w-12">
            <Image
              src="/images/simple-logo.png"
              alt="Honeydrop Learning House logo"
              width={48}
              height={48}
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
          </div>
          <div className="flex flex-col gap-1 text-[0.68rem] tracking-[0.14em] text-slate-900">
            <span className="text-slate-950">Honeydrop Learning House</span>
            <span>Learning with care, structure, and joy</span>
            <div className="mt-2 flex justify-center gap-2 sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-950/15 bg-white/70 text-slate-950 transition-colors hover:bg-slate-950 hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-4 w-4 fill-current"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center md:justify-start md:text-left"
        >
          <Link href="/" className="transition-colors hover:text-slate-800">
            Home
          </Link>
          <Link href="/about" className="transition-colors hover:text-slate-800">
            About
          </Link>
          <Link href="/programs" className="transition-colors hover:text-slate-800">
            Programs
          </Link>
          <Link href="/staff" className="transition-colors hover:text-slate-800">
            Staff
          </Link>
          <Link href="/enrolment" className="transition-colors hover:text-slate-800">
            Enrolment
          </Link>
          <Link href="/contact" className="transition-colors hover:text-slate-800">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
