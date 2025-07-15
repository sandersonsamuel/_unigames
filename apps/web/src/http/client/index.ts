import { env } from "@/env";
import { RequestInit } from "next/dist/server/web/spec-extension/request";

export const apiClient = (url: string, req?: RequestInit) => {
  return fetch(env.NEXT_PUBLIC_API_URL + url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...req
  });
}