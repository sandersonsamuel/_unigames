import { GamesTab } from "@/components/dashboard/games-tab";
import { OverViewTab } from "@/components/dashboard/overview-tab";
import { TicketsTab } from "@/components/dashboard/tickets-tab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function Dashboard() {
  return (
    <div className="px-5 p-3 space-y-5 w-full">
      <div>
        <h1 className="text-3xl">Dashboard</h1>
        <p>Veja as principais métricas sobre o evento.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="games">Jogos</TabsTrigger>
          <TabsTrigger value="tickets">Participantes</TabsTrigger>
        </TabsList>

        <OverViewTab />
        <TicketsTab />
        <GamesTab />
      </Tabs>
    </div>
  );
}
