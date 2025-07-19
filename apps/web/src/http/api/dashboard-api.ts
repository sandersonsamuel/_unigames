import { fetcher } from "@/lib/fetcher"
import { DashboardOverviewType } from "@/schemas/dashboard"
import { DashboardTicketsType } from "@/types/dashboard"

export const getDashboardOverview = () => {
  return fetcher<DashboardOverviewType>("/dashboard/overview")
}

export const getDashboardTickets = () => {
  return fetcher<DashboardTicketsType>("/dashboard/tickets")
}

export const getCompetitorsSheet = async () => {
  const promise = await fetcher<Blob>("/dashboard/competitors/sheet")
  console.log(promise)
  return promise
}