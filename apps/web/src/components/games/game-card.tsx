"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GameType } from "@/types/games";
import { motion } from "motion/react";
import Image from "next/image";

type Props = {
  game: GameType;
};

export const GameCard = ({ game }: Props) => {
  return (
    <motion.div
      className="w-[250px] min-h-[300px] max-h-[350px] cursor-pointer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>
            <Image src={game.image} alt={game.name} width={250} height={250} />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs line-clamp-2 break-words">
          <div className="flex flex-col gap-1">
            <p>{game.name}</p>
            <p className="text-primary/80">
              {game.competition ? "Competitivo" : "livre"}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
