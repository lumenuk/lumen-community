export const easeEditorial = [0.22, 1, 0.36, 1] as const;

export const motionTokens = {
  duration: {
    fast: 0.2,
    base: 0.45,
    slow: 0.6,
  },
  ease: easeEditorial,
  reveal: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  },
  stagger: 0.08,
};
