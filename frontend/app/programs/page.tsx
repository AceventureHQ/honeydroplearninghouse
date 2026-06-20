import Image from "next/image";

export default function Programs() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/programs-background.jpg"
            alt="Programs background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,25,38,0.32)_0%,rgba(11,25,38,0.18)_28%,rgba(11,25,38,0.22)_68%,rgba(11,25,38,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_right_center,rgba(255,211,102,0.1),transparent_26%)]" />
        </div>
      </div>
    </main>
  );
}
