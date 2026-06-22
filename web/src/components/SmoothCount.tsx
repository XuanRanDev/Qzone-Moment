"use client";

import { useEffect, useRef, useState } from "react";

export default function SmoothCount({ target, suffix = "", prefix = "", decimals = 0 }: {
  target: number; suffix?: string; prefix?: string; decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2200;
        const start = performance.now();

        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 4);
          const val = (target * ease).toFixed(decimals);
          setDisplay(`${prefix}${val}${suffix}`);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, suffix, prefix, decimals]);

  return <span ref={ref}>{display}</span>;
}
