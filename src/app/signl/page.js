import { Suspense } from "react";
import SignlClient from "./SignlClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignlClient />
    </Suspense>
  );
}