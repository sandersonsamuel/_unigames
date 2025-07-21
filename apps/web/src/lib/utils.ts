import { GameStatusEnum } from "@/types/dashboard";
import { FormatGameStatusType } from "@/types/utils";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGameStatus(status: GameStatusEnum): FormatGameStatusType {
  switch (status) {
    case GameStatusEnum.AVAILABLE:
      return {
        label: "Disponível",
        variant: "default"
      }
    case GameStatusEnum.SOLD_OUT:
      return {
        label: "Esgotado",
        variant: "destructive"
      }
    case GameStatusEnum.UNLIMITED:
      return {
        label: "Ilimitado",
        variant: "outline"
      }
    default:
      return {
        label: "undefined",
        variant: "default"
      }
  }
}