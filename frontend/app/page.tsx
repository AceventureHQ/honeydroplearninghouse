import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden text-white">
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/front-reception.jpg"
            alt="Front reception"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,25,38,0.32)_0%,rgba(11,25,38,0.18)_28%,rgba(11,25,38,0.22)_68%,rgba(11,25,38,0.42)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.16),transparent_34%),radial-gradient(circle_at_right_center,rgba(255,211,102,0.1),transparent_26%)]" />
        </div>

        <header className="relative z-20 flex items-center justify-center px-4 pt-3 text-[0.74rem] font-semibold uppercase tracking-[0.18em] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] sm:px-8">
          <nav aria-label="Primary" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-x-6">
            <a href="#home" className="transition-opacity hover:opacity-75">Home</a>
            <a href="#about" className="transition-opacity hover:opacity-75">About</a>
            <a href="#staff" className="transition-opacity hover:opacity-75">Meet the Staff</a>
            <a href="#programs" className="transition-opacity hover:opacity-75">Our Programs</a>
            <a href="#enrolment" className="transition-opacity hover:opacity-75">Course Enrolment</a>
            <a href="#contact" className="transition-opacity hover:opacity-75">Contact Us</a>
            <a href="#summer-camp" className="transition-opacity hover:opacity-75">Summer Camp</a>
          </nav>
        </header>

        <section
          id="home"
          className="relative z-10 flex min-h-[calc(100vh-2.5rem)] items-center justify-center px-5 pb-24 pt-8 sm:px-8 lg:px-12"
        >
          <div className="relative flex w-full max-w-6xl flex-col items-center">
            <div className="mb-4 flex flex-col items-center gap-2 text-center text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.42)]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/96 shadow-[0_14px_38px_rgba(0,0,0,0.18)] sm:h-24 sm:w-24">
                <Image
                  src="/images/honeydrop-logo-transparent.png"
                  alt="Honeydrop Learning House logo"
                  width={72}
                  height={72}
                  className="h-14 w-14 object-contain sm:h-16 sm:w-16"
                />
              </div>
              <p className="max-w-[10rem] text-[1.05rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-[1.2rem]">
                Honeydrop Learning House
              </p>
            </div>

            <h1 className="max-w-4xl text-center font-serif text-[clamp(3.3rem,6.5vw,6.4rem)] italic leading-[0.93] tracking-[-0.055em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]">
              A warm place to learn, grow,
              <br />
              and shine together.
            </h1>

            <div className="mt-10 flex flex-col items-center gap-1 text-white/96 drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:mt-12">
              <span className="font-serif text-[1.1rem] font-semibold sm:text-[1.15rem]">Explore</span>
              <span className="text-3xl leading-none animate-float-slow">↓</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
