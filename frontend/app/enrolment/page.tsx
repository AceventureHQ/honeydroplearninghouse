import Image from "next/image";
import Link from "next/link";

import { courses } from "./courses";

export default function Enrolment() {
  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_32%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
              Course Enrolment
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.slug}
                href={`/enrolment/${course.slug}`}
                className="group overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/88 shadow-[0_24px_64px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.18)_100%)]" />
                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-800 shadow-sm">
                    {course.cost}
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-amber-800/70">
                      {course.cadence}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                      {course.name}
                    </h2>
                  </div>
                  <p className="text-sm leading-7 text-slate-700">{course.summary}</p>
                  <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors group-hover:bg-slate-100">
                    View details
                  </span>
                </div>
              </Link>
            ))}
          </div>

          
        </div>
      </section>
    </main>
  );
}
