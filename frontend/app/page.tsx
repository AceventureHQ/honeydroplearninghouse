import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <Image
            src="/images/building/front-reception.jpg"
            alt="Front reception"
            fill
            loading="eager"
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,25,38,0.24)_0%,rgba(11,25,38,0.12)_28%,rgba(11,25,38,0.18)_68%,rgba(11,25,38,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_right_center,rgba(255,211,102,0.08),transparent_26%)]" />
        </div>

        <section
          id="home"
          className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 sm:px-8 lg:px-12"
        >
          <div className="relative flex w-full max-w-6xl flex-col items-center">
            <div className="mb-6 flex flex-col items-center gap-2 text-center text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.42)]">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/70 bg-white/96 shadow-[0_14px_38px_rgba(0,0,0,0.18)] sm:h-24 sm:w-24">
                <Image
                  src="/images/simple-logo.png"
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
              <span className="font-serif text-[1.1rem] font-semibold sm:text-[1.15rem]">
                Explore
              </span>
              <span className="text-3xl leading-none animate-float-slow">
                ↓
              </span>
            </div>

            {/* <div className="mt-12 grid w-full gap-4 rounded-[1.8rem] border border-white/14 bg-white/84 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-md sm:grid-cols-3 sm:p-5">
              {[
                ["/programs#homeschool-support", "Homeschool Support", "Flexible guidance, portfolios, and family-centered routines."],
                ["/programs#after-school-enrichment", "After School", "Homework help, creative projects, and a calm end to the day."],
                ["/programs#adult-learning", "Adult Learning", "Practical classes built for confidence, scheduling, and growth."],
              ].map(([href, label, description]) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-3xl border border-slate-200/80 bg-white/90 p-4 text-left transition-transform duration-200 hover:-translate-y-1 hover:bg-white"
                >
                  <div className="text-[0.75rem] tracking-[0.22em] text-amber-800/80">
                    {label}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {description}
                  </p>
                </Link>
              ))}
            </div> */}
          </div>
        </section>

      </section>

      <section className="relative bg-[linear-gradient(180deg,#f7f1e8_0%,#efe5d7_100%)] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 rounded-[2rem] border border-amber-200/70 bg-white/75 p-6 shadow-[0_24px_60px_rgba(109,76,45,0.16)] backdrop-blur-sm md:grid-cols-2 md:p-10">
          <div className="order-2 md:order-1">
            <p className="text-xs font-semibold tracking-[0.26em] text-amber-800">SUMMER 2026</p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
              Summer Camp Registration Is Now Open
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
              Join us this summer for vibrant, joy-filled camps where children explore creativity,
              mindfulness, STEM, arts, language, and teamwork in a caring environment built for
              confidence and discovery.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/summer-camp"
                className="rounded-full bg-amber-800 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-amber-700"
              >
                Learn More
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-amber-700/40 bg-white px-6 py-3 text-sm font-semibold tracking-wide text-amber-900 transition hover:bg-amber-50"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative overflow-hidden rounded-[1.6rem] border border-amber-200 bg-white shadow-[0_18px_40px_rgba(31,41,55,0.14)]">
              <Image
                src="/images/summer-camp/summercamp.jpg"
                alt="Honeydrop Learning House summer camp poster"
                width={900}
                height={1200}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf3] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-serif text-3xl leading-tight text-slate-900 sm:text-4xl">
              Education Rooted in Care, Experience, and Real Learning Needs
            </h3>
            <p className="mt-6 text-base leading-8 text-slate-700 sm:text-lg">
              We are a dedicated team of educators shaped by family journeys, classroom practice,
              and close observation of how learners truly grow. We recognize the gap between formal
              schooling and the attentive, values-guided education many families are seeking.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-700 sm:text-lg">
              At Honeydrop Learning House, we support homeschooling studies, enrich academic growth,
              and provide responsible exam preparation in English and French. We also welcome
              learners of all ages and encourage a lifelong approach to learning rooted in curiosity,
              confidence, and meaningful human connection.
            </p>
            <p className="mt-6 text-base font-semibold text-amber-900 sm:text-lg">
              Explore our programs, meet our educators, and discover the ethos shaping our learning
              community.
            </p>
            <Link
              href="/about"
              className="mt-8 inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold tracking-wide text-white transition hover:bg-slate-700"
            >
              Learn More
            </Link>
          </div>

          <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <Image
              src="/images/building/front-entrance.jpg"
              alt="Students and families arriving at Honeydrop Learning House"
              width={1400}
              height={1000}
              loading="lazy"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#f6ede2] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-6xl space-y-14">
          <div className="rounded-[1.8rem] border border-amber-200/60 bg-white/85 p-7 shadow-[0_16px_40px_rgba(146,98,57,0.1)] sm:p-10">
            <h4 className="font-serif text-3xl text-slate-900 sm:text-4xl">Why Choose Our Learning House?</h4>
            <div className="mt-7 grid gap-3 text-base leading-8 text-slate-700 sm:grid-cols-2 sm:text-lg">
              {[
                "Caring teachers with creative, child-centered programs",
                "Confidence-building classes designed for real growth",
                "Strong, thoughtfully structured teaching content",
                "A safe, warm, and family-friendly learning environment",
              ].map((item) => (
                <p key={item} className="rounded-2xl bg-amber-50/60 px-4 py-3">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-[1.6rem] border border-slate-200 bg-white p-7 shadow-[0_12px_36px_rgba(15,23,42,0.08)] sm:p-9">
              <h5 className="font-serif text-3xl text-slate-900">Meet the Staff</h5>
              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                We are professional and passionate educators dedicated to each student&apos;s holistic
                growth. Our team combines strong academic guidance with meaningful life education so
                learners can grow with confidence in every area of life.
              </p>
              <Link
                href="/staff"
                className="mt-7 inline-flex rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-100"
              >
                Meet Our Educators
              </Link>
            </article>

            <article className="rounded-[1.6rem] border border-slate-200 bg-white p-7 shadow-[0_12px_36px_rgba(15,23,42,0.08)] sm:p-9">
              <h5 className="font-serif text-3xl text-slate-900">Admissions</h5>
              <p className="mt-5 text-base leading-8 text-slate-700 sm:text-lg">
                Choosing the right class is a meaningful decision, whether for homeschooling support,
                after-school enrichment, adult learning, or PA Day programs. We are here to help you
                select the path that best supports your learning journey.
              </p>
              <Link
                href="/enrolment"
                className="mt-7 inline-flex rounded-full bg-[#F4BE36] px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-[#F4BE36]/90"
              >
                View Admissions
              </Link>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
