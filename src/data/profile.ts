import { getExperienceYears } from "@/lib/experience";

const experienceYears = getExperienceYears();

export const profile = {
  name: "Pranam P Shetty",
  firstName: "Pranam",
  lastName: "Shetty",
  title: "React.js Frontend Developer",
  tagline: "Crafting immersive digital experiences with precision & passion",
  email: "pranamshettybunt@gmail.com",
  phone: "9482678553",
  profileImage: "/profile.png",
  experienceYears,
  career: {
    company: "Codewave",
    companyUrl: "https://codewave.com/",
    internPeriod: "Nov 2022 – Feb 2023",
    fullTimeStart: "Mar 2023",
  },
  location: "India",
  ticker: [
    ["React", "Experience", "Delight"],
    ["Next.js", "Performance", "Speed"],
    ["TypeScript", "Scale", "Reliability"],
    ["Tailwind", "Design", "Precision"],
    ["Motion", "Interfaces", "Wow"],
    ["APIs", "Data", "Insight"],
    ["Code", "Everything", "10x Outcomes"],
  ],
  pillars: [
    {
      kicker: "PROCESS · Component-First",
      title: "Scalable UI Architecture",
      lead: "See features in days, not weeks.",
      body: "Reusable, typed component systems that let product teams ship faster without breaking what works.",
    },
    {
      kicker: "PERFORMANCE · Core Web Vitals",
      title: "Fast by Default",
      lead: "Every millisecond is conversion.",
      body: "Code-splitting, lazy media, and render-aware state so pages feel instant on real devices.",
    },
    {
      kicker: "PEOPLE · Direct Access",
      title: "Talk to the Builder",
      lead: "No middle layers.",
      body: "I work directly with designers, PMs and backend teams — the person you talk to is the one who builds.",
    },
  ],
  summary:
    `Dedicated Frontend Developer with ${experienceYears} years of experience at Codewave, specializing in the React.js ecosystem. Built production web applications across healthcare, e-commerce, fintech, and edtech — including Aster Labs, Bhima Gold, PaySingle, and BookNow Health. Passionate about performant, accessible, and visually stunning interfaces.`,
  skills: [
    { name: "React.js", level: 92 },
    { name: "JavaScript / TypeScript", level: 88 },
    { name: "Next.js", level: 85 },
    { name: "HTML5 & CSS3", level: 90 },
    { name: "Tailwind CSS", level: 87 },
    { name: "REST APIs", level: 82 },
    { name: "Git & Version Control", level: 85 },
    { name: "Responsive Design", level: 90 },
  ],
  skillTags: [
    "React.js",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
    "HTML5",
    "CSS3",
    "REST APIs",
    "Git",
    "Responsive UI",
    "Framer Motion",
    "Performance Optimization",
  ],
  experience: [
    {
      role: "Frontend Developer",
      company: "Codewave",
      companyUrl: "https://codewave.com/",
      period: "Mar 2023 – Present",
      internPeriod: "Intern · Nov 2022 – Feb 2023",
      description:
        "Designing and developing scalable, high-performance web applications at Codewave using React.js and modern frontend technologies. Focused on component architecture, state management, and delivering pixel-perfect UI for client products across multiple industries.",
      highlights: [
        "Developed frontend for Aster Labs — clinical diagnostics & lab test booking platform",
        "Built Bhima Gold e-commerce store, admin panel, and dev environments",
        "Delivered features for PaySingle, Tutory.ai, DataCat, and BookNow Health",
        "Implemented reusable components, responsive UI, and performance optimizations",
      ],
    },
  ],
  projects: [
    {
      name: "Aster Labs",
      url: "https://www.asterlabs.in/",
      description:
        "Clinical diagnostic centre platform with lab test booking, health packages, home sample collection, and report access across 300+ labs.",
      tags: ["React.js", "Healthcare", "Responsive UI"],
      category: "Healthcare",
    },
    {
      name: "Bhima Gold",
      url: "https://www.bhimagold.com/",
      description:
        "Online jewellery store for gold, diamond, and silver products with purchase plans, collections, and live gold rate integration.",
      tags: ["React.js", "Next.js", "E-commerce"],
      category: "E-commerce",
    },
    {
      name: "Bhima Gold (Dev)",
      url: "https://www.bhimagold.com/",
      description:
        "Development environment for Bhima Jewellers e-commerce — feature testing, staging releases, and UI iterations.",
      tags: ["React.js", "E-commerce", "Staging"],
      category: "E-commerce",
    },
    {
      name: "Bhima Gold Admin",
      url: "https://admin.bhimagold.com/login",
      description:
        "Admin dashboard for managing jewellery catalogue, orders, content, and store operations for Bhima Gold.",
      tags: ["React.js", "Admin Panel", "Dashboard"],
      category: "E-commerce",
    },
    {
      name: "Tutory.ai",
      url: "https://tutory.ai",
      description:
        "AI-powered tutoring platform with interactive learning experiences and modern web interface.",
      tags: ["React.js", "EdTech", "AI"],
      category: "EdTech",
    },
    {
      name: "PaySingle",
      url: "https://www.paysingle.com/",
      description:
        "Payment and financial services web application with streamlined user flows and secure transactions.",
      tags: ["React.js", "FinTech", "Payments"],
      category: "FinTech",
    },
    {
      name: "DataCat",
      description:
        "Data analytics and management platform with dashboards and data visualization interfaces.",
      tags: ["React.js", "Data", "Analytics"],
      category: "Data",
    },
    {
      name: "BookNow Health",
      url: "https://dev.booknow.health/",
      description:
        "Healthcare appointment booking platform — scheduling, provider listings, and patient-facing UI.",
      tags: ["React.js", "Healthcare", "Booking"],
      category: "Healthcare",
    },
  ],
  education: [
    {
      degree: "Schooling",
      field: "ICSE Curriculum",
      institution: "Green Valley International School & Junior College",
      url: "https://www.gvis.edu.in/",
      location: "Shiruru, Udupi District, Karnataka",
    },
    {
      degree: "Diploma",
      field: "Civil Engineering",
      institution: "R.N. Shetty Rural Polytechnic",
      url: "https://rnspolytechnic.in/",
      location: "Murudeshwar, Uttara Kannada, Karnataka",
    },
  ],
  social: {
    github: "#",
    linkedin: "https://www.linkedin.com/feed/",
    naukri: "https://www.naukri.com/mnjuser/homepage",
  },
};
