import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerenciar Jogos",
  description: "Página para gerenciar os jogos da aplicação Unigames.",
};

import { CreateGamesDialog } from "@/components/games/create-games-dialog";
import { GamesList } from "@/components/games/games-list";

export default async function Games() {
  return (
    <div className="p-3 px-5 w-full flex flex-col gap-5">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Jogos</h1>
        <CreateGamesDialog />
      </header>

      <p className="text-sm">Adicione os que estarão presentes no evento.</p>

      <h2>Adicionados recentemente:</h2>

      <GamesList />
    </div>
  );
}
