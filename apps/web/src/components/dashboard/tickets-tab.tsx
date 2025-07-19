import { TabsContent } from "@/components/ui/tabs";
import { getDashboardTickets } from "@/http/api/dashboard-api";

import { TicketPlus } from "lucide-react";
import { CompetitorsTable } from "./competitors-table";
import { DashboardCard } from "./dashboard-card";
import { DownloadCompetitorsList } from "./download-competitors-list";

export const TicketsTab = async () => {
  const tickets = await getDashboardTickets();

  return (
    <TabsContent value="tickets" className="flex flex-col gap-3">
      <div className="flex gap-3">
        <DashboardCard title="Presentes" icon={<TicketPlus />}>
          <h3 className="text-3xl">{tickets.competitorsPresent}</h3>
        </DashboardCard>

        <DashboardCard title="Ausentes" icon={<TicketPlus />}>
          <h3 className="text-3xl">{tickets.competitorsAbsent}</h3>
        </DashboardCard>

        <DashboardCard title="Estudantes" icon={<TicketPlus />}>
          <h3 className="text-3xl">{tickets.competitorsStudents}</h3>
        </DashboardCard>
      </div>

      <DownloadCompetitorsList />

      <CompetitorsTable competitors={tickets.competitors} />
    </TabsContent>
  );
};
