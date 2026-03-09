"use client";

import { useState } from "react";
import HeaderBanner from "@/components/HeaderBanner";
import Hero from "@/components/Hero";
import Bridge from "@/components/Bridge";
import BookSection from "@/components/BookSection";
import Testimonials from "@/components/Testimonials";
import AutomateX from "@/components/AutomateX";
import Footer from "@/components/Footer";
import CoursePopup from "@/components/CoursePopup";
import CohortPopup from "@/components/CohortPopup";

export default function Home() {
  const [courseOpen, setCourseOpen] = useState(false);
  const [cohortOpen, setCohortOpen] = useState(false);

  return (
    <>
      <HeaderBanner onCohortOpen={() => setCohortOpen(true)} />
      <Hero onCourseOpen={() => setCourseOpen(true)} />
      <Bridge />
      <BookSection />
      <Testimonials />
      <AutomateX />
      <Footer />

      <CoursePopup open={courseOpen} onClose={() => setCourseOpen(false)} />
      <CohortPopup open={cohortOpen} onClose={() => setCohortOpen(false)} />
    </>
  );
}