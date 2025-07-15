import { Session, User, WeakPassword } from "@supabase/supabase-js";

export type SupabaseUser = {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword;
};

export type AuthUser = {
  id: string;
  email?: string;
  name: string;
};
