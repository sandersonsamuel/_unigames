import { getDashboardOverview } from "@/http/api/dashboard-api";
import { TabsContent } from "@radix-ui/react-tabs";
import { BanknoteArrowUp, LucideGamepad, TicketPlus } from "lucide-react";
import { DashboardCard } from "./dashboard-card";
import { PaymentMethodPieChart } from "./payment-method-pie-chart";

export const OverViewTab = async () => {
  const data = await getDashboardOverview();

  return (
    <TabsContent value="overview" className="flex flex-col gap-3">
      <div className="flex gap-3 flex-wrap">
        <DashboardCard title="Jogos" icon={<LucideGamepad />}>
          <h3 className="text-3xl">{data.totalGames}</h3>
        </DashboardCard>

        <DashboardCard title="Jogadores totais" icon={<TicketPlus />}>
          <h3 className="text-3xl">{data.totalCompetitors}</h3>
        </DashboardCard>

        <DashboardCard title="Receita Total" icon={<BanknoteArrowUp />}>
          <h3 className="text-3xl">
            {(data.ammount / 100).toLocaleString("pt-BR", {
              currency: "BRL",
              style: "currency",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h3>
        </DashboardCard>
      </div>

      <PaymentMethodPieChart methodsData={data.paymentMethodsData} />
    </TabsContent>
  );
};
