import { Role } from "@/constants/role";
import { createClient } from "@/services/supabase/server";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  role: Role;
};

export const RoleProvider = async ({ children, role }: Props) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || data?.user.user_metadata.role !== role) {
    redirect("/");
  }

  return <>{children}</>;
};
