export const profile = {
  name: "Gauri Agarwal",
  role: "Aspiring Software Developer",
  location: "India · remote-friendly",
  email: "gauriagarwal25@gmail.com",
  phone: "+91 84392 11097",
  tagline: "I build things that matter — thoughtful. scalable. real.",
  github: "https://github.com/gauriiiiiiiiiiii",
  linkedin: "https://www.linkedin.com/in/gauriiiiiiiiiiii/",
  instagram: "https://www.instagram.com/gau.ri.__/",
  portfolio: "https://portfolioo-five-blond.vercel.app/",
  // Resume
  resume:
    "https://drive.google.com/file/d/1rekTnbkr1ZLhulOkb2vyRkExY0D5FDcL/view?usp=drive_link",
};

export const projects = [
  {
    name: "OuttaCouch",
    blurb: "Full-stack social platform with live messaging, QR ticketing, and host analytics",
    stack: ["Next.js", "PostgreSQL", "Prisma", "Socket.io", "Supabase"],
    link: "https://github.com/gauriiiiiiiiiiii/OuttaCouch",
  },
  {
    name: "YoutubeLoom",
    blurb: "Browser-based screen recorder with direct-to-YouTube upload and zero server storage",
    stack: ["Next.js 15", "TypeScript", "MediaRecorder API", "Canvas API", "IndexedDB"],
    link: "https://github.com/gauriiiiiiiiiiii/YoutubeLoom",
  },
  {
    name: "EtcdLockMaster",
    blurb: "Distributed locking library on etcd with Raft consensus and crash recovery",
    stack: ["Python", "etcd", "Raft Consensus", "gRPC", "Docker"],
    link: "https://github.com/gauriiiiiiiiiiii/EtcdLockMaster",
  },
  {
    name: "FactorLens",
    blurb: "Quantitative equity factor pipeline with ML alpha signal extraction",
    stack: ["Python", "Scikit-Learn", "XGBoost", "Streamlit", "Plotly"],
    link: "https://github.com/gauriiiiiiiiiiii/FactorLens",
  },
];

export const experience = [
  {
    company: "Munshot",
    role: "Software Engineering Intern",
    period: "Apr 2026 — Present",
    location: "Internship",
    points: [
      "Working on NestJS backend development for an AI-driven fintech platform — building scalable APIs and backend systems to support investor research and capital deployment across public stock markets.",
    ],
  },
  {
    company: "MFolks.com",
    role: "App Developer Intern",
    period: "Jul 2025 — Sep 2025",
    location: "Internship",
    points: [
      "Developed a Flutter-based B2B platform enabling seamless supplier-client interactions with real-time transaction management, workflow integration, and synchronized cross-platform data flow through REST APIs.",
    ],
  },
  {
    company: "Fantacian Labs Media",
    role: "Digital Marketing Intern",
    period: "Dec 2024 — Aug 2025",
    location: "India",
    points: [
      "Executed targeted Facebook and LinkedIn campaigns with strategic outreach — boosting international engagement and converting foreign clients through Loom demos.",
    ],
  },
  {
    company: "Fashion Herald",
    role: "Social Media Intern",
    period: "Apr 2024 — Jun 2024",
    location: "India",
    points: [
      "Contributed to social media strategies, content creation, post scheduling, and engagement analysis.",
    ],
  },
  {
    company: "Aarambh Organization",
    role: "Management Intern",
    period: "Jan 2023 — Jun 2023",
    location: "India",
    points: [
      "Supervised NGO activities, demonstrating management skills to support the organization's operations.",
    ],
  },
];

export const education = [
  {
    school: "National Institute of Technology, Delhi",
    degree: "B.Tech, Computer Science Engineering",
    period: "Aug 2023 — Aug 2027",
    details: [],
  },
  {
    school: "DSC, Delhi University",
    degree: "B.Sc. Physics (Hons) — Certificate Course",
    period: "Nov 2022 — June 2023",
    details: ["A brief detour through physics"],
  },
  {
    school: "Vision Valley School, India",
    degree: "Secondary & Higher Secondary",
    period: "Until 2022",
    details: ["Class 10th: 92%", "Class 12th: 83%"],
  },
];

export const skills = {
  Languages: ["Python", "C/C++", "TypeScript", "JavaScript", "SQL", "HTML", "CSS"],
  "Frameworks & Libraries": ["React.js", "Next.js", "Node.js", "Express.js", "Flutter", "REST APIs"],
  "Databases & Cloud": ["MySQL", "MongoDB", "Supabase", "Firebase", "Vercel", "Render"],
  "Machine Learning": ["PyTorch", "Scikit-Learn", "Transformers", "LLMs", "NLP", "Computer Vision"],
  "Tools & DevOps": ["Docker", "Git", "GitHub", "Linux"],
};

export const flatSkills = Object.values(skills).flat();
