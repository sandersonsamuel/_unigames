import { AuthProvider } from "@/components/providers/auth-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { RoleProvider } from "@/components/providers/role-provider";
import { Role } from "@/constants/role";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <AuthProvider>
        <RoleProvider role={Role.GAMER}>{children}</RoleProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
