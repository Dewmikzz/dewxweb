// Animation utility variants and helpers for consistent motion design

export const EASING = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  snappy: [0.77, 0, 0.175, 1],
  gentle: [0.43, 0.13, 0.23, 0.96],
  elastic: [0.34, 1.56, 0.64, 1],
  cinematic: [0.76, 0, 0.24, 1],
};

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASING.smooth },
  },
};

export const clipReveal = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 0.9, ease: EASING.cinematic },
  },
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const wordReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.75, ease: EASING.cinematic },
  },
};

export const scaleIn = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.7, ease: EASING.smooth },
  },
};

export const slideLeft = {
  hidden: { x: 60, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: EASING.smooth },
  },
};

// Splits text into words wrapped in overflow-hidden spans for clip animation
export const splitWords = (text) => {
  return text.split(" ").map((word, i) => ({
    word,
    key: `${word}-${i}`,
  }));
};
