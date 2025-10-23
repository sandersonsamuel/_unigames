import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { GameCardInfos } from "./game-card-infos";
import { getGames } from "@/http/api/games-api";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const GamesList = async ({ className, ...rest }: Props) => {
  const games = await getGames();

  return (
    <>
      {games && games.length > 0 && (
        <div className="flex flex-col gap-5">
          <h2>Adicionados recentemente:</h2>
          <div {...rest} className={cn("flex flex-wrap gap-3", className)}>
            {games.map((game) => (
              <GameCardInfos game={game} key={game.id} />
            ))}
          </div>
        </div>
      )}

      {games.length == 0 && (
        <div>
          <p>Nenhum jogo foi cadastrado no sistema!</p>
        </div>
      )}
    </>
  );
};
