"use client";

import { motion } from "framer-motion";

const testimonials = [
  { text: "Our systems now run without constant supervision.", name: "Adebayo Wards" },
  { text: "Automation removed hours of manual work every week.", name: "Sarah Klein" },
  { text: "We finally operate with structure instead of chaos.", name: "Chinedu Okafor" },
  { text: "Productivity doubled once workflows were systemized.", name: "Mark Reynolds" },
  { text: "Decisions are faster because processes are clear.", name: "Funke Adebola" },
  { text: "Revenue improved after building repeatable systems.", name: "Daniel Wright" },
  { text: "We stopped firefighting and started scaling.", name: "Ibrahim Musa" },
  { text: "Operations feel calm for the first time.", name: "Natalie Brooks" },
  { text: "Automation gave our team focus again.", name: "Tunde Balogun" },
  { text: "Systems turned effort into leverage.", name: "Elena García" }
];

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="py-28 overflow-hidden"
    >
      {/* flowing testimonials */}
      <div className="flex gap-24 whitespace-nowrap animate-scroll px-6">
        {[...testimonials, ...testimonials].map((t, i) => (
          <div key={i} className="flex flex-col">
            <p
              className={`text-2xl md:text-3xl font-medium ${
                i % 2 === 0 ? "text-[#191970]" : "text-black"
              }`}
            >
              {t.text}
            </p>

            <span className="italic text-sm mt-2 text-black/70">
              — {t.name}
            </span>
          </div>
        ))}
      </div>

      {/* Brands */}
      <div className="mt-24 px-6">
        <p className="text-center text-sm mb-10">Brands we’ve worked with</p>

        <div className="flex flex-wrap justify-center gap-12 opacity-80">
  {[
    "altekflo.png",
    "chase.png",
    "bennies.png",
    "logo4.png",
    "logo5.png",
    "logo6.png",
    "logo7.png",
    "logo8.png",
    "logo9.png",
  ].map((logo, i) => (
    <img
      key={i}
      src={`/logos/${logo}`}
      className="h-10 object-contain"
      alt="Brand logo"
    />
  ))}
</div>

      </div>
    </motion.section>
  );
}
