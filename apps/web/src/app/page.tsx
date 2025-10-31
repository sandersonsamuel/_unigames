import { getGames } from "@/http/api/games-api";
import {
  SwiperGamesList,
  SwiperGamesListSkeleton,
} from "@/components/games/swiper-games-list";
import { MainInfoSection } from "@/components/main-info-section";
import StopWatch from "@/components/stop-watch";

import type { Metadata } from "next";
import { Suspense } from "react";
import { Instagram } from "lucide-react";
import Link from "next/link";

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
        <h2 className="text-xl sm:text-3xl font-bold text-center xl:text-4xl mb-10">
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

        <ul className="flex flex-col gap-6 text-lg max-w-4xl text-justify">
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
      <section className="w-full py-10 md:px-10 space-y-5">
        <h2 className="text-xl sm:text-2xl font-bold text-center xl:text-3xl">
          Colaboradores
        </h2>
        <div className="flex w-full justify-center gap-5">
          <img
            title="Animes Geek"
            className="w-[50px] sm:w-[120px] md:w-[150px] mix-blend-lighten"
            src="animesgeek.png"
            alt="logo animes geek"
          />
          <img
            title="Bitmail"
            className="w-[50px] sm:w-[120px] md:w-[150px]"
            src="bitmail.png"
            alt="logo bit mail"
          />
          <img
            title="Nerd Figures"
            className="w-[50px] sm:w-[120px] md:w-[150px] mix-blend-lighten"
            src="nerd_figures.png"
            alt="logo nerd figures"
          />
          <img
            title="Livraria Cultural"
            className="w-[50px] sm:w-[120px] md:w-[150px] mix-blend-lighten"
            src="cultural.png"
            alt="logo livrario cultural"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-5 w-full justify-center items-center text-xs">
          <Link className="flex gap-1 sm:gap-2 items-center" href={"https://www.instagram.com/adsunifacema/"}>
            <Instagram className="size-5 sm:size-6" />
            Ads Unifacema
          </Link>
          <Link className="flex gap-1 sm:gap-2 items-center" href={"https://www.instagram.com/unifacema.centro/"}>
            <Instagram className="size-5 sm:size-6" />
            Unifacema
          </Link>
        </div>
      </section>
      <footer className="w-full text-center text-xs sm:text-start sm:text-lg p-10 px-5 md:px-10 bg-secondary-foreground flex flex-col items-center">
        <p>Software desenvolvido pela LAADS</p>
      </footer>
    </main>
  );
}
