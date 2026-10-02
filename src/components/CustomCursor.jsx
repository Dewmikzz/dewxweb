import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

/**
 * CustomCursor: Magnetic cursor with difference blend mode.
 * Perfectly visible on black, ivory, dark, and light backgrounds.
 */
export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [cursorState, setCursorState] = useState("default"); // default | hover | project
  const [label, setLabel] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { stiffness: 450, damping: 32 };
  const mouseX = useSpring(-100, springConfig);
  const mouseY = useSpring(-100, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) return;

    const move = (e) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleEnter = (e) => {
      const el = e.target.closest?.("[data-cursor='project'], a, button, [data-cursor='hover'], label, input, textarea");
      if (!el) {
        setCursorState("default");
        setLabel("");
        return;
      }

      if (el.matches("[data-cursor='project']")) {
        setCursorState("project");
        setLabel(el.dataset.cursorLabel || "VIEW");
      } else {
        setCursorState("hover");
        setLabel("");
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleEnter);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleEnter);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [mouseX, mouseY, isVisible]);

  // Hide on touch devices
  if (typeof window !== "undefined" && (window.matchMedia?.("(pointer: coarse)").matches || "ontouchstart" in window)) {
    return null;
  }

  const isHover = cursorState === "hover";
  const isProject = cursorState === "project";

  return (
    <motion.div
      ref={cursorRef}
      style={{
        x: mouseX,
        y: mouseY,
        opacity: isVisible ? 1 : 0,
      }}
      className="custom-cursor"
      animate={{
        width: isProject ? 84 : isHover ? 44 : 10,
        height: isProject ? 84 : isHover ? 44 : 10,
        backgroundColor: isProject ? "#ffffff" : isHover ? "rgba(255, 255, 255, 0.15)" : "#ffffff",
        border: isHover ? "1.5px solid #ffffff" : isProject ? "1px solid rgba(255, 255, 255, 0.4)" : "none",
        scale: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      aria-hidden="true"
    >
      {isProject && (
        <motion.span
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          className="cursor-label"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
};

