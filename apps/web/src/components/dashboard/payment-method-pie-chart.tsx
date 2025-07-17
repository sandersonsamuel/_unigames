"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { PaymentMethodsDataType } from "@/schemas/dashboard";

export const description = "A simple pie chart";

type Props = {
  methodsData: PaymentMethodsDataType[];
};

export function PaymentMethodPieChart({ methodsData }: Props) {
  const chartData = methodsData.map((data, i) => ({
    method: data.method,
    purchases: data.purchases,
    fill: `var(--chart-${i + 1})`,
  }));

  const chartConfig = {
    PIX: {
      label: "Pix",
      color: "var(--chart-1)",
    },
    CARD: {
      label: "Cartão",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col md:w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Métodos de pagamento</CardTitle>
        <CardDescription>
          Gráfico de pizza dos metodos de pagamento.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="purchases" nameKey="method" />
            <ChartLegend
              content={<ChartLegendContent nameKey="method" />}
              className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
