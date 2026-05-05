import { animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ImpactCounter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        const controls = animate(0, value, {
          duration: 1.6,
          ease: [0.22, 1, 0.36, 1],
          onUpdate: (latest) => setCount(Math.round(latest)),
        });

        observer.disconnect();

        return () => controls.stop();
      },
      { threshold: 0.6 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

