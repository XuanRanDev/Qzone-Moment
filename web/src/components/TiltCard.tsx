"use client";

import { useRef, useState, MouseEvent, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  glareColor?: string;
}

export default function TiltCard({ children, className = "", glareColor = "rgba(139,92,246,0.15)" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glareOpacity: 0 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    setStyle({ rotateX, rotateY, glareX: x * 100, glareY: y * 100, glareOpacity: 0.2 });
  };

  const reset = () => setStyle({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, glareOpacity: 0 });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        className="transition-transform duration-200 ease-out"
        style={{ transform: `rotateX(${style.rotateX}deg) rotateY(${style.rotateY}deg)` }}
      >
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, ${glareColor}, transparent 60%)`,
          opacity: style.glareOpacity,
        }}
      />
    </div>
  );
}
