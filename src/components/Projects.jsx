import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ExternalLink,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  Lock,
  Sparkles,
} from "lucide-react";
import { projects } from "../data/portfolio";

/* ─── Filter categories ─────────────────────────────────── */
const FILTERS = ["All", "Real Project", "Exploration"];

/* ─── Project category mapping ─────────────────────────── */
const PROJECT_FILTER_MAP = {
  pshycolab: "Real Project",
  aira: "Real Project",
  "pshycolab-pos": "Real Project",
  maathrucare: "Real Project",
  bitez: "Real Project",
  "concert-gala": "Exploration",
};

/* ─── Gradient-based visual placeholders per project ────── */
const PROJECT_VISUALS = {
  pshycolab: {
    bg: "linear-gradient(135deg, #0d1b2a 0%, #1a3a5c 40%, #0a2440 100%)",
    accent: "#4a7bde",
    elements: [
      { type: "rect", x: 15, y: 20, w: 70, h: 8, color: "rgba(74,123,222,0.6)", r: 4 },
      { type: "rect", x: 15, y: 35, w: 50, h: 5, color: "rgba(74,123,222,0.3)", r: 3 },
      { type: "rect", x: 15, y: 48, w: 60, h: 5, color: "rgba(74,123,222,0.3)", r: 3 },
      { type: "circle", cx: 75, cy: 65, r: 20, color: "rgba(74,123,222,0.15)" },
    ],
  },
  aira: {
    bg: "linear-gradient(135deg, #0a0a18 0%, #141428 40%, #0d0d20 100%)",
    accent: "#3dbccc",
    elements: [{ type: "wave", color: "rgba(61,188,204,0.5)" }],
  },
  "pshycolab-pos": {
    bg: "linear-gradient(135deg, #091c13 0%, #113622 40%, #0c2016 100%)",
    accent: "#10b981",
    elements: [
      { type: "rect", x: 15, y: 20, w: 70, h: 8, color: "rgba(16,185,129,0.6)", r: 4 },
      { type: "rect", x: 15, y: 35, w: 45, h: 5, color: "rgba(16,185,129,0.3)", r: 3 },
      { type: "circle", cx: 75, cy: 60, r: 22, color: "rgba(16,185,129,0.15)" },
    ],
  },
  maathrucare: {
    bg: "linear-gradient(135deg, #081808 0%, #12281a 40%, #0a1c12 100%)",
    accent: "#6ab873",
    elements: [
      { type: "circle", cx: 50, cy: 50, r: 30, color: "rgba(106,184,115,0.12)" },
      { type: "circle", cx: 50, cy: 50, r: 18, color: "rgba(106,184,115,0.2)" },
    ],
  },
  bitez: {
    bg: "linear-gradient(135deg, #1a1200 0%, #2a1e00 40%, #1c1400 100%)",
    accent: "#c9a96e",
    elements: [
      { type: "rect", x: 10, y: 15, w: 80, h: 45, color: "rgba(201,169,110,0.08)", r: 8 },
      { type: "rect", x: 15, y: 25, w: 35, h: 25, color: "rgba(201,169,110,0.18)", r: 6 },
      { type: "rect", x: 55, y: 25, w: 30, h: 25, color: "rgba(201,169,110,0.18)", r: 6 },
    ],
  },
  "concert-gala": {
    bg: "linear-gradient(135deg, #100a1a 0%, #1e1230 40%, #120e22 100%)",
    accent: "#8b7fd4",
    elements: [
      { type: "circle", cx: 50, cy: 40, r: 25, color: "rgba(139,127,212,0.15)" },
      { type: "rect", x: 15, y: 70, w: 70, h: 6, color: "rgba(139,127,212,0.4)", r: 3 },
    ],
  },
};

/* ─── SVG visual placeholder ─────────────────────────────── */
const ProjectVisual = ({ slug }) => {
  const vis = PROJECT_VISUALS[slug] || PROJECT_VISUALS["pshycolab"];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: vis.bg,
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Noise texture overlay */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }}
        aria-hidden="true"
      >
        <filter id={`noise-${slug}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#noise-${slug})`} />
      </svg>

      {/* Glow orb */}
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "70%",
          background: `radial-gradient(circle, ${vis.accent}25 0%, transparent 65%)`,
          filter: "blur(30px)",
          borderRadius: "50%",
          top: "10%",
          left: "20%",
        }}
        aria-hidden="true"
      />

      {/* UI fragment SVG */}
      <svg
        viewBox="0 0 100 80"
        style={{ width: "80%", maxWidth: 320, position: "relative", zIndex: 2 }}
        aria-hidden="true"
      >
        {/* Top bar */}
        <rect x="5" y="5" width="90" height="6" rx="3" fill="rgba(255,255,255,0.06)" />
        <circle cx="10" cy="8" r="2" fill="rgba(255,80,80,0.5)" />
        <circle cx="16" cy="8" r="2" fill="rgba(255,180,0,0.5)" />
        <circle cx="22" cy="8" r="2" fill="rgba(0,200,80,0.5)" />

        {/* Content blocks */}
        <rect x="5" y="16" width="55" height="4" rx="2" fill={`${vis.accent}90`} />
        <rect x="5" y="24" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.2)" />
        <rect x="5" y="31" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />

        {/* Card or phone mock */}
        <rect x="5" y="42" width="42" height="32" rx="4" fill="rgba(255,255,255,0.06)" />
        <rect x="10" y="48" width="32" height="3" rx="1.5" fill={`${vis.accent}80`} />
        <rect x="10" y="55" width="24" height="2.5" rx="1.25" fill="rgba(255,255,255,0.2)" />
        <rect x="10" y="61" width="28" height="2.5" rx="1.25" fill="rgba(255,255,255,0.15)" />
        <rect x="10" y="67" width="18" height="4" rx="2" fill={`${vis.accent}60`} />

        {/* Right panel */}
        <rect x="52" y="42" width="43" height="14" rx="3" fill="rgba(255,255,255,0.05)" />
        <rect x="56" y="46" width="28" height="2.5" rx="1.25" fill="rgba(255,255,255,0.3)" />
        <rect x="56" y="51" width="20" height="2" rx="1" fill="rgba(255,255,255,0.15)" />

        <rect x="52" y="60" width="20" height="14" rx="3" fill={`${vis.accent}20`} />
        <rect x="75" y="60" width="20" height="14" rx="3" fill="rgba(255,255,255,0.05)" />
      </svg>

      {/* Project name watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          right: 16,
          fontFamily: "var(--font-display)",
          fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: `${vis.accent}60`,
          zIndex: 5,
        }}
        aria-hidden="true"
      >
        DEWX / {slug.replace("-", " ").toUpperCase()}
      </div>
    </div>
  );
};

/* ─── Live Card Preview Frame (for pshycolab.com, aira, pshycolab-pos) ─── */
const LiveCardPreview = ({ project }) => {
  const [interactive, setInteractive] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <div className="pw-live-card">
      {/* Top Browser Bar */}
      <div className="pw-live-bar">
        <div className="pw-live-dots">
          <span className="pw-live-dot pw-live-dot--red" />
          <span className="pw-live-dot pw-live-dot--yellow" />
          <span className="pw-live-dot pw-live-dot--green" />
        </div>

        <div className="pw-live-url">
          <Lock size={10} aria-hidden="true" />
          <span>https://{project.displayUrl}</span>
        </div>

        <div className="pw-live-actions">
          <button
            type="button"
            className={`pw-live-btn ${interactive ? "pw-live-btn--active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setInteractive(!interactive);
            }}
            title={interactive ? "Click to lock scroll" : "Click to interact with live preview"}
            aria-label="Toggle interactive live preview"
          >
            {interactive ? "Interacting" : "Interact"}
          </button>

          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pw-live-link"
            onClick={(e) => e.stopPropagation()}
            title={`Open ${project.title} live in new tab`}
            aria-label="Open live site in new tab"
          >
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Viewport Frame */}
      <div className={`pw-live-viewport ${interactive ? "pw-live-viewport--interactive" : ""}`}>
        {!iframeLoaded && (
          <div className="pw-live-skeleton">
            <div className="pw-live-spinner" />
            <span>Loading live application...</span>
          </div>
        )}

        <iframe
          src={project.liveUrl}
          title={`${project.title} Live Preview`}
          className="pw-live-iframe"
          loading="lazy"
          onLoad={() => setIframeLoaded(true)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />

        {/* Transparent glass guard when not in interactive mode to preserve page scrolling */}
        {!interactive && (
          <div
            className="pw-live-glass-guard"
            title="Click card to view details or click 'Interact' to test live app"
          />
        )}
      </div>
    </div>
  );
};

/* ─── Single project card ────────────────────────────────── */
const ProjectCard = ({ project, index, onOpen }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      className="pw-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay: (index % 2) * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(project)}
      data-cursor="project"
      data-cursor-label="VIEW"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
      aria-label={`View ${project.title} project`}
    >
      {/* Image / live preview area */}
      <div className="pw-card__image-wrap">
        {/* Status Badge */}
        <div
          className={`pw-card__badge ${project.liveUrl ? "pw-card__badge--live" : ""}`}
          aria-label={project.liveUrl ? "Live Production App" : "Real Project"}
        >
          {project.liveUrl ? (
            <>
              <span className="pw-badge-pulse" aria-hidden="true" />
              <span>LIVE PREVIEW</span>
            </>
          ) : (
            <span>REAL PROJECT</span>
          )}
        </div>

        {/* Hover arrow or direct live visit icon */}
        <div className="pw-card__header-actions">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pw-card__live-chip"
              onClick={(e) => e.stopPropagation()}
              title={`Visit live site: ${project.displayUrl}`}
              aria-label={`Visit live site: ${project.displayUrl}`}
            >
              <Globe size={12} aria-hidden="true" />
              <span>{project.displayUrl}</span>
              <ExternalLink size={11} aria-hidden="true" />
            </a>
          )}

          <motion.div
            className="pw-card__arrow"
            animate={{ opacity: hovered ? 1 : 0.8, scale: hovered ? 1 : 0.9 }}
            transition={{ duration: 0.25 }}
            aria-hidden="true"
          >
            <ArrowUpRight size={17} />
          </motion.div>
        </div>

        {/* Preview Container: Live Iframe if liveUrl, otherwise SVG visual */}
        <div className="pw-card__image">
          {project.liveUrl ? (
            <LiveCardPreview project={project} />
          ) : (
            <ProjectVisual slug={project.slug} />
          )}
        </div>
      </div>

      {/* Info below image */}
      <div className="pw-card__info">
        <div className="pw-card__title-row">
          <motion.h3
            className="pw-card__title"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.title} — {project.tagline}
          </motion.h3>
        </div>

        <div className="pw-card__tags">
          {project.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className="pw-card__tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Project Detail Modal with Live Device Sandbox ───────── */
const ProjectModal = ({ project, onClose }) => {
  const [deviceMode, setDeviceMode] = useState("desktop"); // "desktop" | "tablet" | "mobile"
  const [activeTab, setActiveTab] = useState(project?.liveUrl ? "live" : "details");
  const [iframeKey, setIframeKey] = useState(0);

  if (!project) return null;

  const deviceWidth =
    deviceMode === "mobile" ? "390px" : deviceMode === "tablet" ? "768px" : "100%";

  return (
    <motion.div
      className="project-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
    >
      <motion.div
        className="project-modal__panel"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="project-modal__header">
          <div>
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                marginBottom: "0.5rem",
              }}
            >
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  color: "var(--text-muted)",
                }}
              >
                {project.id}
              </span>
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                {project.category}
              </span>
              {project.liveUrl && (
                <span className="project-modal__live-badge">
                  <span className="pw-badge-pulse" />
                  <span>PRODUCTION DEPLOYMENT</span>
                </span>
              )}
            </div>
            <h2 className="project-modal__title">{project.title}</h2>
            <p className="project-modal__tagline">{project.tagline}</p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal__launch-btn"
                aria-label={`Open ${project.title} live in new window`}
              >
                <span>Launch Live Site</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            <button className="project-modal__close" onClick={onClose} aria-label="Close">
              ✕
            </button>
          </div>
        </div>

        {/* View Switcher Tabs (if liveUrl exists) */}
        {project.liveUrl && (
          <div className="project-modal__tabs-bar">
            <div className="project-modal__tabs">
              <button
                type="button"
                className={`project-modal__tab ${activeTab === "live" ? "project-modal__tab--active" : ""}`}
                onClick={() => setActiveTab("live")}
              >
                <Sparkles size={13} aria-hidden="true" />
                <span>Live Interactive Sandbox</span>
              </button>
              <button
                type="button"
                className={`project-modal__tab ${activeTab === "details" ? "project-modal__tab--active" : ""}`}
                onClick={() => setActiveTab("details")}
              >
                <span>Architecture & Overview</span>
              </button>
            </div>

            {activeTab === "live" && (
              <div className="project-modal__device-controls">
                <button
                  type="button"
                  className={`project-modal__device-btn ${deviceMode === "desktop" ? "project-modal__device-btn--active" : ""}`}
                  onClick={() => setDeviceMode("desktop")}
                  title="Desktop View (100%)"
                >
                  <Monitor size={14} aria-hidden="true" />
                  <span>Desktop</span>
                </button>
                <button
                  type="button"
                  className={`project-modal__device-btn ${deviceMode === "tablet" ? "project-modal__device-btn--active" : ""}`}
                  onClick={() => setDeviceMode("tablet")}
                  title="Tablet View (768px)"
                >
                  <Tablet size={14} aria-hidden="true" />
                  <span>Tablet</span>
                </button>
                <button
                  type="button"
                  className={`project-modal__device-btn ${deviceMode === "mobile" ? "project-modal__device-btn--active" : ""}`}
                  onClick={() => setDeviceMode("mobile")}
                  title="Mobile View (390px)"
                >
                  <Smartphone size={14} aria-hidden="true" />
                  <span>Mobile</span>
                </button>
                <button
                  type="button"
                  className="project-modal__reload-btn"
                  onClick={() => setIframeKey((k) => k + 1)}
                  title="Reload Live App"
                >
                  <RefreshCw size={13} aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="project-modal__body">
          {/* Live Sandbox Tab */}
          {project.liveUrl && activeTab === "live" ? (
            <div className="project-modal__sandbox-wrapper">
              <div
                className="project-modal__sandbox-frame"
                style={{ width: deviceWidth }}
              >
                <div className="project-modal__browser-bar">
                  <div className="pw-live-dots">
                    <span className="pw-live-dot pw-live-dot--red" />
                    <span className="pw-live-dot pw-live-dot--yellow" />
                    <span className="pw-live-dot pw-live-dot--green" />
                  </div>
                  <div className="project-modal__browser-address">
                    <Lock size={12} aria-hidden="true" />
                    <span>https://{project.displayUrl}</span>
                  </div>
                  <span className="project-modal__ssl-badge">SSL ENCRYPTED</span>
                </div>

                <div className="project-modal__iframe-holder">
                  <iframe
                    key={iframeKey}
                    src={project.liveUrl}
                    title={`${project.title} Sandbox`}
                    className="project-modal__iframe"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Visual preview & details */
            <div className="project-modal__visual" style={{ height: 240 }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "var(--r-lg)",
                  overflow: "hidden",
                }}
              >
                <ProjectVisual slug={project.slug} />
              </div>
            </div>
          )}

          {/* Overview & Specs */}
          <div className="project-modal__grid">
            <div>
              <h3 className="project-modal__section-title">Overview</h3>
              <p className="project-modal__desc">{project.description}</p>
            </div>
            <div className="project-modal__info-cols">
              <div>
                <h4 className="project-modal__info-label">Role</h4>
                <p className="project-modal__info-value">{project.role}</p>
              </div>
              <div>
                <h4 className="project-modal__info-label">Year</h4>
                <p className="project-modal__info-value">{project.year}</p>
              </div>
              {project.liveUrl && (
                <div>
                  <h4 className="project-modal__info-label">Live Deployment</h4>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-modal__info-link"
                  >
                    <span>{project.displayUrl}</span>
                    <ExternalLink size={12} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
            <div>
              <h4 className="project-modal__section-title">Technology Stack</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {project.technologies.map((tech) => (
                  <span key={tech} className="pw-card__tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="project-modal__footer">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-modal__footer-launch"
            >
              <span>Visit {project.displayUrl}</span>
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          <button className="btn btn--primary" onClick={onClose}>
            <span>CLOSE</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─── Main Projects Section ─────────────────────────────── */
export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true });

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return PROJECT_FILTER_MAP[p.slug] === activeFilter;
  });

  return (
    <section id="work" className="pw-section" aria-label="Selected work">
      {/* ── Header ── */}
      <div className="pw-section__header" ref={headerRef}>
        {/* Watermark */}
        <motion.div
          className="pw-watermark"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2 }}
          aria-hidden="true"
        >
          PORTFOLIO
        </motion.div>

        {/* Title */}
        <motion.h2
          className="pw-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        >
          /SELECTED WORK
        </motion.h2>
      </div>

      {/* ── Controls (filters + count) ── */}
      <div className="pw-controls">
        <div className="pw-filters" role="tablist" aria-label="Project filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`pw-filter ${activeFilter === f ? "pw-filter--active" : ""}`}
              onClick={() => setActiveFilter(f)}
              role="tab"
              aria-selected={activeFilter === f}
            >
              {f}
              {f === "All" && ` (${projects.length})`}
            </button>
          ))}
        </div>

        <span className="pw-view-all">
          <span>{filteredProjects.length} PROJECTS DISPLAYED</span>
        </span>
      </div>

      {/* ── Projects Grid ── */}
      <div className="pw-grid" role="list">
        {filteredProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onOpen={(p) => setSelectedProject(p)}
          />
        ))}
      </div>

      {/* ── Project Detail Modal ── */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
