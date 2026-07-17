export default function Programs() {
  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate min-h-screen px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.86),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_34%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
              Our Programs
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2.8rem,5vw,2rem)] italic leading-[0.95] tracking-[-0.05em] text-slate-900">
              Three pathways for learning that fit where families are right now.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              Each program is designed to feel structured but flexible, with a clear rhythm and enough room for the child or adult in front of us.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {[
              {
                id: "homeschool-support",
                title: "Homeschool Support",
                summary:
                  "Guided learning blocks, progress check-ins, and planning support for families building a custom learning path.",
                details: ["Weekly learning goals", "Portfolio guidance", "Family check-ins"],
              },
              {
                id: "after-school-enrichment",
                title: "After School Enrichment",
                summary:
                  "A calm landing after school with homework help, enrichment activities, and hands-on projects that keep kids curious.",
                details: ["Homework support", "Creative projects", "Movement and play"],
              },
              {
                id: "adult-learning",
                title: "Adult Learning",
                summary:
                  "Practical classes for adults who want to build confidence, improve everyday skills, and keep learning in a supportive setting.",
                details: ["Small-group classes", "Practical skills", "Flexible scheduling"],
              },
            ].map((program) => (
              <article
                key={program.id}
                id={program.id}
                className="rounded-[1.8rem] border border-slate-200/80 bg-white/88 p-5 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 text-sm font-semibold text-amber-900">
                  {program.title.slice(0, 1)}
                </div>
                <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                  {program.title}
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {program.summary}
                </p>
                <ul className="mt-5 space-y-2 text-sm text-slate-700">
                  {program.details.map((detail) => (
                    <li key={detail} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="grid gap-5 rounded-[1.8rem] border border-slate-200/80 bg-white/84 p-5 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                What families can expect
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700 sm:text-base">
                Every path starts with a conversation about needs, schedule, and goals. From there, we shape a plan that is realistic, encouraging, and easy to follow.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-4 text-sm leading-7 text-slate-700">
              We can tailor each program for single learners, siblings, or small groups.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
