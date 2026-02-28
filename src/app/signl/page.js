"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import FlowBackground from "@/components/FlowBackground";
import Link from "next/link";

export default function Signl() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      <FlowBackground />

      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-2xl w-full bg-black/60 backdrop-blur-xl rounded-2xl p-10 text-white shadow-2xl space-y-10"
      >
        {/* your existing JSX unchanged */}
      </motion.div>
    </div>
  );
}