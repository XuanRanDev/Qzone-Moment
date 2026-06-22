"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animId: number;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    const handleMouse = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      el.style.transform = `translate(${currentX - 200}px, ${currentY - 200}px)`;
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouse);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 w-[400px] h-[400px] rounded-full z-[9999] hidden lg:block"
      style={{
        background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
      }}
    />
  );
}
