export type CompetitorsResponseType = {
  id: string
  name: string
  registration?: string
}

export type DashboardCompetitorsType = CompetitorsResponseType & {
  ticketRedeemed: boolean
}
