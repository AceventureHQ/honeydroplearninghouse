import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import CheckoutForm from "./CheckoutForm";
import { getCourseBySlug, courses } from "../courses";

const categoryLabels = {
  "summer-camps": "Summer Camps",
  tutoring: "Tutoring",
} as const;

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    return { title: "Course not found" };
  }

  return {
    title: `${course.name} | Honeydrop Learning House`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_28%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/88 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md">
            <div className="relative aspect-[16/10]">
              <Image
                src={course.image}
                alt={course.imageAlt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.06)_0%,rgba(15,23,42,0.22)_100%)]" />
              <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-800 shadow-sm">
                {course.cost}
              </div>
              <div className="absolute right-5 top-5 rounded-full bg-slate-900/88 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white shadow-sm">
                {categoryLabels[course.category]}
              </div>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
                  Product Details
                </p>
                <h1 className="mt-3 font-serif text-[clamp(2.6rem,4.5vw,2rem)] italic leading-[0.95] tracking-[-0.05em] text-slate-900">
                  {course.name}
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
                  {course.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {course.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="rounded-[1.3rem] border border-slate-200/80 bg-slate-50 p-4 text-sm leading-7 text-slate-700"
                  >
                    {highlight}
                  </div>
                ))}
              </div>

              <div className="grid gap-4 rounded-[1.5rem] border border-slate-200/80 bg-slate-50 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Ideal for
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{course.idealFor}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Included
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-7 text-slate-700">
                    {course.included.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <aside
            id="square-payments"
            className="rounded-[1.8rem] border border-slate-200/80 bg-white/92 p-6 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8"
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
              Checkout Information
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-900">
              Complete enrolment for {course.name}.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-700">
              Fill this out so we have the student details, emergency contacts, and any learning accommodations in one place.
            </p>

            <CheckoutForm courseName={course.name} courseSlug={course.slug} courseCost={course.cost} />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/enrolment"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                Back to courses
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}