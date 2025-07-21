import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TabsContent } from "@/components/ui/tabs";
import { getGamesStats } from "@/http/api/dashboard-api";
import { formatGameStatus } from "@/lib/utils";
import { Trophy, Users } from "lucide-react";
import { Badge } from "../ui/badge";

export const GamesTab = async () => {
  const gamesStats = await getGamesStats();

  if (gamesStats) {
    return (
      <TabsContent
        value="games"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {gamesStats.map((game) => {
          const totalSlots = (game.vacancies || 0) * game.teamSize;
          const progressPercentage =
            totalSlots > 0 ? (game.competitorsCount / totalSlots) * 100 : 0;

          return (
            <Card key={game.id}>
              <CardHeader className="pb-4">
                <div className="flex gap-3 items-start">
                  <img
                    src={game.image || "/placeholder.svg"}
                    alt={`${game.name} logo`}
                    className="size-[70px] object-cover"
                  />
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-lg line-clamp-1">
                      {game.name}
                    </CardTitle>
                    <Badge variant={formatGameStatus(game.status).variant}>
                      {formatGameStatus(game.status).label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Jogadores</p>
                    <p className="text-xl font-bold">
                      {game.competitorsCount}/{totalSlots}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Times</p>
                    <p className="text-xl font-bold">{game.teams}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Preço</p>
                    <p className="text-xl font-bold">
                      R$ {(game.price / 100).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Receita</p>
                    <p className="text-xl font-bold">
                      R$ {(game.revenue / 100).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Progress value={progressPercentage} className="h-2" />
                  <p className="text-sm text-muted-foreground">
                    {Math.round(progressPercentage)}% das vagas preenchidas
                  </p>
                </div>

                <div className="flex items-start justify-between gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>
                      {game.teamSize}{" "}
                      {game.teamSize === 1 ? "jogador" : "jogadores"}
                    </span>
                  </div>
                  {game.competition && (
                    <div className="flex items-center gap-1">
                      <Trophy className="w-4 h-4" />
                      <span>Competitivo</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </TabsContent>
    );
  }
};
