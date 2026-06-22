"use client";

import { useEffect, useRef } from "react";

export default function AuroraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      t += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Aurora waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, h * 0.5);

        for (let x = 0; x <= w; x += 4) {
          const y = h * 0.5
            + Math.sin(x * 0.003 + t + i * 2) * 80
            + Math.sin(x * 0.007 + t * 1.3 + i) * 40
            + Math.cos(x * 0.001 + t * 0.7) * 60;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(w, h);
        ctx.lineTo(0, h);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, 0, w, 0);
        const hue1 = 220 + i * 30 + Math.sin(t) * 20;
        const hue2 = 280 + i * 20 + Math.cos(t) * 20;
        gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.03)`);
        gradient.addColorStop(0.5, `hsla(${(hue1 + hue2) / 2}, 70%, 60%, 0.06)`);
        gradient.addColorStop(1, `hsla(${hue2}, 70%, 60%, 0.03)`);

        ctx.fillStyle = gradient;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none dark:opacity-100 opacity-60"
    />
  );
}
