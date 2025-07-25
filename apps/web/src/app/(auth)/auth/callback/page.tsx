import { CallbackComponent } from "@/components/callback-component";
import { Suspense } from "react";

export default function CallbackPage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <CallbackComponent />
    </Suspense>
  );
}


