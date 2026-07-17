import Image from "next/image";

export default function SummerCamp() {
  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate min-h-screen px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.86),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.14),transparent_30%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
              Summer Camp
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2.8rem,5vw,5rem)] italic leading-[0.95] tracking-[-0.05em] text-slate-900">
              A summer schedule that feels playful, safe, and organized.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-700 sm:text-lg">
              Our camp mixes art, outdoor time, literacy, and practical projects so kids have a memorable day without losing the structure they need.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["Outdoor play", "Movement, nature time, and a lot of fresh-air energy."],
                ["Creative projects", "Hands-on builds, crafts, and themed activities."],
                ["Reading and games", "Quiet moments balanced with curiosity and fun."],
                ["Lunch and rest", "A calm reset so the afternoon still feels good."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-amber-800/80">{title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/84 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md">
            <div className="relative aspect-[4/5]">
              <Image
                src="/images/front-reception.jpg"
                alt="Honeydrop Learning House reception"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,29,0.02)_0%,rgba(10,18,29,0.08)_45%,rgba(10,18,29,0.3)_100%)]" />
            </div>
            <div className="p-5 text-sm leading-7 text-slate-700">
              Families can use the Enrolment page to register and pay through Square before camp begins.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
