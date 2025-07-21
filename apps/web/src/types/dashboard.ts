import { DashboardCompetitorsType } from "./competitors"

export type DashboardTicketsType = {
  competitors: DashboardCompetitorsType[]
  competitorsPresent: number
  competitorsAbsent: number
  competitorsStudents: number
}

export enum GameStatusEnum {
  UNLIMITED = "UNLIMITED",
  AVAILABLE = "AVAILABLE",
  SOLD_OUT = "SOLD_OUT"
}

export type DashboardGamesStatsType = {
  id: string;
  name: string;
  price: number;
  teamSize: number;
  teams: number;
  competition: boolean | null;
  vacancies: number | null;
  image: string;
  description: string;
  competitorsCount: number;
  revenue: number;
  status: GameStatusEnum
}