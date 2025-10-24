"use client";

import { PurchaseType } from "@/types/purchase";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getStatusConfig } from "../subscription/utils";
import { PurchaseDetailsDialog } from "./purchase-details-dialog";
import { Skeleton } from "../ui/skeleton";
import { PaymentStatus } from "@/types/payment-status";

interface PurchaseCardProps {
  purchase: PurchaseType;
}

export function PurchaseCard({ purchase }: PurchaseCardProps) {
  const statusConfig = getStatusConfig(purchase.paymentStatus);
  const StatusIcon = statusConfig.icon;

  const redirectToInitPoint = () => {
    if (purchase.paymentStatus === PaymentStatus.PENDING) {
      open(purchase.initPoint, "_blank");
    }
  };

  if (purchase.paymentStatus === PaymentStatus.PENDING) {
    return (
      <button className="text-start" onClick={redirectToInitPoint}>
        <Card className="cursor-pointer hover:bg-accent/35 transition-colors duration-200 hover:shadow-md">
          <CardHeader className="px-3 md:px-6">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex-1 gap-2">
                <CardTitle className="text-md font-semibold line-clamp-2">
                  {purchase.game.name}
                </CardTitle>
              </div>
              <Badge className={cn(statusConfig.className, "text-xs h-fit")}>
                <StatusIcon className="w-3 h-3" />
                {statusConfig.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 px-3 md:px-6">
            <p className="font-semibold text-lg">
              {(purchase.game.price / 100).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p
              className="text-xs lg:text-sm text-muted-foreground text-wrap"
              title="Clique para voltar ao pagamento."
            >
              Clique para voltar ao pagamento.
            </p>
          </CardContent>
        </Card>
      </button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-start">
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
              <p title="Clique para ver detalhes" className="text-xs lg:text-sm text-muted-foreground line-clamp-1">
                Clique para ver detalhes
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
