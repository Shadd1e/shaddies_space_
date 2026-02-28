"use client";

import { Suspense } from "react";
import SignlContent from "./SignlContent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignlContent />
    </Suspense>
  );
}