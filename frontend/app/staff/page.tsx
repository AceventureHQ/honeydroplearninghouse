import Image from "next/image";

export default function Staff() {
  const staffMembers = [
    {
      name: "Veronica Bradbury (Miss B)",
      role: "Curriculum Development Lead",
      education: "B.Soc.Sc.; B.Ed.; OCT",
      type: "Creative, Kind",
      image: "/images/miss_b.jpg",
      objectPosition: "object-center top-[10%]",
    },
    {
      name: "Jill Jeffs (Mrs. Jeffs)",
      role: "Homeschool Support Lead",
      education: "B.A.; SSW Dip.",
      type: "Patient, Supportive",
      image: "/images/jill.jpg",
      objectPosition: "object-center top-[10%]",
    },
    {
      name: "Johnathan Hewlett (Mr. John)",
      role: "Music Lead",
      education: "B.A. (Sacred Music, in progress)",
      type: "Energetic, Inspiring",
      image: "/images/John.jpg",
      objectPosition: "object-center",
    },
    {
      name: "Kimberly Lai (Ms. Kim)",
      role: "Center Lead",
      education: "B.Ed. in Music; MTS; Ph.D.; OCT",
      type: "Warm, Vision-Driven",
      image: "/images/Kimberly.png",
      objectPosition: "object-center top-[8%]",
    },
    {
      name: "Jim Oribine (Mr. O)",
      role: "Consulting Educator",
      education: "B.A.; B.Ed.; OCT; Special Ed. Specialist",
      type: "Experienced, Compassionate",
      image: "/images/jim.jpg",
      objectPosition: "object-center top-[8%]",
    },
  ];

  return (
    <main className="overflow-hidden text-slate-900">
      <section className="relative isolate min-h-screen px-5 py-12 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.86),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_30%),linear-gradient(180deg,#f8f3eb_0%,#efe5d8_100%)]" />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-amber-800/80">
              Meet the Staff
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700 sm:text-lg">
              The team is intentionally different in personality and background, so families see a mix of calm, structure, creativity, and encouragement.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {staffMembers.map((member, index) => (
              <article
                key={member.name}
                className="overflow-hidden rounded-[1.8rem] border border-slate-200/80 bg-white/88 shadow-[0_24px_64px_rgba(15,23,42,0.08)] backdrop-blur-md"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    loading={index === 0 ? "eager" : "lazy"}
                    className={`object-cover ${member.objectPosition}`}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,18,29,0.02)_0%,rgba(10,18,29,0.08)_40%,rgba(10,18,29,0.38)_100%)]" />
                </div>
                <div className="space-y-4 p-5">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.24em] text-amber-800/80">
                      {member.role}
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-900">
                      {member.name}
                    </h2>
                  </div>
                  <div className="space-y-3 text-sm leading-7 text-slate-700">
                    <p>
                      <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Education
                      </span>
                      {member.education}
                    </p>
                    <p>
                      <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                        Type of person
                      </span>
                      {member.type}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
