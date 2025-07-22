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
    <div className="flex flex-col items-center p-4 gap-3 w-full mx-auto">
      <Card className="w-full bg-transparent border-none">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl">Meus Ingressos</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Ingressos adquiridos
          </CardDescription>
          <CardAction>
            <Suspense fallback={<Button>Nova inscrição</Button>}>
              <NewSubscriptionDialog gamesPromise={games} />
            </Suspense>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Carregando...</div>}>
            <SubscriptionList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
