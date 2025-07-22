import { Gamepad, HomeIcon, LayoutDashboard, Ticket } from "lucide-react";

import { getUser } from "@/app/actions/user";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { AppSidebarClientMenuItem } from "./app-sidebar-client-menu-item";
import { SignOutSidebarMenuItem } from "./sign-out-sidebar-menu-item";

const items = [
  {
    title: "Página inicial",
    url: "/",
    icon: HomeIcon,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Jogos",
    url: "/games",
    icon: Gamepad,
  },
  {
    title: "Ingressos",
    url: "/ticket",
    icon: Ticket,
  },
];

export async function AppSidebar() {
  const user = await getUser();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Unigames - {user?.user_metadata.name.split(" ")[0]}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <AppSidebarClientMenuItem key={item.title} href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </AppSidebarClientMenuItem>
              ))}
              <SignOutSidebarMenuItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
