"use client";

import { useState } from "react";
import HeaderBanner from "@/components/HeaderBanner";
import Hero from "@/components/Hero";
import CoursePopup from "@/components/CoursePopup";
import CohortPopup from "@/components/CohortPopup";

export default function HomeClient() {
  const [courseOpen, setCourseOpen] = useState(false);
  const [cohortOpen, setCohortOpen] = useState(false);

  return (
    <>
      <HeaderBanner onCohortOpen={() => setCohortOpen(true)} />
      <Hero onCourseOpen={() => setCourseOpen(true)} />
      <CoursePopup open={courseOpen} onClose={() => setCourseOpen(false)} />
      <CohortPopup open={cohortOpen} onClose={() => setCohortOpen(false)} />
    </>
  );
}