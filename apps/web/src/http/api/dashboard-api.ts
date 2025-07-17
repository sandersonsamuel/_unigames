import { fetcher } from "@/lib/fetcher"
import { DashboardOverviewType } from "@/schemas/dashboard"

export const getDashboardOverview = () => {
  return fetcher<DashboardOverviewType>("/dashboard/overview")
}