import { DashboardCompetitorsType } from "./competitors"

export type DashboardTicketsType = {
  competitors: DashboardCompetitorsType[]
  competitorsPresent: number
  competitorsAbsent: number
  competitorsStudents: number
}