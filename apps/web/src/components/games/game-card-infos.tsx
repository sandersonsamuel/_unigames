import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GameType } from "@/types/games";
import Image from "next/image";
import { DeleteGameAlert } from "./delete-game-alert";
import { EditGameDialog } from "./edit-game-dialog";

interface GameCardInfosProps {
  game: GameType;
}

export const GameCardInfos = ({ game }: GameCardInfosProps) => {
  return (
    <Card className="w-[350px] relative">
      <CardHeader>
        <CardTitle>{game.name}</CardTitle>
        {game.description && (
          <CardDescription title={game.description} className="line-clamp-3">
            {game.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {game.image && (
          <div className="relative w-full h-40 mb-4">
            <Image
              src={game.image}
              alt={`Imagem do jogo ${game.name}`}
              layout="fill"
              objectFit="cover"
              className="rounded-md"
            />
          </div>
        )}
        <div className="grid w-full items-center gap-1">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium leading-none">
              Preço:{" "}
              <span className="text-sm text-muted-foreground">
                R$ {(game.price / 100).toFixed(2)}
              </span>{" "}
            </p>
          </div>
          <Separator className="my-1" />
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium leading-none">
              Vagas totais:{" "}
              <span className="text-muted-foreground">{game.vacancies}</span>
            </p>
          </div>
          <Separator className="my-1" />
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium leading-none">
              Tamanho do time:{" "}
              <span className="text-sm text-muted-foreground">
                {game.teamSize}
              </span>
            </p>
          </div>
        </div>

        <div className="absolute flex gap-1 top-[-4px] right-3">
          <EditGameDialog game={game} />
          <DeleteGameAlert gameId={game.id} />
        </div>
      </CardContent>
    </Card>
  );
};
