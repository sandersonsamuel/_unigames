import { NewSubscriptionDialog } from "@/components/subscription/new-subscription-dialog";
import { SubscriptionList } from "@/components/subscription/subscription-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGames } from "@/http/api/games-api";
import { Suspense } from "react";

export default async function Subscribe() {
  const games = getGames();

  return (
    <div className="flex flex-col items-center p-0 md:p-4 gap-3 w-full mx-auto pr-7">
      <Card className="w-full bg-transparent border-none">
        <CardHeader className="block md:flex w-full justify-between space-y-2 md:space-y-0 px-0">
          <div className="space-y-1">
            <CardTitle className="md:text-2xl">
              Meus Ingressos
            </CardTitle>
            <CardDescription className="text-sm md:text-base">
              Ingressos adquiridos
            </CardDescription>
          </div>
          <CardAction className="w-full md:w-auto">
            <Suspense fallback={<Button>Nova inscrição</Button>}>
              <NewSubscriptionDialog gamesPromise={games} />
            </Suspense>
          </CardAction>
        </CardHeader>
        <CardContent className="p-0">
          <Suspense fallback={<div>Carregando...</div>}>
            <SubscriptionList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
