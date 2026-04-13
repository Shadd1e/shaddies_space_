"use client";

import { useEffect, useRef } from "react";

export default function FlowBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf;

    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const isDark = () =>
      document.documentElement.getAttribute("data-theme") === "dark";

    const points = Array.from({ length: 60 }).map(() => ({
      x:  Math.random() * w,
      y:  Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));

    function animate() {
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();

      points.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx   = points[i].x - points[j].x;
          const dy   = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const alpha = (1 - dist / 150) * (dark ? 0.14 : 0.07);
            ctx.strokeStyle = dark
              ? `rgba(77,121,255,${alpha})`
              : `rgba(39,86,232,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.stroke();
          }
        }
      }

      points.forEach(p => {
        ctx.fillStyle = dark
          ? "rgba(77,121,255,0.45)"
          : "rgba(39,86,232,0.25)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset:    0,
        zIndex:   0,
        pointerEvents: "none",
      }}
    />
  );
}
