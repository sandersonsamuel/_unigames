"use client";

import { usePathname } from "next/navigation";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface AppSidebarClientMenuItemProps {
  href: string;
  children: React.ReactNode;
}

export function AppSidebarClientMenuItem({
  href,
  children,
}: AppSidebarClientMenuItemProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={cn(isActive && "bg-accent")}>
        <Link href={href}>{children}</Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
