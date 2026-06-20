import Link from "next/link";

export default function Header() {
  return (
    <footer className="relative z-20 flex items-center justify-center px-4 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:px-8">
      <nav aria-label="Primary">
        <Link href="/" className="transition-opacity hover:opacity-75">
          Home
        </Link>
      </nav>
    </footer>
  );
}
