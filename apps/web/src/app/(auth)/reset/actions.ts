"use server";

import { RequestResetPasswordFormValues } from "@/schemas/reset-password";
import { createClient } from "@/services/supabase/server";

export async function requestResetPasswordAction(
  values: RequestResetPasswordFormValues
) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_CLIENT_URL}/reset/password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
