import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "../data/portfolio";

const SkillCategory = ({ category, items, index, activeCategory, onHover }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const isFaded = activeCategory && activeCategory !== category;

  return (
    <motion.div
      ref={ref}
      className="skills__category"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: isFaded ? 0.18 : 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.07 }}
      onMouseEnter={() => onHover(category)}
      onMouseLeave={() => onHover(null)}
      role="group"
      aria-label={`${category} technologies`}
    >
      <h3 className="skills__category-label">{category}</h3>
      <div className="skills__items">
        {items.map((tech, i) => (
          <motion.span
            key={tech}
            className="skills__item"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.06 + i * 0.04, duration: 0.4 }}
            whileHover={{ y: -3, scale: 1.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="stack" className="section skills" aria-label="Technology stack">
      <div className="container">
        <motion.div
          ref={headerRef}
          style={{ marginBottom: "clamp(3rem,6vw,6rem)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="section-eyebrow">05 · Technology</div>
          <h2 className="section-title">
            THE
            <br />
            <span className="outline-text">STACK.</span>
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-mid)", marginTop: "1rem", maxWidth: "400px" }}>
            Hover a category to focus. Every tool chosen with intention.
          </p>
        </motion.div>

        <div className="skills__grid" role="list">
          {Object.entries(skills).map(([category, items], index) => (
            <SkillCategory
              key={category}
              category={category}
              items={items}
              index={index}
              activeCategory={activeCategory}
              onHover={setActiveCategory}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
