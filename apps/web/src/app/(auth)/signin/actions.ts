"use server";

import { ActionType } from "@/types/actions";
import { SigninFormValues } from "@/types/signin";
import { SupabaseUser } from "@/types/user";
import { env } from "@/env";
import { createClient } from "@/services/supabase/server";

export const signinAction = async (
  data: SigninFormValues
): Promise<ActionType<SupabaseUser>> => {
  const supabase = await createClient();

  const { error, data: { user } } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return {
      message: error.code === "invalid_credentials" ? "Email ou senha inválidos" : error.message,
      status: 'error',
    };
  }

  if (!user) {
    return {
      message: 'User not found',
      status: 'error',
    }
  }

  return {
    message: 'Signin successful',
    status: 'success',
    data: {
      id: user.id,
      email: user.email!,
      role: user.user_metadata.role,
    },
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
