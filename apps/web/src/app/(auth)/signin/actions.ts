"use server";

import { ActionType } from "@/@types/actions";
import { SigninFormValues } from "@/@types/signin";
import { SupabaseUser } from "@/@types/user";
import { env } from "@/env";
import { createClient } from "@/services/supabase/server";

export const signinAction = async (
  data: SigninFormValues
): Promise<ActionType<SupabaseUser>> => {
  const supabase = await createClient();

  const { error, data: user } = await supabase.auth.signInWithPassword(data);

  if (error?.code == "invalid_credentials") {
    return { error: "Email ou senha inválidos" };
  }

  if (error) {
    return { error: error.message };
  }

  return {
    data: user,
  };
};

export const signinWithGoogleAction = async () => {
  const supabase = await createClient();

  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: { prompt: "select_account" },
      redirectTo: env.NEXT_PUBLIC_CLIENT_URL + "/auth/callback",
    },
  });
};
