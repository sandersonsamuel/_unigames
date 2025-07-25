import { ResetPasswordComponent } from "@/components/reset-password-component";
import { Suspense } from "react";

const ResetPasswordPage = () => {
  return (
    <Suspense>
      <ResetPasswordComponent />
    </Suspense>
  );
};

export default ResetPasswordPage;
