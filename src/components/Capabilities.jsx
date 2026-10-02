import React, { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

/* ─── Services Data with Descriptions & Custom Mockups ─────── */
const SERVICES = [
  {
    id: "01",
    title: "UIUX DESIGN",
    slug: "uiux",
    description: "Designing clear and scalable interfaces for dashboards, mobile apps, and websites.",
    image: "/services/uiux.jpg",
    tags: ["Mobile Apps", "Design Systems", "Figma", "Prototyping"],
  },
  {
    id: "02",
    title: "WEB DESIGN & DEV",
    slug: "webdev",
    description: "Engineering modern, high-performance web applications with clean animations and accessible architecture.",
    image: "/services/webdev.jpg",
    tags: ["React", "Next.js", "TypeScript", "Tailwind / Vanilla CSS"],
  },
  {
    id: "03",
    title: "AI INTELLIGENCE & SAAS",
    slug: "ai",
    description: "Integrating intelligent conversational agents, real-time voice pipelines, and scalable cloud APIs.",
    image: "/services/ai.jpg",
    tags: ["FastAPI", "TensorFlow", "Voice AI", "Cloud Systems"],
  },
  {
    id: "04",
    title: "DEVOPS & CLOUD",
    slug: "devops",
    description: "Configuring robust CI/CD deployment pipelines, containerized clusters, and production monitoring.",
    image: "/services/devops.jpg",
    tags: ["Docker", "Kubernetes", "GitHub Actions", "Nginx"],
  },
  {
    id: "05",
    title: "BRANDING",
    slug: "branding",
    description: "Crafting distinctive digital identities, typography systems, and cohesive brand guidelines.",
    image: "/services/branding.jpg",
    tags: ["Visual Identity", "Typography", "Styleguides", "Brand Voice"],
  },
];

/* ─── Service Row Item Component ───────────────────────────── */
const ServiceRow = ({ service, index, isActive, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`srv-row-container ${isActive ? "srv-row--is-active" : ""}`}
      onMouseEnter={() => {
        setHovered(true);
        onSelect(index);
      }}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(isActive ? -1 : index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onSelect(isActive ? -1 : index);
        }
      }}
      aria-expanded={isActive}
      aria-label={`${service.title}: ${service.description}`}
    >
      <AnimatePresence mode="wait">
        {isActive ? (
          /* ── EXPANDED DARK CARD STATE (MATCHES SCREENSHOT) ── */
          <motion.div
            key="active-card"
            className="srv-active-card"
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Left Content */}
            <div className="srv-active-card__left">
              <h3 className="srv-active-card__title">{service.title}</h3>
              <p className="srv-active-card__desc">{service.description}</p>
            </div>

            {/* Overlapping Floating Preview Mockup */}
            <div className="srv-active-card__preview-wrap">
              <motion.div
                className="srv-active-card__preview"
                initial={{ opacity: 0, y: 20, rotate: -2, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, rotate: -4.5, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <img
                  src={service.image}
                  alt={`${service.title} preview mockup`}
                  className="srv-preview-img"
                  loading="lazy"
                />

                {/* Hand cursor pointer overlay like reference image */}
                <div className="srv-preview-cursor" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8.5 3.5C8.5 2.67 9.17 2 10 2C10.83 2 11.5 2.67 11.5 3.5V11H12.5C13.33 11 14 11.67 14 12.5V13.5C14 13.78 14.22 14 14.5 14C15.33 14 16 14.67 16 15.5V17C16 19.76 13.76 22 11 22C8.24 22 6 19.76 6 17V12.5C6 11.67 6.67 11 7.5 11C7.78 11 8 10.78 8 10.5V3.5C8 2.67 8.5 3.5 8.5 3.5Z"
                      fill="#ffffff"
                      stroke="#111111"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </motion.div>
            </div>

            {/* Right Action Button (Close / Collapse Icon) */}
            <div className="srv-active-card__action">
              <button
                type="button"
                className="srv-action-btn"
                aria-label="Close details"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(-1);
                }}
              >
                <X size={22} className="srv-close-icon" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* ── IDLE / COLLAPSED ROW (MATCHES SCREENSHOT) ── */
          <motion.div
            key="idle-row"
            className="srv-idle-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <span className="srv-idle-row__title">{service.title}</span>
            <div className="srv-idle-row__arrow">
              <ArrowUpRight size={26} aria-hidden="true" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Main Services / Capabilities Component ────────────────── */
export const Capabilities = () => {
  // Default to index 0 ("UIUX DESIGN") active, just like the reference screenshot!
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-10%" });

  return (
    <section id="services" className="srv-section" aria-label="Services and capabilities">
      <div className="srv-container">
        {/* ── Section Header with Giant Watermark ── */}
        <div className="srv-header" ref={headerRef}>
          {/* Faded Background Watermark */}
          <motion.div
            className="srv-watermark"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2 }}
            aria-hidden="true"
          >
            SERVICE
          </motion.div>

          {/* Heading */}
          <motion.h2
            className="srv-title"
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            /SERVICE
          </motion.h2>
        </div>

        {/* ── Interactive Services List ── */}
        <div className="srv-list" role="list">
          {SERVICES.map((service, index) => (
            <ServiceRow
              key={service.slug}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onSelect={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
