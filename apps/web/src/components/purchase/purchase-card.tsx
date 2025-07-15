"use client";

import { PurchaseType } from "@/types/purchase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getStatusConfig } from "../subscription/utils";
import { PurchaseDetailsDialog } from "./purchase-details-dialog";
import { Skeleton } from "../ui/skeleton";

interface PurchaseCardProps {
  purchase: PurchaseType;
}

export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const statusConfig = getStatusConfig(purchase.paymentStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-start"
          disabled={purchase.paymentStatus !== "PAID"}
        >
          <Card className="cursor-pointer hover:bg-accent/35 transition-colors duration-200 hover:shadow-md">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex-1 gap-2">
                  <CardTitle className="text-lg font-semibold line-clamp-1">
                    {purchase.game.name}
                  </CardTitle>
                </div>
                <Badge className={cn(statusConfig.className, "text-xs h-fit")}>
                  <StatusIcon className="w-3 h-3" />
                  {statusConfig.label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold text-lg">
                {(purchase.game.price / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-sm text-muted-foreground">
                {purchase.paymentStatus === "PENDING"
                  ? "Aguardando pagamento"
                  : "Clique para ver detalhes"}
              </p>
            </CardContent>
          </Card>
        </button>
      </DialogTrigger>
      <PurchaseDetailsDialog purchase={purchase} />
    </Dialog>
  );
}

export const PurchaseCardSkeleton = () => {
  return (
    <div className="w-full h-[154px] flex flex-col justify-between border-4 bg-accent/30 p-6 opacity-40 animate-pulse">
      <Skeleton className="w-full h-[28px]" />
      <div className="space-y-2">
        <Skeleton className="w-full h-[28px]" />
        <Skeleton className="w-full h-[20px]" />
      </div>
    </div>
  );
};
