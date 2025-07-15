"use server";

import { createClient } from "@/services/supabase/server";

export const callbackAction = async (code: string) => {
  const supabase = await createClient();

  const session = await supabase.auth.exchangeCodeForSession(code);

  if (session.data.user?.user_metadata.role == undefined) {
    const newUser = await supabase.auth.updateUser({
      data: {
        role: "gamer",
      },
    });

    return newUser;
  }

  return session;
};
