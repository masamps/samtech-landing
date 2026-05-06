export const viewport = {
  once: true,
  amount: 0.18,
  margin: "0px 0px -8% 0px",
};

export const transition = {
  duration: 0.56,
  ease: [0.22, 1, 0.36, 1],
};

const safeDelay = (delay = 0) => Math.min(delay, 0.18);

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0.001, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: { ...transition, delay: safeDelay(delay) },
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0.001 },
  whileInView: { opacity: 1 },
  viewport,
  transition: { ...transition, delay: safeDelay(delay) },
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0.001, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport,
  transition: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1],
    delay: safeDelay(delay),
  },
});
