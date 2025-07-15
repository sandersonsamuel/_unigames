"use client";

import { GameResponseType } from "@/types/games";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";

type Props = {
  game: GameResponseType;
};

export const GameCard = ({ game }: Props) => {
  return (
    <motion.div
      className="w-[250px] h-[300px] max-h-[350px] cursor-pointer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>
            <Image src={game.image} alt={game.name} width={250} height={250} />
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm line-clamp-2 break-words">
          {game.name}
        </CardContent>
      </Card>
    </motion.div>
  );
};
