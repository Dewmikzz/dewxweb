// Central project data — easy to extend without touching components
export const projects = [
  {
    id: "01",
    slug: "pshycolab",
    title: "PshycoLab",
    tagline: "Digital Technology Company",
    description:
      "A full-scale digital product ecosystem built from the ground up. PshycoLab is a technology company platform featuring SaaS tooling, developer utilities and modern product infrastructure — architected for scale from day one.",
    category: "Product Ecosystem",
    year: "2024",
    role: "Founder · Lead Developer",
    technologies: ["React", "Node.js", "Firebase", "JavaScript", "UI/UX", "Cloud"],
    color: "#f5f0eb",
    accentColor: "#2d2926",
    liveUrl: "https://www.pshycolab.com/",
    displayUrl: "pshycolab.com",
    hasLivePreview: true,
  },
  {
    id: "02",
    slug: "aira",
    title: "AIRA",
    tagline: "Real-Time AI Voice Agent",
    description:
      "A real-time conversational AI agent powered by state-of-the-art speech-to-text and text-to-speech pipelines. AIRA processes natural language, understands context and responds with near-zero latency — engineered for production voice experiences.",
    category: "AI / Voice Intelligence",
    year: "2024",
    role: "Lead Developer",
    technologies: ["Python", "FastAPI", "AI Models", "Speech-to-Text", "Text-to-Speech"],
    color: "#f0f0f5",
    accentColor: "#1a1a2e",
    liveUrl: "https://aira-by-pshycolab.vercel.app/",
    displayUrl: "aira-by-pshycolab.vercel.app",
    hasLivePreview: true,
  },
  {
    id: "03",
    slug: "pshycolab-pos",
    title: "PshycoLab POS",
    tagline: "Cloud Point of Sale & Retail Platform",
    description:
      "A high-performance modern Point-of-Sale (POS) and retail management platform. Engineered with lightning-fast real-time checkout, sales analytics, multi-inventory tracking, and receipt generation for business operations.",
    category: "SaaS / Fintech / Retail",
    year: "2024",
    role: "Lead Architect · Full Stack",
    technologies: ["React", "TypeScript", "Tailwind CSS", "REST API", "Vite", "Cloud"],
    color: "#f3f5f0",
    accentColor: "#1e2e1a",
    liveUrl: "https://pshycolab-pos.vercel.app/sales",
    displayUrl: "pshycolab-pos.vercel.app",
    hasLivePreview: true,
  },
  {
    id: "04",
    slug: "maathrucare",
    title: "MaathruCare",
    tagline: "Pregnancy Emotional Support PWA",
    description:
      "An empathetic, AI-assisted progressive web app designed to provide emotional support during pregnancy. Supports Sinhala, English and Singlish — breaking language barriers for underserved communities. Integrates TensorFlow.js for intelligent conversational capabilities.",
    category: "Health · AI · PWA",
    year: "2024",
    role: "Full Stack Developer",
    technologies: ["Firebase", "TensorFlow.js", "PWA", "AI/Chat", "Sinhala", "English"],
    color: "#f0f5f2",
    accentColor: "#1a2e22",
  },
  {
    id: "05",
    slug: "bitez",
    title: "BiteZ",
    tagline: "Food Waste Reduction Platform",
    description:
      "A community-driven MERN stack platform tackling food waste by connecting surplus food sources with people who need it. Real-time listings, location intelligence and automated matching engine — technology serving a social mission.",
    category: "Social Impact · MERN",
    year: "2023",
    role: "Full Stack Developer",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Firebase"],
    color: "#f5f2eb",
    accentColor: "#2e2a1a",
  },
  {
    id: "06",
    slug: "concert-gala",
    title: "Concert Gala",
    tagline: "Event Ticketing & Scanning Ecosystem",
    description:
      "An end-to-end event management and ticketing platform with real-time QR scanning, email automation, attendee management and live dashboards. Designed for high-throughput events with zero tolerance for failure.",
    category: "Events · Ticketing",
    year: "2023",
    role: "Lead Developer",
    technologies: ["React", "Firebase", "PWA", "Email Automation", "QR"],
    color: "#f2f0f5",
    accentColor: "#1e1a2e",
  },
];

export const experience = [
  {
    year: "2024 – Present",
    role: "Founder & Lead Developer",
    company: "PshycoLab",
    description:
      "Founded and architected a digital technology company. Leading all aspects of product design, full-stack engineering, cloud infrastructure and team direction.",
    type: "Founder",
  },
  {
    year: "2024",
    role: "Lead Developer — AI Systems",
    company: "AIRA Project",
    description:
      "Engineered a production-ready real-time AI voice agent. Designed the full speech pipeline from STT to LLM processing to TTS output with sub-second response targets.",
    type: "Project Lead",
  },
  {
    year: "2023 – 2024",
    role: "Full Stack Developer",
    company: "Independent Projects",
    description:
      "Designed and shipped multiple production applications across healthcare, social impact and event technology domains. End-to-end ownership from architecture through deployment.",
    type: "Developer",
  },
  {
    year: "2022 – 2023",
    role: "Software Engineering Student",
    company: "University",
    description:
      "Studied software engineering fundamentals — algorithms, data structures, system design and computer science theory. Applied learning through hands-on projects.",
    type: "Education",
  },
];

export const skills = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Framer Motion", "Vite"],
  Backend: ["Node.js", "Express", "FastAPI", "REST APIs", "GraphQL", "WebSockets"],
  Languages: ["JavaScript", "TypeScript", "Python", "Java", "Bash"],
  Database: ["Firebase", "MongoDB", "PostgreSQL", "Redis", "Firestore"],
  "Cloud & DevOps": ["Docker", "GitHub Actions", "CI/CD", "Cloud Deploy", "Nginx", "Linux"],
  AI: ["TensorFlow.js", "AI APIs", "Speech-to-Text", "Text-to-Speech", "LLM Integration"],
  Tools: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Jira"],
  Design: ["UI/UX", "Figma", "Design Systems", "Typography", "Motion Design"],
};

export const capabilities = [
  {
    number: "01",
    title: "Web Applications",
    description: "Full-stack web applications engineered for performance, scalability and real users.",
  },
  {
    number: "02",
    title: "SaaS Platforms",
    description: "Multi-tenant platforms with auth, billing, analytics and infrastructure built to grow.",
  },
  {
    number: "03",
    title: "AI-Powered Systems",
    description: "Intelligent applications integrating LLMs, voice AI, computer vision and ML models.",
  },
  {
    number: "04",
    title: "APIs & Backend Systems",
    description: "Robust, documented REST and GraphQL APIs. Microservices and serverless architectures.",
  },
  {
    number: "05",
    title: "DevOps & Deployment",
    description: "CI/CD pipelines, containerization, cloud infrastructure and zero-downtime deployments.",
  },
  {
    number: "06",
    title: "Digital Experiences",
    description: "Motion-rich, performant interfaces where engineering meets design craft.",
  },
];

export const process = [
  {
    number: "01",
    title: "Discover",
    description: "Understand the problem space deeply. Research, question and map the landscape before writing a single line of code.",
  },
  {
    number: "02",
    title: "Architect",
    description: "Design the system. Choose the right technologies. Define data models, API contracts and component boundaries.",
  },
  {
    number: "03",
    title: "Build",
    description: "Engineer the product with intention. Write clean, testable, maintainable code. Iterate fast, refactor constantly.",
  },
  {
    number: "04",
    title: "Deploy",
    description: "Ship to production confidently. Automated pipelines, monitoring, rollback strategies and zero-downtime releases.",
  },
  {
    number: "05",
    title: "Iterate",
    description: "Measure. Observe. Improve. The best software is never finished — it evolves with its users.",
  },
];
