"use client";

import { useEffect, useRef, MouseEvent as ReactMouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function MagneticButton({ children, className = "", intensity = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  const handleMove = (e: ReactMouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    pos.current = {
      x: (e.clientX - cx) * intensity,
      y: (e.clientY - cy) * intensity,
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1.04)`;
    });
  };

  const reset = () => {
    cancelAnimationFrame(raf.current);
    if (ref.current) {
      ref.current.style.transition = "transform 0.5s cubic-bezier(0.23,1,0.32,1)";
      ref.current.style.transform = "translate(0px, 0px) scale(1)";
      setTimeout(() => {
        if (ref.current) ref.current.style.transition = "";
      }, 500);
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={`inline-block ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </div>
  );
}
