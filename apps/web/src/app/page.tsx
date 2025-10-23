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
  const games = getGames();

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

      <section className="w-full p-10 px-5 md:px-10 bg-secondary-foreground flex flex-col items-center">
        <h2 className="text-3xl font-bold text-center xl:text-4xl mb-10">
          Principais Regras
        </h2>

        <ul className="flex flex-col gap-6 text-lg max-w-4xl">
          <li>⚠️ Não danificar ou forçar os controles.</li>
          <li>⚠️ Chegar no horário da partida (tolerância de 5 minutos).</li>
          <li>
            ⚠️ Proibido qualquer tipo de agressão, zombaria ou desrespeito.
          </li>
          <li>⚠️ Apenas configurações padrão dos jogos são permitidas.</li>
          <li>
            ⚠️ Jogadores mobile devem verificar se o jogo roda bem no próprio
            celular.
          </li>
          <li>⚠️ Tolerância zero para quem descumprir as regras.</li>
        </ul>
      </section>
      <section className="w-full p-10 px-5 md:px-10">
        <h2 className="text-2xl font-bold text-center xl:text-3xl mb-10">
          Colaboradores
        </h2>
        <div className="flex w-full justify-center gap-5">
          <img
            title="Animes Geek"
            className="w-[100px] sm:w-[200px] mix-blend-lighten"
            src="animesgeek.png"
            alt="logo animes geek"
          />
          <img title="Bitmail" className="w-[100px] sm:w-[200px]" src="bitmail.png" alt="logo bit mail" />
          <img title="Nerd Figures" className="w-[100px] sm:w-[200px] mix-blend-lighten" src="nerd_figures.png" alt="logo nerd figures" />
        </div>
      </section>
      <footer className="w-full text-center text-xs sm:text-start sm:text-lg p-10 px-5 md:px-10 bg-secondary-foreground flex flex-col items-center">
        <p>Software desenvolvido pela LAADS</p>
      </footer>
    </main>
  );
}
