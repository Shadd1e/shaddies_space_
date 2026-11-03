// Original generative "tangle of loops" artwork. Pure canvas, no dependencies.
export function startLineArt(canvas, { reducedMotion = false } = {}) {
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = 1, raf = 0, running = true;
  let rotX = 0.5, rotY = 0, targetX = 0.5, targetY = 0, last = 0, frame = 0;
  let ink = "20,24,48", accent = "39,86,232";

  const LOOPS = 18;
  const loops = Array.from({ length: LOOPS }, (_, i) => ({
    k: [1 + (i % 3), 2 + ((i * 2) % 3), 1 + ((i * 3) % 4)],
    ph: [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28],
    sp: [0.05 + Math.random() * 0.1, 0.05 + Math.random() * 0.1, 0.05 + Math.random() * 0.1],
    amp: [0.55 + Math.random() * 0.45, 0.6 + Math.random() * 0.4, 0.5 + Math.random() * 0.4],
    hot: i % 6 === 0,
  }));

  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const toRgb = (v, fb) => {
      const s = v.trim();
      const m = s.match(/^#([0-9a-f]{6})$/i);
      if (!m) return fb;
      const n = parseInt(m[1], 16);
      return `${n >> 16},${(n >> 8) & 255},${n & 255}`;
    };
    ink = toRgb(cs.getPropertyValue("--text"), ink);
    accent = toRgb(cs.getPropertyValue("--neon"), accent);
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function onMove(e) {
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    targetY = x * 1.6;
    targetX = 0.5 + y * 1.0;
  }

  function draw(t) {
    if (!running) return;
    const dt = Math.min((t - last) / 1000 || 0.016, 0.05);
    last = t;
    if (frame++ % 60 === 0) readColors();
    if (!reducedMotion) targetY += dt * 0.12;
    rotX += (targetX - rotX) * 0.05;
    rotY += (targetY - rotY) * 0.05;

    ctx.clearRect(0, 0, w, h);
    const R = Math.min(w, h) * 0.42;
    const cx = w * 0.5, cy = h * 0.5;
    const cX = Math.cos(rotX), sX = Math.sin(rotX), cY = Math.cos(rotY), sY = Math.sin(rotY);
    const STEPS = 140;

    for (const L of loops) {
      if (!reducedMotion) for (let a = 0; a < 3; a++) L.ph[a] += L.sp[a] * dt;
      ctx.beginPath();
      for (let s = 0; s <= STEPS; s++) {
        const u = (s / STEPS) * Math.PI * 2;
        let x = Math.sin(L.k[0] * u + L.ph[0]) * L.amp[0];
        let y = Math.sin(L.k[1] * u + L.ph[1]) * L.amp[1] * 1.15;
        let z = Math.sin(L.k[2] * u + L.ph[2]) * L.amp[2];
        // rotate Y then X
        let x1 = x * cY + z * sY, z1 = -x * sY + z * cY;
        let y1 = y * cX - z1 * sX, z2 = y * sX + z1 * cX;
        const p = 1 / (1.8 - z2 * 0.5);
        const px = cx + x1 * R * p * 1.3, py = cy + y1 * R * p * 1.3;
        s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.strokeStyle = L.hot ? `rgba(${accent},0.75)` : `rgba(${ink},0.28)`;
      ctx.lineWidth = L.hot ? 1.1 : 0.7;
      ctx.stroke();
    }
    raf = requestAnimationFrame(draw);
  }

  const onVis = () => {
    running = !document.hidden;
    if (running) { last = performance.now(); raf = requestAnimationFrame(draw); }
    else cancelAnimationFrame(raf);
  };

  readColors();
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("visibilitychange", onVis);
  raf = requestAnimationFrame(draw);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVis);
  };
}
