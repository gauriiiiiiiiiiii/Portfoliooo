export const profile = {
  name: "Nancy Kataria",
  role: "Software Engineer",
  location: "San Jose, CA",
  email: "katarianancy8@gmail.com",
  tagline: "Full-stack engineer building AI-powered, human-friendly software.",
  github: "https://github.com/nancy-kataria",
  linkedin: "https://www.linkedin.com/in/nancy-kataria8/",
  resume:
    "https://drive.google.com/file/d/1HXInpFfkguZbp2FPL3tg23fdMfAu6p78/view?usp=sharing",
};

export const projects = [
  {
    name: "Bull v. Bear",
    blurb: "AI-powered Investment research platform",
    stack: [
      "Typescript",
      "Next.js",
      "PostgreSQL",
      "Supabase",
      "Prisma",
      "AI-SDK",
      "OpenAI",
      "Vitest",
      "OAuth",
    ],
    link: "https://github.com/nancy-kataria/Bull-v-Bear",
  },
  {
    name: "Code Intelligence",
    blurb: "RAG app that answers questions about any GitHub repo.",
    stack: [
      "Next.js",
      "TypeScript",
      "Langchain",
      "Pinecone",
      "Zod",
      "OpenAI GPT-4",
      "Vercel",
    ],
    link: "https://github.com/nancy-kataria/codebase-intelligence",
  },
  {
    name: "Digital Lawyer",
    blurb: "Offline-first AI legal assistant running fully on-device.",
    stack: ["Next.js", "Ollama", "Gemma3", "Llava", "Web Speech API"],
    link: "https://github.com/nancy-kataria/Digital_Lawyer",
  },
  {
    name: "Parking Violations Checker",
    blurb: "Prolog expert system that infers campus parking violations.",
    stack: ["Prolog", "JavaScript", "HTML", "CSS"],
    link: "https://github.com/nancy-kataria/Parking-Violations-Checker",
  },
];

export const experience = [
  {
    company: "i3 Digital Health",
    role: "Software Engineer",
    period: "Jul 2023 — Nov 2023",
    location: "Bangalore, India",
    points: [
      "Built a doctor-facing portal with React + Redux for cancer genomics and treatments.",
      "Designed JWT auth and RESTful APIs in Express.js.",
      "Used React Query for cached, real-time patient ↔ doctor communication.",
    ],
  },
  {
    company: "i3 Digital Health",
    role: "Software Engineer Intern",
    period: "Jan 2023 — Jun 2023",
    location: "Bangalore, India",
    points: [
      "Shipped a Time Log & Payroll system with React, Express and MongoDB.",
      "Built v1 of the Cancer Patient Health Records app from scratch.",
    ],
  },
];

export const education = [
  {
    school: "California State University - Fullerton, United States",
    degree: "M.S. Computer Science",
    period: "Jan 2024 — Jan 2026",
    detail: "GPA 3.68",
  },
  {
    school: "Panjab University, India",
    degree: "B.E. Computer Science",
    period: "Aug 2019 — May 2023",
    detail: "CGPA 3.32",
  },
];

export const skills = {
  Languages: [
    "Python",
    "JavaScript",
    "TypeScript",
    "SQL",
    "Prolog",
    "HTML",
    "CSS",
    "JSON",
  ],
  "Frameworks & Libraries": [
    "React",
    "Next.js",
    "Node.js",
    "Express.js",
    "Deno",
    "Tailwind CSS",
    "Zod",
    "Pandas",
    "NumPy",
    "Scikit-learn",
    "PyTorch",
    "LangChain",
  ],
  "Databases & Backends": [
    "PostgreSQL",
    "pgvector",
    "MySQL",
    "MongoDB",
    "Supabase",
    "Pinecone",
    "Prisma",
  ],
  "Tools & DevOps": [
    "Git",
    "GitHub",
    "GitHub Actions",
    "CI/CD",
    "Postman",
    "Vitest",
  ],
};

export const flatSkills = Object.values(skills).flat();
