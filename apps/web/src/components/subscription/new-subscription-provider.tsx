import { GameByIdType, GameResponseType } from "@/@types/games";
import { SubscriptionType } from "@/@types/subscription";
import { createContext, useContext } from "react";
import { UseFormReturn } from "react-hook-form";

type NewSubscriptionContextType = {
  games: GameResponseType[];
  nextStep: () => void;
  step: number;
  form: UseFormReturn<SubscriptionType>;
  previousStep: () => void;
  currentGame: GameByIdType | null;
  setCurrentGame: (game: GameByIdType) => void;
};

export const newSubscriptionContext =
  createContext<NewSubscriptionContextType | null>(null);

export const useNewSubscription = () => {
  const context = useContext(newSubscriptionContext);

  if (!context) {
    throw new Error(
      "useNewSubscription must be used within a NewSubscriptionProvider"
    );
  }

  return context;
};
