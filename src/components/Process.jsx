import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { process } from "../data/portfolio";

const ProcessStep = ({ item, index, total }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <motion.article
      ref={ref}
      className="process__step"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
      aria-label={`Step ${item.number}: ${item.title}`}
    >
      <div className="process__step-num">{item.number}</div>
      <h3 className="process__step-title">{item.title}</h3>
      <p className="process__step-desc">{item.description}</p>
    </motion.article>
  );
};

export const Process = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <section ref={sectionRef} className="section process" aria-label="My process">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="section-eyebrow">07 · Process</div>
          <h2 className="section-title">
            HOW I<br />
            <span className="outline-text">WORK.</span>
          </h2>
        </motion.div>

        <div className="process__steps" role="list">
          {process.map((item, index) => (
            <ProcessStep key={item.number} item={item} index={index} total={process.length} />
          ))}
        </div>
      </div>
    </section>
  );
};
