import Image from "next/image";

export default function Contact() {
  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.9),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.16),transparent_30%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8 lg:p-10">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                Contact Us
              </p>
              <h1 className="mt-3 max-w-xl font-serif text-[clamp(2.9rem,5vw,2rem)] italic leading-[0.95] tracking-[-0.05em] text-slate-900">
                Reach out and we&apos;ll help you find the right fit.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                Whether you want to ask about programs, schedule an intake conversation, or talk through payment options, we can point you in the right direction.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  ["Email", "office@honeydrophouse.ca"],
                  ["Phone", "(613) 779-6885"],
                  ["Hours", "Mon-Fri, 9:00 AM - 5:00 PM"],
                  ["Location", "303 Front Street Belleville, Ontario K8N 2Z9"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-[1.4rem] border border-slate-200/80 bg-slate-50/80 p-4 shadow-[0_18px_48px_rgba(15,23,42,0.06)]"
                  >
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-amber-800/80">
                      {label}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  [
                    "Facebook",
                    "https://www.facebook.com/honeydrop.learning.house/",
                    "M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z",
                  ],
                  [
                    "Instagram",
                    "https://www.instagram.com/honeydroplearninghouse",
                    "M8 3.5h8c2.48 0 4.5 2.02 4.5 4.5v8c0 2.48-2.02 4.5-4.5 4.5H8c-2.48 0-4.5-2.02-4.5-4.5V8C3.5 5.52 5.52 3.5 8 3.5zm8 1.5H8c-1.65 0-3 1.35-3 3v8c0 1.65 1.35 3 3 3h8c1.65 0 3-1.35 3-3V8c0-1.65-1.35-3-3-3zm-4 2.25a4.75 4.75 0 1 1 0 9.5 4.75 4.75 0 0 1 0-9.5zm0 1.5a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5zm5.38-.88a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z",
                  ],
                ].map(([label, href, path]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-800 transition-colors hover:bg-slate-100 hover:text-slate-950"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="h-4 w-4 fill-current"
                    >
                      <path d={path} />
                    </svg>
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <Image
                      src="/images/simple-logo.png"
                      alt="Honeydrop Learning House logo"
                      width={36}
                      height={36}
                      className="h-16 w-16 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-amber-800/80">
                      Quick notes
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      We reply best when families share the learner&apos;s age, main goal, and preferred schedule.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)] sm:p-6">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                  Payment help
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  For payment questions, use the Enrolment page to save learner details, then e-transfer to office@honeydrophouse.ca or pay in person at the office.
                </p>
              </div>

              <div className="overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/90 shadow-[0_24px_64px_rgba(15,23,42,0.08)] lg:col-span-1">
                <div className="space-y-3 border-b border-slate-200/80 p-5 sm:p-6">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                    Find Us
                  </p>
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                    Visit the Honeydrop location.
                  </h2>
                  <p className="text-sm leading-7 text-slate-700">
                    Use the map below or open the location in Google Maps for directions and a closer look at the area.
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
                <div className="space-y-4 p-5 text-sm leading-7 text-slate-700 sm:p-6">
                  <p>
                    The map centers on the Honeydrop Learning House location from your provided link.
                  </p>
                  <a
                    href="https://www.google.com/maps/place/Honeydrop+Learning+House/@44.166858,-77.3878033,17z/data=!3m1!4b1!4m6!3m5!1s0x89d625f271a6b4e3:0xa81cd56c63c1d5ed!8m2!3d44.166858!4d-77.385223!16s%2Fg%2F11ywp5r7hh?entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex rounded-full border border-slate-900/10 bg-slate-900 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-slate-800"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
