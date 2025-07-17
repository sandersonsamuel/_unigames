import { OverViewTab } from "@/components/dashboard/overview-tab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDashboardOverview } from "@/http/api/dashboard-api";

export default async function Dashboard() {
  const overviewData = await getDashboardOverview();

  return (
    <div className="px-5 p-3 space-y-5 w-full">
      <div>
        <h1 className="text-3xl">Dashboard</h1>
        <p>Veja as principais métricas sobre o evento.</p>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão geral</TabsTrigger>
          <TabsTrigger value="password">Jogos</TabsTrigger>
        </TabsList>
        
        <OverViewTab data={overviewData} />

        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
