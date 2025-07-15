"use client";

import { LogOut } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { signoutAction } from "@/app/actions/signout";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

export const SignOutSidebarMenuItem = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <LogOut />
            Sair
          </SidebarMenuButton>
        </SidebarMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja sair?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao sair você terá que fazer login novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant={"secondary"} className="border-4">
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => signoutAction()}
            className="border-4"
          >
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
