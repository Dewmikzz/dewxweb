import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const DEFAULT_TEXT = "FULL STACK DEVELOPER • SOFTWARE ENGINEER • DEVOPS ENGINEER • LEAD DEVELOPER • DEWX • ";

export const Marquee = ({ direction = -1, text = DEFAULT_TEXT, gold = false }) => {
  const { scrollYProgress } = useScroll();

  const velocity = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 120 * direction]),
    { stiffness: 80, damping: 25 }
  );

  const x = useTransform(velocity, [-120, 120], ["-3%", "3%"]);
  const repeated = Array(8).fill(text).join("");

  return (
    <div className="marquee" aria-hidden="true">
      <motion.div
        className="marquee__track"
        animate={{ x: direction === -1 ? [0, "-50%"] : ["-50%", 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ x }}
      >
        <span className={`marquee__text${gold ? " marquee__text--gold" : ""}`}>{repeated}</span>
        <span className={`marquee__text${gold ? " marquee__text--gold" : ""}`}>{repeated}</span>
      </motion.div>
    </div>
  );
};
