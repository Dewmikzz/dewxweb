import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Cloud,
  Cpu,
  Terminal,
  Sparkles,
  ShieldCheck,
  ArrowUpRight,
  Activity,
  Copy,
  Check,
  CheckCircle2,
} from "lucide-react";

/**
 * BrandMoment: Redesigned high-impact DEWX Architectural Signature & Engineering Matrix.
 * Elevates "D E W X" and "Dewmika Anusara · Full Stack Developer · DevOps Engineer · Software Engineer"
 * from an empty text placeholder into a rich, cinematic, interactive digital monument.
 */

const PILLARS = [
  {
    letter: "D",
    superTitle: "01 // DOMAIN & DESIGN",
    title: "Digital Experiences",
    description:
      "Crafting intuitive, accessible, and reactive frontend architectures with sub-frame fluid interactions and design-system rigor.",
    techStack: ["React 19", "Next.js", "Tailwind CSS", "Framer Motion"],
    accent: "#0284c7", // Sky Blue / Cyan
    outline: false,
    stat: "60 FPS UI",
  },
  {
    letter: "E",
    superTitle: "02 // ENTERPRISE CORE",
    title: "Engineering Architecture",
    description:
      "Architecting resilient, type-safe full-stack backbones that handle complex business workflows and high-concurrency data streams.",
    techStack: ["TypeScript", "Node.js", "PostgreSQL", "REST & GraphQL"],
    accent: "#b48325", // Warm Gold
    outline: true,
    stat: "Type-Safe",
  },
  {
    letter: "W",
    superTitle: "03 // CLOUD INFRASTRUCTURE",
    title: "Workflow & DevOps",
    description:
      "Automating zero-downtime deployment pipelines, container orchestration, and real-time infrastructure observability.",
    techStack: ["Docker", "Kubernetes", "AWS Cloud", "GitHub CI/CD"],
    accent: "#2563eb", // Royal Electric Blue
    outline: false,
    stat: "99.98% Uptime",
  },
  {
    letter: "X",
    superTitle: "04 // FORCE MULTIPLIER",
    title: "X-Factor Scalability",
    description:
      "Optimizing edge caching, distributed caching systems, algorithmic latency, and accelerating product development velocity.",
    techStack: ["Redis", "Microservices", "Edge Functions", "Security"],
    accent: "#7c3aed", // Rich Violet
    outline: true,
    stat: "< 50ms Latency",
  },
];

const DISCIPLINES = [
  {
    id: "fullstack",
    icon: Code2,
    role: "Full Stack Developer",
    badge: "FRONTEND & BACKEND CRAFT",
    highlight: "End-to-End Cohesion",
    description:
      "Seamlessly uniting pixel-perfect reactive client applications with robust, scalable server runtimes and normalized databases.",
    tags: ["React / Next.js", "Node.js / Express", "PostgreSQL", "REST APIs"],
  },
  {
    id: "devops",
    icon: Cloud,
    role: "DevOps Engineer",
    badge: "CLOUD & INFRASTRUCTURE",
    highlight: "Autonomous Reliability",
    description:
      "Designing automated CI/CD deployment pipelines, containerized microservices, cloud security policies, and zero-downtime rollouts.",
    tags: ["Docker & K8s", "AWS Cloud", "GitHub Actions", "Terraform"],
  },
  {
    id: "software",
    icon: Cpu,
    role: "Software Engineer",
    badge: "SYSTEMS & SCALABILITY",
    highlight: "Clean Architectural Patterns",
    description:
      "Engineering modular, maintainable, and fault-tolerant software systems with deep focus on algorithmic efficiency and data integrity.",
    tags: ["TypeScript", "System Design", "Microservices", "Redis Caching"],
  },
];

const DEV_CONFIG = `{
  "engineer": "Dewmika Anusara",
  "alias": "DewX",
  "core_disciplines": [
    "Full Stack Development",
    "DevOps & Infrastructure",
    "Software Engineering"
  ],
  "architecture_philosophy": "Zero compromise on craft, velocity & reliability",
  "deployment_readiness": "PRODUCTION_GRADE_VERIFIED"
}`;

export const BrandMoment = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [activeLetter, setActiveLetter] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(DEV_CONFIG);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleScrollTo = (selector) => {
    if (typeof window !== "undefined" && window.lenis) {
      window.lenis.scrollTo(selector, { duration: 1.2, offset: -40 });
    } else {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="brand-moment-redesign"
      aria-label="DewX Architectural Identity and Brand Signature"
      id="brand-signature"
    >
      {/* ── Ambient Background Lighting Orbs ── */}
      <div className="bm-ambient" aria-hidden="true">
        <div className="bm-ambient__orb bm-ambient__orb--1" />
        <div className="bm-ambient__orb bm-ambient__orb--2" />
        <div className="bm-ambient__grid-lines" />
      </div>

      <div className="bm-container">
        {/* ── 1. Top Section HUD & Telemetry ── */}
        <motion.div
          className="bm-hud-header"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="bm-hud-badge">
            <span className="bm-hud-pulse" aria-hidden="true" />
            <span className="bm-hud-code">DEWX // SYSTEM PROTOCOL v4.2</span>
          </div>

          <div className="bm-hud-telemetry" aria-label="System status">
            <span className="bm-hud-metric">
              <Activity size={12} className="bm-hud-icon" aria-hidden="true" />
              STATUS: <strong className="bm-hud-accent">ONLINE</strong>
            </span>
            <span className="bm-hud-separator">/</span>
            <span className="bm-hud-metric">
              PING: <strong className="bm-hud-accent">18MS</strong>
            </span>
            <span className="bm-hud-separator">/</span>
            <span className="bm-hud-metric">
              SYSTEM INTEGRITY: <strong className="bm-hud-accent">100%</strong>
            </span>
          </div>
        </motion.div>

        {/* ── 2. Section Header Title ── */}
        <motion.div
          className="bm-title-group"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          <div className="bm-eyebrow">
            <Sparkles size={14} aria-hidden="true" />
            <span>ARCHITECTURAL SIGNATURE</span>
          </div>
          <h2 className="bm-heading">
            Engineering Precision. <span className="bm-heading-gradient">Product Intuition.</span>
          </h2>
          <p className="bm-subtext">
            Four core dimensions unifying design-led development, enterprise code, cloud DevOps, and exponential scalability.
          </p>
        </motion.div>

        {/* ── 3. The 4-Letter DEWX Monolith Cards ── */}
        <div className="bm-letters-grid" role="list" aria-label="D E W X Architectural Pillars">
          {PILLARS.map((pillar, idx) => {
            const isHovered = activeLetter === pillar.letter;
            return (
              <motion.div
                key={pillar.letter}
                className={`bm-letter-card ${pillar.outline ? "bm-letter-card--outline" : ""} ${
                  isHovered ? "bm-letter-card--active" : ""
                }`}
                onMouseEnter={() => setActiveLetter(pillar.letter)}
                onMouseLeave={() => setActiveLetter(null)}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.15 + idx * 0.09,
                }}
                role="listitem"
                style={{
                  "--pillar-accent": pillar.accent,
                }}
              >
                {/* Monolith Corner Accents */}
                <div className="bm-card-crosshair bm-card-crosshair--tl" aria-hidden="true">+</div>
                <div className="bm-card-crosshair bm-card-crosshair--tr" aria-hidden="true">+</div>
                <div className="bm-card-crosshair bm-card-crosshair--bl" aria-hidden="true">+</div>
                <div className="bm-card-crosshair bm-card-crosshair--br" aria-hidden="true">+</div>

                {/* Top meta row */}
                <div className="bm-card-meta">
                  <span className="bm-card-super">{pillar.superTitle}</span>
                  <span className="bm-card-stat">{pillar.stat}</span>
                </div>

                {/* Giant Kinetic Letter Display */}
                <div className="bm-glyph-wrapper">
                  <span className={`bm-glyph ${pillar.outline ? "bm-glyph--outline" : "bm-glyph--solid"}`}>
                    {pillar.letter}
                  </span>
                  <div className="bm-glyph-backdrop" aria-hidden="true">
                    {pillar.letter}
                  </div>
                </div>

                {/* Card Content & Meaning */}
                <div className="bm-card-content">
                  <h3 className="bm-card-title">{pillar.title}</h3>
                  <p className="bm-card-desc">{pillar.description}</p>

                  {/* Tech stack badges */}
                  <div className="bm-card-tags">
                    {pillar.techStack.map((tech) => (
                      <span key={tech} className="bm-card-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── 4. The Iconic Signature Capsule (Dewmika Anusara + 3 Disciplines) ── */}
        <motion.div
          className="bm-signature-capsule"
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.5 }}
        >
          {/* Main Identity Banner */}
          <div className="bm-signature-banner">
            <div className="bm-signature-avatar">
              <span className="bm-avatar-initials">DA</span>
              <span className="bm-avatar-ring" aria-hidden="true" />
            </div>

            <div className="bm-signature-identity">
              <div className="bm-signature-row">
                <h3 className="bm-signature-name">Dewmika Anusara</h3>
                <span className="bm-verified-badge" title="Verified Engineering Signature">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>DEWX VERIFIED</span>
                </span>
              </div>

              {/* The quoted core headline highlighted with high craft */}
              <p className="bm-signature-lead-disciplines">
                <span className="bm-lead-role bm-lead-role--1">Full Stack Developer</span>
                <span className="bm-lead-dot">·</span>
                <span className="bm-lead-role bm-lead-role--2">DevOps Engineer</span>
                <span className="bm-lead-dot">·</span>
                <span className="bm-lead-role bm-lead-role--3">Software Engineer</span>
              </p>
            </div>

            {/* Quick action trigger — direct WhatsApp */}
            <a
              href="https://wa.me/94763107113?text=Hi%20Dewmika%2C%20I%27m%20ready%20to%20build%20something%20with%20you.%20Can%20we%20discuss%20project%20scope%20and%20timeline%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="bm-signature-cta"
              aria-label="Connect with Dewmika on WhatsApp"
            >
              <span>Let's Build</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>

          {/* ── 5. The 3 Core Disciplines Interactive Bento ── */}
          <div className="bm-disciplines-row" role="list" aria-label="Core Engineering Disciplines">
            {DISCIPLINES.map((disc) => {
              const Icon = disc.icon;
              return (
                <div key={disc.id} className="bm-discipline-card" role="listitem">
                  <div className="bm-discipline-header">
                    <div className="bm-discipline-icon-box">
                      <Icon size={18} aria-hidden="true" />
                    </div>
                    <span className="bm-discipline-badge">{disc.badge}</span>
                  </div>

                  <h4 className="bm-discipline-title">{disc.role}</h4>
                  <div className="bm-discipline-highlight">{disc.highlight}</div>
                  <p className="bm-discipline-desc">{disc.description}</p>

                  <div className="bm-discipline-tags">
                    {disc.tags.map((tag) => (
                      <span key={tag} className="bm-discipline-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── 6. Interactive Developer Console & Architecture Hub ── */}
        <motion.div
          className="bm-bottom-matrix"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
        >
          {/* Left: Interactive Dev Console */}
          <div className="bm-console-card">
            <div className="bm-console-topbar">
              <div className="bm-console-dots">
                <span className="bm-console-dot bm-console-dot--red" />
                <span className="bm-console-dot bm-console-dot--yellow" />
                <span className="bm-console-dot bm-console-dot--green" />
              </div>
              <div className="bm-console-filename">
                <Terminal size={12} aria-hidden="true" />
                <span>dewx-identity-spec.json</span>
              </div>
              <button
                type="button"
                className="bm-console-copy-btn"
                onClick={handleCopyConfig}
                aria-label="Copy developer identity configuration"
              >
                {copied ? (
                  <>
                    <Check size={13} aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} aria-hidden="true" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bm-console-body">
              <code>
                <span className="bm-syn-bracket">&#123;</span>
                {"\n"}  <span className="bm-syn-key">"engineer"</span>:{" "}
                <span className="bm-syn-val">"Dewmika Anusara"</span>,
                {"\n"}  <span className="bm-syn-key">"alias"</span>:{" "}
                <span className="bm-syn-val">"DewX"</span>,
                {"\n"}  <span className="bm-syn-key">"disciplines"</span>: [
                {"\n"}    <span className="bm-syn-val">"Full Stack Developer"</span>,
                {"\n"}    <span className="bm-syn-val">"DevOps Engineer"</span>,
                {"\n"}    <span className="bm-syn-val">"Software Engineer"</span>
                {"\n"}  ],
                {"\n"}  <span className="bm-syn-key">"architecture"</span>:{" "}
                <span className="bm-syn-val">"Zero compromise on craft & speed"</span>,
                {"\n"}  <span className="bm-syn-key">"availability"</span>:{" "}
                <span className="bm-syn-highlight">"READY_FOR_PRODUCTION"</span>
                {"\n"}
                <span className="bm-syn-bracket">&#125;</span>
              </code>
            </pre>
          </div>

          {/* Right: Architectural Mission Card */}
          <div className="bm-mission-card">
            <div className="bm-mission-header">
              <div className="bm-mission-pill">
                <ShieldCheck size={14} aria-hidden="true" />
                <span>ENGINEERING PHILOSOPHY</span>
              </div>
              <span className="bm-mission-number">03 / 03</span>
            </div>

            <h4 className="bm-mission-title">
              Crafting software that doesn't just work — but endures under real-world load.
            </h4>
            <p className="bm-mission-desc">
              Whether building customer-facing digital platforms with sub-second response times or configuring Kubernetes clusters with zero-downtime rolling updates, every line of code is treated as an architectural commitment.
            </p>

            <div className="bm-mission-actions">
              <button
                type="button"
                className="bm-mission-primary-btn"
                onClick={() => handleScrollTo("#work")}
                aria-label="Explore Selected Work"
              >
                <span>Explore Selected Work [05]</span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </button>

              <a
                href="https://wa.me/94763107113?text=Hi%20Dewmika%2C%20I%20have%20a%20project%20in%20mind%20and%20would%20like%20to%20start%20a%20discussion%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="bm-mission-secondary-btn"
                aria-label="Start a Project on WhatsApp"
              >
                <span>Start a Project</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
