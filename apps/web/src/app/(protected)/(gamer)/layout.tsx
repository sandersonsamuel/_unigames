import { AuthProvider } from "@/components/providers/auth-provider";
import { RoleProvider } from "@/components/providers/role-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserSidebar } from "@/components/user-sidebar";
import { Role } from "@/constants/role";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RoleProvider role={Role.GAMER}>
        <SidebarProvider>
          <main className="flex gap-1 w-full">
            <UserSidebar />
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
