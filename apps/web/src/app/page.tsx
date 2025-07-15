import { getGames } from "@/http/api/games-api";
import {
  SwiperGamesList,
  SwiperGamesListSkeleton,
} from "@/components/games/swiper-games-list";
import { MainInfoSection } from "@/components/main-info-section";
import StopWatch from "@/components/stop-watch";

import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Página Inicial",
  description: "Página inicial da aplicação Unigames",
};

export default async function Home() {
  const games = getGames()

  return (
    <main className="min-h-screen mt-10 md:mt-20">
      <MainInfoSection />
      <section className="w-full bg-secondary-foreground">
        <StopWatch />
      </section>
      <section className="w-full p-10 px-5 md:px-10">
        <h2 className="text-3xl font-bold text-center xl:text-4xl mb-10">
          Jogos disponíveis
        </h2>
        <Suspense fallback={<SwiperGamesListSkeleton />}>
          <SwiperGamesList gamesPromise={games} />
        </Suspense>
      </section>
      <section className="w-full p-10 px-5 md:px-10 bg-secondary-foreground">
        <h2 className="text-2xl font-bold text-center xl:text-3xl mb-10">
          Colaboradores
        </h2>
      </section>
    </main>
  );
}
