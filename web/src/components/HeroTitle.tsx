"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroTitle() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const line1 = "QQ空间";
  const line2 = "时光机";

  useEffect(() => {
    setMounted(true);

    const container = containerRef.current;
    if (!container) return;
    const chars = container.querySelectorAll<HTMLElement>(".hc");

    // Staggered entrance
    chars.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(50px) scale(0.8)";
      el.style.filter = "blur(10px)";
      el.style.transition = "none";

      setTimeout(() => {
        el.style.transition = "opacity 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.5s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0) scale(1)";
        el.style.filter = "blur(0)";
      }, 300 + i * 70);
    });

    // Scroll parallax
    const onScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.5), 1);
      chars.forEach((el, i) => {
        const stagger = (i % line1.length) * 0.02;
        const p = Math.max(0, Math.min((progress - stagger) / 0.4, 1));
        el.style.transform = `translateY(${-p * 40}px) scale(${1 - p * 0.1})`;
        el.style.opacity = String(1 - p * 0.8);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={containerRef} className="relative select-none">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-gradient-to-r from-blue-400/20 via-violet-500/20 to-purple-500/20 dark:from-blue-500/10 dark:via-violet-500/10 dark:to-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative" style={{ perspective: "600px" }}>
        {/* Line 1 */}
        <div className="flex justify-center gap-[0.02em]" style={{ transformStyle: "preserve-3d" }}>
          {line1.split("").map((char, i) => (
            <span
              key={`l1-${i}`}
              className="hc inline-block text-[3.5rem] sm:text-[6rem] lg:text-[8rem] font-black leading-none"
              style={{
                fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
                background: "linear-gradient(180deg, #1e1b4b 0%, #4338ca 40%, #7c3aed 70%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Line 2 */}
        <div className="flex justify-center gap-[0.05em] mt-[-0.05em]" style={{ transformStyle: "preserve-3d" }}>
          {line2.split("").map((char, i) => (
            <span
              key={`l2-${i}`}
              className="hc inline-block text-[3.5rem] sm:text-[6rem] lg:text-[8rem] font-black leading-none"
              style={{
                fontFamily: "'Inter', 'Noto Sans SC', sans-serif",
                background: "linear-gradient(180deg, #7c3aed 0%, #a855f7 30%, #c084fc 60%, #e9d5ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle underline accent */}
      <div className="relative mx-auto mt-4 flex justify-center">
        <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60" />
      </div>
    </div>
  );
}
