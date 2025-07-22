import { Home, HomeIcon, Ticket } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { SignOutSidebarMenuItem } from "./sign-out-sidebar-menu-item";
import { UserSidebarClientMenuItem } from "./user-sidebar-client-menu-item";
import { getUser } from "@/app/actions/user";

const items = [
  {
    title: "Página inicial",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Assinatura",
    url: "/subscribe",
    icon: Ticket,
  },
];

export async function UserSidebar() {
  const user = await getUser();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            {user?.user_metadata.name.split(" ")[0]}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <UserSidebarClientMenuItem key={item.title} href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </UserSidebarClientMenuItem>
              ))}
              <SignOutSidebarMenuItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
