import { fetcher } from "@/lib/fetcher"
import { DashboardOverviewType } from "@/schemas/dashboard"
import { DashboardGamesStatsType, DashboardTicketsType } from "@/types/dashboard"

export const getDashboardOverview = () => {
  return fetcher<DashboardOverviewType>("/dashboard/overview")
}

export const getDashboardTickets = () => {
  return fetcher<DashboardTicketsType>("/dashboard/tickets")
}

export const getCompetitorsSheet = async () => {
  return await fetcher<Blob>("/dashboard/competitors/sheet")
}

export const getGamesStats = async () => {
  return await fetcher<DashboardGamesStatsType[]>("/dashboard/games")
}