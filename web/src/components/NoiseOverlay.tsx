"use client";

import { useEffect, useRef } from "react";

export default function NoiseOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / 3);
      canvas.height = Math.floor(window.innerHeight / 3);
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let rafId: number;

    const generate = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 12;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    generate();

    const loop = () => {
      frame++;
      if (frame % 8 === 0) generate();
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
      style={{ width: "100vw", height: "100vh", imageRendering: "pixelated" }}
    />
  );
}
