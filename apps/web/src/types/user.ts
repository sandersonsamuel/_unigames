import { Role } from "@/constants/role";

export type SupabaseUser = {
  id: string;
  email: string;
  role: Role;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
