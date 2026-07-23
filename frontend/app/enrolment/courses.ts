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
  {
    slug: "global-explorers",
    name: "Global Explorers Camp",
    category: "summer-camps",
    cost: "$340",
    priceCents: 34000,
    cadence: "July 27 - 31",
    summary:
      "A week-long global explorers camp for kids aged 6-12 to explore different cultures and geographical locations.",
    description:
      "This camp is designed for young learners to travel the world without leaving the classroom. Each day focuses on a different region, with hands-on activities, stories, games, and creative projects that bring diverse cultures to life.",
    image: "/images/summer-camp/Global_Explorers_Camp.png",
    imageAlt: "Children learning about different cultures and geographical locations in a summer camp setting",
    highlights: ["Cultural activities", "Geography games", "Storytelling"],
    idealFor: "Children aged 6-12 curious about the wider world and different ways of life.",
    included: [
      "Daily cultural exploration activities",
      "Small-group instruction",
      "Craft and project materials",
    ],
  },
  {
    slug: "coding",
    name: "Coding Camp",
    category: "summer-camps",
    cost: "$380",
    priceCents: 38000,
    cadence: "August 3 - 7",
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
    slug: "robotics",
    name: "Robotics Camp",
    category: "summer-camps",
    cost: "$380",
    priceCents: 38000,
    cadence: "August 10 - 14",
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
    slug: "entrepreneurship",
    name: "Entrepreneurship Camp",
    category: "summer-camps",
    cost: "$360",
    priceCents: 36000,
    cadence: "August 17 - 21",
    summary:
      "A week-long entrepreneurship camp for kids aged 10-16 to explore business concepts and innovation.",
    description:
      "This camp is designed for young entrepreneurs to learn what it takes to turn an idea into something real. Participants will develop a business concept, design a product or service, and pitch it to their peers in a fun, supportive environment.",
    image: "/images/summer-camp/Entrepreneur_Camp.png",
    imageAlt: "Children learning about business concepts and innovation in a summer camp setting",
    highlights: ["Business basics", "Creative problem-solving", "Pitch day"],
    idealFor: "Children aged 10-16 who are natural leaders, creators, or love coming up with big ideas.",
    included: [
      "Business concept development",
      "Small-group instruction",
      "Project and presentation materials",
    ],
  },
  {
    slug: "multi-arts",
    name: "Multi-Arts Camp",
    category: "summer-camps",
    cost: "$360",
    priceCents: 36000,
    cadence: "August 24 - 28",
    summary:
      "A week-long multi-arts camp for kids aged 5-14 to explore various artistic disciplines.",
    description:
      "This camp is designed for young artists to experiment across multiple creative disciplines. Participants will rotate through painting, drawing, sculpting, and mixed-media projects, building confidence and finding new ways to express themselves.",
    image: "/images/summer-camp/Multi-arts_Camp.png",
    imageAlt: "Children creating artistic projects in a summer camp setting",
    highlights: ["Painting & drawing", "Sculpting", "Mixed media"],
    idealFor: "Children aged 5-14 who love making art and want to try new creative techniques.",
    included: [
      "Daily art projects",
      "Small-group instruction",
      "All art supplies and materials",
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