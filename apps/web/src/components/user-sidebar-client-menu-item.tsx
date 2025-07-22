"use client";

import { usePathname } from "next/navigation";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface UserSidebarClientMenuItemProps {
  href: string;
  children: React.ReactNode;
}

export function UserSidebarClientMenuItem({
  href,
  children,
}: UserSidebarClientMenuItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={cn(isActive && "bg-accent")}> 
        <a href={href}>{children}</a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
