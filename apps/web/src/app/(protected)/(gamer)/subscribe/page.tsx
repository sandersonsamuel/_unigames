import { IMAGES } from "@/constants/images";
import Image from "next/image";

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
import Link from "next/link";
import { Suspense } from "react";
import { getGames } from "@/http/api/games-api";

export default async function Subscribe() {
  const logoUnigames = IMAGES.get("logo-unigames");
  const games = getGames();

  return (
    <div className="flex flex-col items-center p-5 gap-3">
      {logoUnigames && (
        <Link href={"/"}>
          <Image
            src={logoUnigames.src}
            width={400}
            height={47}
            alt={logoUnigames.alt}
          />
        </Link>
      )}
      <h3 className="text-xl text-center">
        Torneio de jogos eletrônicos Unifacema
      </h3>

      <Card className="w-10/12 bg-transparent border-none">
        <CardHeader>
          <CardTitle className="text-2xl">Meus Ingressos</CardTitle>
          <CardDescription>Ingressos adiquiridos</CardDescription>
          <CardAction>
            <Suspense fallback={<Button>Nova incrição</Button>}>
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
