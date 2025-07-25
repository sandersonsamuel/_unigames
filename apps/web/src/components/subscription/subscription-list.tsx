"use client";

import { usePurchasesByUserIdQuery } from "@/http/hooks/use-purchases";
import { authStore } from "@/store/auth";
import { useSnapshot } from "valtio";
import { PurchaseCard, PurchaseCardSkeleton } from "../purchase/purchase-card";

export const SubscriptionList = () => {
  const { user } = useSnapshot(authStore);

  const { data: purchases, isLoading } = usePurchasesByUserIdQuery(user?.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {purchases &&
        purchases.map((purchase) => (
          <PurchaseCard key={purchase.id} purchase={purchase} />
        ))}
      {isLoading &&
        [1, 2, 3].map((_, index) => <PurchaseCardSkeleton key={index} />)}
    </div>
  );
};
