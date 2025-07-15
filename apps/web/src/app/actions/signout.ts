"use server";

import { createClient } from "@/services/supabase/server";

export const signoutAction = async () => {
  const supabase = await createClient();
  return await supabase.auth.signOut();
};
