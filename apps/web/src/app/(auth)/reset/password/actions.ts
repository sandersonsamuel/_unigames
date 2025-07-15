"use server";

import { ResetPasswordFormValues } from "@/schemas/reset-password";
import { createClient } from "@/services/supabase/server";

export async function resetPasswordAction(
  values: ResetPasswordFormValues,
  code: string
) {
  const supabase = await createClient();

  const { error: sessionError } = await supabase.auth.exchangeCodeForSession(
    code
  );

  if (sessionError) {
    return { error: sessionError.message };
  }

  const { error } = await supabase.auth.updateUser({
    password: values.password,
  });

  if (error) {
    return { error: error.message };
  }

  return { error: null };
}
