import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Code2,
  Cloud,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  Terminal,
  MapPin,
  CheckCircle2,
} from "lucide-react";

const STATEMENT_WORDS = [
  "I", "build", "digital", "systems",
  "where", "engineering", "meets", "experience."
];

/* ─── Scroll-driven word color reveal ───────────────────── */
const AnimatedStatement = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <div
      ref={ref}
      className="about-ed__statement-words"
      aria-label={STATEMENT_WORDS.join(" ")}
    >
      {STATEMENT_WORDS.map((word, i) => {
        const start = i / STATEMENT_WORDS.length;
        const end = (i + 1) / STATEMENT_WORDS.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const color = useTransform(scrollYProgress, [start, end], ["rgba(250,249,246,0.22)", "#faf9f6"]);
        return (
          <motion.span
            key={i}
            style={{ color, display: "inline-block" }}
            aria-hidden="true"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ─── Core Technical Domains ────────────────────────────── */
const DOMAINS = [
  {
    title: "Full Stack Development",
    desc: "Crafting fluid reactive interfaces backed by resilient Node/Next.js architectures and optimized SQL queries.",
    spec: "React 19 · Next.js · Node.js · TypeScript · REST/GraphQL",
    tag: "End-to-End",
    icon: Code2,
    accent: "#3dbccc",
  },
  {
    title: "DevOps & Cloud Systems",
    desc: "Automating multi-stage CI/CD pipelines, container orchestration, and zero-downtime rolling updates.",
    spec: "Docker · Kubernetes · AWS Cloud · Linux · GitHub Actions",
    tag: "Automation",
    icon: Cloud,
    accent: "#4a7bde",
  },
  {
    title: "AI-Assisted Engineering",
    desc: "Integrating LLM architectures, intelligent agent workflows, vector search, and Python backend services.",
    spec: "LLM Integrations · Intelligent Agents · Python · RAG · LangChain",
    tag: "Modern Tech",
    icon: Cpu,
    accent: "#c9a96e",
  },
  {
    title: "System Architecture",
    desc: "Designing modular microservices, asynchronous message queues, and high-concurrency data caching.",
    spec: "Scalable Microservices · Distributed DBs · Redis · Event-Driven",
    tag: "Resilient",
    icon: Layers,
    accent: "#8b7fd4",
  },
  {
    title: "UI/UX & Design Systems",
    desc: "Translating complex functional requirements into accessible, micro-animated design systems.",
    spec: "Figma · Design Tokens · Fluid Motion · Accessibility · WCAG",
    tag: "Pixel-Perfect",
    icon: Sparkles,
    accent: "#3dbccc",
  },
  {
    title: "Performance & Security",
    desc: "Enforcing enterprise security policies, OWASP compliance, and sub-100ms Core Web Vitals targets.",
    spec: "Core Web Vitals · Auth Protocols · Sub-100ms Latency · Edge CDN",
    tag: "Optimized",
    icon: ShieldCheck,
    accent: "#10b981",
  },
];

/* ─── Metric Highlights ──────────────────────────────────── */
const METRICS = [
  { value: "04+", label: "Years Experience" },
  { value: "25+", label: "Projects Shipped" },
  { value: "99.9%", label: "Reliability Focus" },
];

/* ─── Single Bento Card with Scroll & Hover Physics ──────── */
const BentoCard = ({ domain, index }) => {
  const Icon = domain.icon;
  return (
    <motion.div
      className="about-ed__bento-card"
      style={{ "--card-accent": domain.accent }}
      initial={{ opacity: 0, y: 48, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.1,
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      <div className="about-ed__bento-card-top">
        <motion.div
          className="about-ed__bento-icon-wrap"
          whileHover={{ rotate: 10, scale: 1.12 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Icon size={18} aria-hidden="true" />
        </motion.div>
        <span className="about-ed__bento-tag">{domain.tag}</span>
      </div>

      <div className="about-ed__bento-card-body">
        <h4 className="about-ed__bento-name">{domain.title}</h4>
        <p className="about-ed__bento-desc">{domain.desc}</p>
        <p className="about-ed__bento-spec">{domain.spec}</p>
      </div>
    </motion.div>
  );
};

export const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });

  const handleScrollTo = (selector) => {
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.scrollTo(selector, { duration: 1.2, offset: -40 });
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="about-ed" ref={sectionRef} aria-label="About DewX">
      {/* ── Atmospheric Glow ── */}
      <div className="about-ed__atmosphere" aria-hidden="true">
        <div className="about-ed__orb-1" />
        <div className="about-ed__orb-2" />
      </div>

      <div className="about-ed__container">
        {/* ── 1. Opening Statement Banner ── */}
        <motion.div
          className="about-ed__statement-wrap"
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="about-ed__statement-eyebrow">
            <span className="about-ed__statement-dot" aria-hidden="true" />
            <span>01 · Statement & Philosophy</span>
          </div>
          <AnimatedStatement />
        </motion.div>

        {/* ── 2. Section Header ── */}
        <motion.div
          className="about-ed__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <div className="about-ed__tag-bar">
            <span className="about-ed__eyebrow">02 · About Me</span>
            <div className="about-ed__pill-badge">
              <span className="about-ed__pill-dot" aria-hidden="true" />
              <span>Available for Select Projects</span>
            </div>
          </div>

          <h2 className="about-ed__title">
            <span className="about-ed__title-outline">ENGINEERING</span>
            <span className="about-ed__title-solid">WITH INTENTION.</span>
          </h2>
          <p className="about-ed__descriptor">/ DISCIPLINE · SCALABILITY · PRECISION</p>
        </motion.div>

        {/* ── 3. Part 1: Balanced Story & Developer Passport Row with Scroll Transitions ── */}
        <div className="about-ed__upper-row">
          {/* Narrative Storytelling Column */}
          <motion.div
            className="about-ed__narrative-col"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="about-ed__narrative-card"
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              <div className="about-ed__card-corner-tag">02.1 // ARCHITECTURAL MANIFESTO</div>
              <h3 className="about-ed__lead-text">
                Operating at the convergence of <span className="about-ed__lead-highlight">software engineering</span>, modern cloud infrastructure, and human experience — designing scalable digital architectures built to endure.
              </h3>
              <p className="about-ed__paragraph">
                I'm Dewmika Anusara (DewX) — a software engineer, product builder, and digital architect who approaches development with uncompromising craft. I design and build production-grade web platforms that solve real operational bottlenecks.
              </p>
              <p className="about-ed__paragraph">
                My work spans enterprise SaaS applications, intelligent AI workflows, automated cloud deployments, and polished design systems. I obsess over clean maintainable architecture, sub-second response times, and building digital tools people love to use.
              </p>

              {/* Action Buttons Strip */}
              <div className="about-ed__action-strip">
                <a
                  href="https://wa.me/94763107113?text=Hi%20Dewmika%2C%20I%20saw%20your%20portfolio%20and%20want%20to%20collaborate%20with%20you%20on%20a%20project%21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-ed__btn-primary"
                  aria-label="Let's collaborate on WhatsApp"
                >
                  <span>Let's collaborate</span>
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>

                <button
                  type="button"
                  className="about-ed__btn-secondary"
                  onClick={() => handleScrollTo("#work")}
                  aria-label="Explore Selected Work"
                >
                  <span>Explore Selected Work</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Developer Passport Card (Equal Height & Content Density with Scroll Transition) */}
          <motion.div
            className="about-ed__passport-col"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          >
            <motion.div
              className="about-ed__passport-card"
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
            >
              {/* Card Header Bar */}
              <div className="about-ed__passport-top">
                <div className="about-ed__passport-brand">
                  <span className="about-ed__passport-tag">DEWX CODE</span>
                  <span className="about-ed__passport-v">v2.6</span>
                </div>
                <div className="about-ed__card-status">
                  <span className="about-ed__card-status-dot" aria-hidden="true" />
                  <span>Verified Engineer</span>
                </div>
              </div>

              {/* Passport Bio & Portrait Row */}
              <div className="about-ed__passport-body">
                <div className="about-ed__portrait-frame">
                  <img
                    src="/images/dew_portrait.png"
                    alt="Dewmika Anusara - Software Engineer"
                    className="about-ed__portrait-img"
                    loading="lazy"
                  />
                  <div className="about-ed__portrait-glow" aria-hidden="true" />
                </div>

                <div className="about-ed__passport-details">
                  <h4 className="about-ed__passport-name">Dewmika Anusara</h4>
                  <p className="about-ed__passport-role">Full Stack & DevOps Engineer</p>

                  <div className="about-ed__passport-location">
                    <MapPin size={13} aria-hidden="true" />
                    <span>Colombo, Sri Lanka · Remote Worldwide</span>
                  </div>

                  <div className="about-ed__passport-availability">
                    <CheckCircle2 size={13} aria-hidden="true" />
                    <span>Available for High-Impact Contracts</span>
                  </div>
                </div>
              </div>

              {/* Embedded Metrics Matrix with Staggered Scroll Animation */}
              <div className="about-ed__passport-stats" role="list" aria-label="Key engineering metrics">
                {METRICS.map((m, i) => (
                  <motion.div
                    key={i}
                    className="about-ed__passport-stat-box"
                    role="listitem"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 + i * 0.08 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  >
                    <div className="about-ed__stat-number">{m.value}</div>
                    <div className="about-ed__stat-label">{m.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ── 4. Part 2: Full-Width 3-Column Bento Grid of Engineering Disciplines ── */}
        <motion.div
          className="about-ed__bento-section"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subheading row */}
          <div className="about-ed__bento-header">
            <div className="about-ed__bento-title">
              <Terminal size={15} aria-hidden="true" />
              <span>CORE COMPETENCIES & ENGINEERING DISCIPLINES</span>
            </div>
            <span className="about-ed__bento-counter">[ 06 DISCIPLINES DEPLOYED ]</span>
          </div>

          {/* Panoramic 3-Column Grid with Scroll Transitions */}
          <div className="about-ed__panoramic-grid">
            {DOMAINS.map((domain, idx) => (
              <BentoCard key={domain.title} domain={domain} index={idx} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
