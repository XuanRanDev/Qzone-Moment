"use client";

import { useRef, useState, useCallback, MouseEvent as ReactMouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

export default function GlareCard({ children, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    glareX: 50,
    glareY: 50,
    rotateX: 0,
    rotateY: 0,
    opacity: 0,
  });

  const move = useCallback((e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setStyle({
      glareX: x * 100,
      glareY: y * 100,
      rotateX: (y - 0.5) * -6,
      rotateY: (x - 0.5) * 6,
      opacity: 1,
    });
  }, []);

  const leave = useCallback(() => {
    setStyle((s) => ({ ...s, rotateX: 0, rotateY: 0, opacity: 0 }));
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`relative ${className}`}
      style={{ perspective: "800px" }}
    >
      <div
        className="transition-transform duration-200 ease-out h-full"
        style={{
          transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
      {/* Light glare — adaptive for dark/light */}
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, rgba(139,92,246,0.08), transparent 55%)`,
          opacity: style.opacity,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 dark:block hidden"
        style={{
          background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, rgba(255,255,255,0.06), transparent 50%)`,
          opacity: style.opacity,
        }}
      />
    </div>
  );
}
