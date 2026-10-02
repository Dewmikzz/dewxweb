import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll: High-performance Lenis smooth scrolling.
 * Configured with responsive lerp, zero touch lag, and clean RAF cycle.
 */
export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    // On touch devices, native momentum scrolling is hardware-accelerated.
    // We let desktop enjoy buttery smooth interpolation while mobile stays snappy.
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      syncTouch: false,
      autoResize: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
export default SmoothScroll;

