"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Our systems now run without constant supervision. We've cut manual work by more than half and the team finally has time to focus on actual growth.",
    name: "Adebayo Okonkwo",
    role: "Founder, Lagos",
    photo: "/testimonials/testimonial1.jpg",
  },
  {
    text: "I came in knowing nothing about automation. Within two weeks I had built three workflows for my business and one for a client. The ROI was immediate.",
    name: "Chidinma Eze",
    role: "E-commerce Owner, Abuja",
    photo: "/testimonials/testimonial2.jpg",
  },
  {
    text: "What used to take our ops team a full day now runs overnight without anyone touching it. I wish we had done this two years ago.",
    name: "Emeka Okafor",
    role: "Operations Manager, Port Harcourt",
    photo: "/testimonials/testimonial3.jpg",
  },
  {
    text: "As a freelancer, automation has completely changed what I can offer clients. I charge more and deliver faster. It's the best skill I've picked up in years.",
    name: "Fatima Aliyu",
    role: "Freelance Consultant, Kano",
    photo: "/testimonials/testimonial4.jpg",
  },
  {
    text: "The clarity of instruction made it easy even for someone without a technical background. I automated my entire client follow-up process in one afternoon.",
    name: "Tunde Bakare",
    role: "Sales Director, Ibadan",
    photo: "/testimonials/testimonial5.jpg",
  },
];

// Scrolling row component
function ScrollRow({ items, direction = "left" }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden">
      <div
        className={`flex gap-8 whitespace-nowrap ${
          direction === "left" ? "animate-scroll" : "animate-scroll-reverse"
        }`}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="inline-flex flex-col gap-4 min-w-[340px] max-w-[340px] border border-black/8 bg-white p-6 rounded-lg whitespace-normal align-top flex-shrink-0"
          >
            <p className="text-base text-black/65 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-3 mt-auto">
              <img
                src={t.photo}
                alt={t.name}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0 grayscale"
              />
              <div>
                <p className="font-semibold text-sm">{t.name}</p>
                <p className="text-xs text-black/35">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
      className="py-28 overflow-hidden space-y-6"
    >
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-semibold">What people say.</h2>
      </div>

      <ScrollRow items={testimonials} direction="left" />

      {/* Brands */}
      <div className="mt-20 px-6">
        <p className="text-center text-sm text-black/40 mb-10">Brands we've worked with</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-60">
          {["altekflo.png", "chase.png", "bennies.png", "logo4.png", "logo5.png", "logo6.png", "logo7.png", "logo8.png", "logo9.png"].map((logo, i) => (
            <img key={i} src={`/logos/${logo}`} className="h-10 object-contain" alt="Brand logo" />
          ))}
        </div>
      </div>
    </motion.section>
  );
}