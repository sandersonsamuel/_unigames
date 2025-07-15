"use server";

import { ActionType } from "@/types/actions";
import { SignupFormValues } from "@/types/signup";
import { SupabaseUser } from "@/types/user";
import { Role } from "@/constants/role";
import { env } from "@/env";
import { createClient } from "@/services/supabase/server";

export const signupAction = async (
  data: SignupFormValues
): Promise<ActionType<SupabaseUser>> => {
  const supabase = await createClient();

  const { error, data: { user } } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: env.NEXT_PUBLIC_CLIENT_URL + "/auth/callback",
      data: {
        name: data.name,
        role: Role.GAMER,
      },
    },
  });

  if (error) {
    return {
      message: error.message,
      status: 'error',
    };
  }

  if (!user) {
    return {
      message: 'User not created',
      status: 'error',
    }
  }

  return {
    message: 'Signup successful',
    status: 'success',
    data: {
      id: user.id,
      email: user.email!,
      role: user.user_metadata.role,
    },
  };
};
