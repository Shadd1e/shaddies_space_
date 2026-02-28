import { Suspense } from "react";
import SignlClient from "./SignlClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <SignlClient />
    </Suspense>
  );
}