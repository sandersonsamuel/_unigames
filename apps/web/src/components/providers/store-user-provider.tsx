"use client";

import { AuthUser } from "@/@types/user";
import { authStore } from "@/store/auth";

export const StoreUserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: AuthUser;
}) => {
  authStore.user = user
  return <>{children}</>;
};
