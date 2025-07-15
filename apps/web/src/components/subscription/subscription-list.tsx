import { getUser } from "@/app/actions/user";
import { getPurchasesByUserIdQuery } from "@/http/queries/purchases/get-purchase";
import { PurchaseCard } from "./purchase-card";

export const SubscriptionList = async () => {
  const user = await getUser();

  if (user) {
    const purchases = await getPurchasesByUserIdQuery(user.id);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {purchases.map((purchase) => (
          <PurchaseCard key={purchase.id} purchase={purchase} />
        ))}
      </div>
    );
  }
};
