"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const t1 = "Humans burn out.";
  const t2 = "Smart businesses run on systems.";

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setA(t1.slice(0, i + 1));
      i++;
      if (i === t1.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (a !== t1) return;
    let i = 0;
    const t = setInterval(() => {
      setB(t2.slice(0, i + 1));
      i++;
      if (i === t2.length) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [a]);

  return (
    <motion.section
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="min-h-[65vh] px-6 flex flex-col justify-center"
    >
      <div className="max-w-4xl text-4xl md:text-6xl font-semibold leading-tight space-y-3">
        <p>{a}</p>
        <p>{b.replace("systems.", "")}<span className="text-blue-600">systems</span></p>
      </div>

      <div className="mt-4">
        <a
          href="/automatex"
          className="inline-block border border-blue-600 px-14 py-6 text-xl font-semibold hover:bg-blue-600 hover:text-white transition"
        >
          Automate today
        </a>
      </div>
    </motion.section>
  );
}
