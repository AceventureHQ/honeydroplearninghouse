import Image from "next/image";

export default function About() {
  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_30%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8 lg:p-10">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                About Honeydrop
              </p>
              <h1 className="mt-3 max-w-xl font-serif text-[clamp(2.9rem,5vw,2rem)] italic leading-[0.95] tracking-[-0.05em] text-slate-900">
                A small learning house built around trust, rhythm, and joy.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-700 sm:text-lg">
                We create a place where children and adults feel known. That
                means consistent routines, friendly faces, and spaces that feel
                calm enough for learning to stick.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  [
                    "Our promise",
                    "Support should feel structured, gentle, and realistic for the family in front of us.",
                  ],
                  [
                    "Our style",
                    "We blend academic care, practical help, and lots of human warmth.",
                  ],
                  [
                    "Our goal",
                    "Help learners build confidence they can carry into school, home, and everyday life.",
                  ],
                  [
                    "Our spaces",
                    "A welcoming front door, clear expectations, and time to settle in before the work begins.",
                  ],
                ].map(([title, body]) => (
                  <div
                    key={title}
                    className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/80 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-amber-800/80">
                      {title}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["/images/front-reception.jpg", "Reception and welcome area"],
                ["/images/ESS00022-HDR.jpg", "Learning and enrichment space"],
              ].map(([src, caption]) => (
                <figure
                  key={caption}
                  className="overflow-hidden rounded-[1.4rem] border border-slate-200/80 bg-white/90 shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/3]">
                    <Image
                      src={src}
                      alt={caption}
                      fill
                      sizes="(min-width: 1024px) 45vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.26)_100%)]" />
                  </div>
                  <figcaption className="p-4 text-sm leading-6 text-slate-700">
                    {caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
            <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_64px_rgba(15,23,42,0.08)]">
              <div className="space-y-3 border-b border-slate-200/80 p-5 sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                  Find Us
                </p>
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                  Visit the Honeydrop location.
                </h2>
                <p className="text-sm leading-7 text-slate-700">
                  Use the map below or open the location in Google Maps for
                  directions and a closer look at the area.
                </p>
              </div>
              <div className="relative aspect-[4/3]">
                <iframe
                  title="Honeydrop Learning House location map"
                  src="https://www.google.com/maps?q=44.166858,-77.385223&z=17&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                  Why families come here
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  Honeydrop is designed to feel calm, structured, and easy to
                  enter. Families come for support that is practical, personal,
                  and consistent.
                </p>
              </div>

              <Image
                src="/images/628198158_1337066571796690_7675994831397749802_n.jpg"
                alt="Library and reading area"
                width={800}
                height={600}
                className="rounded-[1.8rem] border border-slate-200/80 bg-white/90 shadow-[0_18px_48px_rgba(15,23,42,0.08)]"
              />

              {/* <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                  Open in Maps
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  The map centers on the Honeydrop Learning House location from your provided link.
                </p>
                <a
                  href="https://www.google.com/maps/place/Honeydrop+Learning+House/@44.166858,-77.3878033,17z/data=!3m1!4b1!4m6!3m5!1s0x89d625f271a6b4e3:0xa81cd56c63c1d5ed!8m2!3d44.166858!4d-77.385223!16s%2Fg%2F11ywp5r7hh?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex rounded-full border border-slate-900/10 bg-slate-900 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
                >
                  Open in Google Maps
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
