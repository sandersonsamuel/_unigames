import { AuthProvider } from "@/components/providers/auth-provider";
import { RoleProvider } from "@/components/providers/role-provider";
import { Role } from "@/constants/role";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RoleProvider role={Role.GAMER}>{children}</RoleProvider>
    </AuthProvider>
  );
}
