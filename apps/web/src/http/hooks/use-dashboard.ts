import { useQuery } from "@tanstack/react-query"
import { getCompetitorsSheet } from "../api/dashboard-api"

export const useStudentSheet = () => {
  return useQuery({
    queryKey: ["competitors-sheet"],
    queryFn: getCompetitorsSheet,
  })
}