import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/components/providers/auth-provider";
import { RoleProvider } from "@/components/providers/role-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Role } from "@/constants/role";

export default function ProtectedRoutesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RoleProvider role={Role.ADMIN}>
        <SidebarProvider>
          <main className="flex gap-1 w-full">
            <AppSidebar />
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </RoleProvider>
    </AuthProvider>
  );
}
