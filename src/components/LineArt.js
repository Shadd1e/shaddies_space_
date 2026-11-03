"use client";
import { useEffect, useRef } from "react";
import { startLineArt } from "@/lib/lineArt";

export default function LineArt({ className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return startLineArt(ref.current, { reducedMotion: reduced });
  }, []);
  return <canvas ref={ref} aria-hidden="true" className={className} style={{ width: "100%", height: "100%" }} />;
}
