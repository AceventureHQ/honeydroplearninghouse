import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-20 flex items-center justify-center px-4 pt-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:px-8">
      <nav
        aria-label="Primary"
        className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6"
      >
        <Link href="/" className="transition-opacity hover:opacity-75">
          Home
        </Link>
        <Link href="about" className="transition-opacity hover:opacity-75">
          About
        </Link>
        <Link href="staff" className="transition-opacity hover:opacity-75">
          Meet the Staff
        </Link>
        <Link href="programs" className="transition-opacity hover:opacity-75">
          Our Programs
        </Link>
        <Link href="enrolment" className="transition-opacity hover:opacity-75">
          Course Enrolment
        </Link>
        <Link href="contact" className="transition-opacity hover:opacity-75">
          Contact Us
        </Link>
        <Link
          href="summer-camp"
          className="transition-opacity hover:opacity-75"
        >
          Summer Camp
        </Link>
      </nav>
    </header>
  );
}
