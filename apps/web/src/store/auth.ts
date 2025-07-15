import { AuthUser } from "@/types/user";
import { proxy } from "valtio";

export type AuthState = {
  user: AuthUser | null;
};

export const authStore = proxy<AuthState>({
  user: null,
});
