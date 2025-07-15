"use server";

import { createClient } from "@/services/supabase/server";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const supabase = await createClient();
  return (await supabase.auth.getUser()).data.user;
};

export const redirectByRole = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return redirect("/signin");
  }

  if (!data) {
    return redirect("/signin");
  }

  redirect(
    data.user.user_metadata.role === "admin" ? "/dashboard" : "/subscribe"
  );
};
