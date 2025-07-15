import { Gamepad, Icon, LayoutDashboard, Ticket } from "lucide-react";

import { getUser } from "@/app/actions/user";
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
import { title } from "process";

const items = [
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
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SignOutSidebarMenuItem />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
