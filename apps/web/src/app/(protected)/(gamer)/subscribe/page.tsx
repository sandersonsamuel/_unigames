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
    <div className="flex flex-col items-center p-4 gap-3 w-full  mx-auto">
      {logoUnigames && (
        <Link href={"/"}>
          <Image
            src={logoUnigames.src}
            width={220}
            height={32}
            alt={logoUnigames.alt}
            className="w-[220px] h-auto md:w-[400px]"
            priority
          />
        </Link>
      )}
      <h3 className="text-lg text-center md:text-xl">
        Torneio de jogos eletrônicos Unifacema
      </h3>

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
