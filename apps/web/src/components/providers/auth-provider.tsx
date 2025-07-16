import { createClient } from "@/services/supabase/server";
import { redirect } from "next/navigation";
import { StoreUserProvider } from "./store-user-provider";

export const AuthProvider = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/signin");
  }

  const user = data.user;

  return (
    <StoreUserProvider
      user={{
        id: user.id,
        email: user.email!,
        name: user.user_metadata?.name,
        role: user.user_metadata?.role,
      }}
    >
      {children}
    </StoreUserProvider>
  );
};
