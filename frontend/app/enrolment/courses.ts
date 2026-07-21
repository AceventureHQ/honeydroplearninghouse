export type Course = {
  slug: string;
  name: string;
  category: "summer-camps" | "tutoring";
  cost: string;
  priceCents: number;
  cadence: string;
  summary: string;
  description: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  idealFor: string;
  included: string[];
};

export const courses: Course[] = [
  // {
  //   slug: "homeschool-support",
  //   name: "Homeschool Support",
  //   cost: "$220 / month",
  //   cadence: "Weekly support blocks",
  //   summary:
  //     "Guided learning blocks, family planning, and progress check-ins for custom homeschool paths.",
  //   description:
  //     "Best for families who want structure without giving up flexibility. We help shape a weekly rhythm, track goals, and keep learning moving in a calm, encouraging way.",
  //   image: "/images/front-reception.jpg",
  //   imageAlt: "Honeydrop Learning House reception space",
  //   highlights: ["Weekly planning", "Portfolio guidance", "Family check-ins"],
  //   idealFor: "Families building a personalized learning rhythm.",
  //   included: [
  //     "Learning goal review",
  //     "Custom weekly plan",
  //     "Progress communication",
  //     "Resource recommendations",
  //   ],
  // },
  // {
  //   slug: "after-school-enrichment",
  //   name: "After School Enrichment",
  //   cost: "$165 / month",
  //   cadence: "Afternoon sessions",
  //   summary:
  //     "Homework support, hands-on projects, and a calm reset after the school day.",
  //   description:
  //     "This course is built for learners who need a soft landing after school. We balance homework support with creative, active, and social enrichment.",
  //   image: "/images/ESS00022-HDR.jpg",
  //   imageAlt: "Learners participating in an enrichment activity",
  //   highlights: ["Homework help", "Creative projects", "Movement breaks"],
  //   idealFor: "Children who need support after the school day.",
  //   included: [
  //     "Homework help",
  //     "Project-based learning",
  //     "Snack and movement time",
  //     "Daily routine support",
  //   ],
  // },
  // {
  //   slug: "adult-learning",
  //   name: "Adult Learning",
  //   cost: "$140 / course",
  //   cadence: "Small-group sessions",
  //   summary:
  //     "Practical classes for adults who want confidence, support, and flexible learning.",
  //   description:
  //     "This option is designed for adults who want a supportive place to build everyday skills, literacy confidence, or a fresh learning routine.",
  //   image: "/images/DSC_2413-1.jpg",
  //   imageAlt: "Adult learning and community classroom setting",
  //   highlights: ["Small groups", "Practical skills", "Flexible pacing"],
  //   idealFor: "Adults looking for approachable, useful instruction.",
  //   included: [
  //     "Initial goals conversation",
  //     "Small-group instruction",
  //     "Practice materials",
  //     "Flexible scheduling options",
  //   ],
  // },
  {
    slug: "robotics",
    name: "Robotics Camp",
    category: "summer-camps",
    cost: "$380",
    priceCents: 38000,
    cadence: "August 10-14",
    summary:
      "A week-long robotics camp for kids aged 7-14 to explore coding, engineering, and teamwork.",
    description:
      "This camp is designed for young learners to dive into the world of robotics. Participants will engage in hands-on activities, learn basic programming, and work in teams to build and program their own robots.",
    image: "/images/summer-camp/Robotics_Lab_Camp.png",
    imageAlt: "Children building robots in a summer camp setting",
    highlights: ["Small groups", "Practical skills", "Flexible pacing"],
    idealFor: "Children aged 7-14 interested in exploring robotics.",
    included: [
      "Initial goals conversation",
      "Small-group instruction",
      "Practice materials",
    ],
  },
  {
    slug: "coding",
    name: "Coding Camp",
    category: "summer-camps",
    cost: "$380",
    priceCents: 38000,
    cadence: "August 3-7",
    summary:
      "A week-long coding camp for kids aged 7-14 to explore programming, problem-solving, and creativity.",
    description:
      "This camp is designed for young learners to dive into the world of coding. Participants will engage in hands-on activities, learn basic programming, and work in teams to build and program their own projects.",
    image: "/images/summer-camp/Junior_Coding_Camp.png",
    imageAlt: "Children learning to code in a summer camp setting",
    highlights: ["Small groups", "Practical skills", "Flexible pacing"],
    idealFor: "Children aged 7-14 interested in exploring coding.",
    included: [
      "Initial goals conversation",
      "Small-group instruction",
      "Practice materials",
    ],
  },
  {
    slug: "global-explorers",
    name: "Global Explorers Camp",
    category: "summer-camps",
    cost: "$340",
    priceCents: 34000,
    cadence: "",
    summary:
      "A week-long global explorers camp for kids aged 6-12 to explore different cultures and geographical locations.",
    description:
      "This camp is designed for young learners to dive into the world of various artistic disciplines. Participants will engage in hands-on activities, learn basic techniques, and work in teams to create their own artistic projects.",
    image: "/images/summer-camp/Global_Explorers_Camp.png",
    imageAlt: "Children learning about different cultures and geographical locations in a summer camp setting",
    highlights: ["Small groups", "Practical skills", "Flexible pacing"],
    idealFor: "Children aged 6-12 interested in exploring different cultures and geographical locations.",
    included: [
      "Initial goals conversation",
      "Small-group instruction",
      "Practice materials",
    ],
  },
  {
    slug: "multi-arts",
    name: "Multi-Arts Camp",
    category: "summer-camps",
    cost: "$350",
    priceCents: 35000,
    cadence: "",
    summary:
      "A week-long multi-arts camp for kids aged 5-14 to explore various artistic disciplines.",
    description:
      "This camp is designed for young learners to dive into the world of various artistic disciplines. Participants will engage in hands-on activities, learn basic techniques, and work in teams to create their own artistic projects.",
    image: "/images/summer-camp/Multi-arts_Camp.png",
    imageAlt: "Children creating artistic projects in a summer camp setting",
    highlights: ["Small groups", "Practical skills", "Flexible pacing"],
    idealFor: "Children aged 5-14 interested in exploring various artistic disciplines.",
    included: [
      "Initial goals conversation",
      "Small-group instruction",
      "Practice materials",
    ],
  },
  {
    slug: "entrepreneurship",
    name: "Entrepreneurship Camp",
    category: "summer-camps",
    cost: "$350",
    priceCents: 35000,
    cadence: "",
    summary:
      "A week-long entrepreneurship camp for kids aged 7-14 to explore business concepts and innovation.",
    description:
      "This camp is designed for young learners to dive into the world of various artistic disciplines. Participants will engage in hands-on activities, learn basic techniques, and work in teams to create their own artistic projects.",
    image: "/images/summer-camp/Entrepreneur_Camp.png",
    imageAlt: "Children learning about business concepts and innovation in a summer camp setting",
    highlights: ["Small groups", "Practical skills", "Flexible pacing"],
    idealFor: "Children aged 7-14 interested in exploring various artistic disciplines.",
    included: [
      "Initial goals conversation",
      "Small-group instruction",
      "Practice materials",
    ],
  },
  {
    slug: "mission-space",
    name: "Mission Space Camp",
    category: "summer-camps",
    cost: "$360",
    priceCents: 36000,
    cadence: "",
    summary:
      "A week-long space exploration camp for kids aged 5-9 to learn about astronomy and rocket science.",
    description:
      "This camp is designed for young learners to dive into the world of various artistic disciplines. Participants will engage in hands-on activities, learn basic techniques, and work in teams to create their own artistic projects.",
    image: "/images/summer-camp/Mission_Space_STEM_Camp.png",
    imageAlt: "Children learning about astronomy and rocket science in a summer camp setting",
    highlights: ["Small groups", "Practical skills", "Flexible pacing"],
    idealFor: "Children aged 5-9 interested in exploring space and STEM concepts.",
    included: [
      "Initial goals conversation",
      "Small-group instruction",
      "Practice materials",
    ],
  },
  // {
  //   slug: "test",
  //   name: "Test Course",
  //   category: "tutoring",
  //   cost: "1 cent",
  //   priceCents: 1,
  //   cadence: "",
  //   summary:
  //     "Choose between one-on-one or small-group math tutoring sessions for kids aged 5-13 to improve their math skills.",
  //   description:
  //     "This tutoring service is designed for young learners to receive personalized math instruction. Participants will engage in one-on-one or small-group sessions, focusing on their specific math needs and goals.",
  //   image: "/images/building/duck2.jpg",
  //   imageAlt: "Children learning about astronomy and rocket science in a summer camp setting",
  //   highlights: ["Small groups", "Practical skills", "Flexible pacing"],
  //   idealFor: "Children aged 5-13 interested in improving their math skills.",
  //   included: [
  //     "Initial goals conversation",
  //     "Small-group instruction",
  //     "Practice materials",
  //   ],
  // },
  // {
  //   slug: "math-elementary",
  //   name: "Math Tutor (Elementary)",
  //   category: "tutoring",
  //   cost: "$40 / hour",
  //   priceCents: 4000,
  //   cadence: "",
  //   summary:
  //     "Choose between one-on-one or small-group math tutoring sessions for kids aged 5-13 to improve their math skills.",
  //   description:
  //     "This tutoring service is designed for young learners to receive personalized math instruction. Participants will engage in one-on-one or small-group sessions, focusing on their specific math needs and goals.",
  //   image: "/images/building/duck2.jpg",
  //   imageAlt: "Children learning about astronomy and rocket science in a summer camp setting",
  //   highlights: ["Small groups", "Practical skills", "Flexible pacing"],
  //   idealFor: "Children aged 5-13 interested in improving their math skills.",
  //   included: [
  //     "Initial goals conversation",
  //     "Small-group instruction",
  //     "Practice materials",
  //   ],
  // },
  // {
  //   slug: "math-high-school",
  //   name: "Math Tutor (High School)",
  //   category: "tutoring",
  //   cost: "$60 / hour",
  //   priceCents: 6000,
  //   cadence: "",
  //   summary:
  //     "Choose between one-on-one or small-group math tutoring sessions for kids aged 14-18 to improve their math skills.",
  //   description:
  //     "This tutoring service is designed for young learners to receive personalized math instruction. Participants will engage in one-on-one or small-group sessions, focusing on their specific math needs and goals.",
  //   image: "/images/building/duck1.jpg",
  //   imageAlt: "Children learning about astronomy and rocket science in a summer camp setting",
  //   highlights: ["Small groups", "Practical skills", "Flexible pacing"],
  //   idealFor: "Children aged 14-18 interested in improving their math skills.",
  //   included: [
  //     "Initial goals conversation",
  //     "Small-group instruction",
  //     "Practice materials",
  //   ],
  // },
];

export function getCourseBySlug(slug: string) {
  return courses.find((course) => course.slug === slug);
}