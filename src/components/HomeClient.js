"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import CoursePopup from "@/components/Coursepopup";
import CohortPopup from "@/components/Cohortpopup";

export default function HomeClient() {
  const [courseOpen, setCourseOpen] = useState(false);
  const [cohortOpen, setCohortOpen] = useState(false);

  return (
    <>
      <Hero onCourseOpen={() => setCourseOpen(true)} />
      <CoursePopup open={courseOpen} onClose={() => setCourseOpen(false)} />
      <CohortPopup open={cohortOpen} onClose={() => setCohortOpen(false)} />
    </>
  );
}
