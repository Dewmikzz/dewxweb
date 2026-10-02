import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "../data/portfolio";

const ExperienceItem = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.article
      ref={ref}
      className="experience__item"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
      aria-label={`${item.role} at ${item.company}`}
      role="listitem"
    >
      <div className="experience__node" aria-hidden="true">
        <motion.div
          className="experience__dot"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
        />
        <div className="experience__line" />
      </div>

      <div className="experience__content">
        <div className="experience__meta">
          <span className="experience__year">{item.year}</span>
          <span className="experience__type">{item.type}</span>
        </div>
        <h3 className="experience__role">{item.role}</h3>
        <p className="experience__company">{item.company}</p>
        <p className="experience__desc">{item.description}</p>
      </div>
    </motion.article>
  );
};

export const Experience = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="section experience" aria-label="Work experience">
      {/* Atmosphere */}
      <div className="experience__atmosphere" aria-hidden="true">
        <div className="experience__atm-orb experience__atm-orb--1" />
      </div>

      <div className="container" style={{ position: "relative", zIndex: 5 }}>
        <motion.div
          ref={headerRef}
          style={{ marginBottom: "clamp(3rem,6vw,6rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="section-eyebrow" style={{ color: "rgba(250,249,246,0.3)" }}>
            04 · Experience
          </div>
          <h2 className="section-title" style={{ color: "var(--bg-ivory)" }}>
            THE
            <br />
            <span style={{ WebkitTextStroke: "1.5px rgba(250,249,246,0.3)", color: "transparent" }}>
              JOURNEY.
            </span>
          </h2>
        </motion.div>

        <div className="experience__timeline" role="list">
          {experience.map((item, index) => (
            <ExperienceItem key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
