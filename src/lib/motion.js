export const viewport = {
  once: true,
  amount: 0.28,
};

export const transition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { ...transition, delay },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport,
  transition: { ...transition, delay },
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.92, y: 18 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport,
  transition: { ...transition, delay },
});

