"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { courses } from "./courses";
import ProductImage from "../components/ProductImage";

type CourseCategory = "all" | "summer-camps" | "tutoring";

const categoryLabels: Record<Exclude<CourseCategory, "all">, string> = {
  "summer-camps": "Summer Camps",
  tutoring: "Tutoring",
};

export default function Enrolment() {
  const [selectedCategory, setSelectedCategory] = useState<CourseCategory>("all");

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "all") {
      return courses;
    }

    return courses.filter((course) => course.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.16),transparent_32%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="max-w-3xl space-y-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
              Course Enrolment
            </p>
            <div className="space-y-3">
              <h1 className="font-serif text-[clamp(2.7rem,4.8vw,3.8rem)] italic leading-[0.95] tracking-[-0.05em] text-slate-900">
                Choose a learning path.
              </h1>
              {/* <p className="max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
                Browse summer camps and tutoring in one place, then narrow the list with the filter below.
              </p> */}
            </div>

            <div className="flex flex-wrap gap-2">
              {([
                { value: "all", label: "All courses" },
                { value: "summer-camps", label: "Summer camps" },
                // { value: "tutoring", label: "Tutoring" },
              ] as const).map((option) => {
                const active = selectedCategory === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedCategory(option.value)}
                    className={`cursor-pointer rounded-full border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] transition-all ${
                      active
                        ? "border-slate-900 bg-slate-900 text-white shadow-[0_10px_24px_rgba(15,23,42,0.18)]"
                        : "border-slate-200 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-slate-200/80 bg-white/70 px-5 py-4 shadow-[0_16px_42px_rgba(15,23,42,0.06)] backdrop-blur-sm">
            <p className="text-sm leading-6 text-slate-700">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-800/80">
              {selectedCategory === "all" ? "All categories" : categoryLabels[selectedCategory]}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/enrolment/${course.slug}`}
                className="group overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/92 shadow-[0_24px_64px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <ProductImage
                    src={course.image}
                    fallbackSrc="/images/default-course-image.jpg"
                    alt={course.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.18)_100%)]" />
                  <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/92 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-800 shadow-sm">
                      {course.cost}
                    </span>
                    <span className="rounded-full bg-slate-900/88 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                      {categoryLabels[course.category]}
                    </span>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-amber-800/70">
                      {course.cadence || categoryLabels[course.category]}
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
