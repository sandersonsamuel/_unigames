"use client";

import type { GameByIdType, GameResponseType } from "@/types/games";
import type { SubscriptionType } from "@/types/subscription";
import { newSubscriptionContext } from "@/components/subscription/new-subscription-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateSubscriptionMutation } from "@/http/hooks/use-purchases";
import { newSubscriptionSchema } from "@/schemas/subscription";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowBigLeft } from "lucide-react";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { FirstStepSubscription } from "./first-step-subscription";
import { SecondStepSubscription } from "./second-step-subscription";
import { ThirdStepSubscription } from "./third-step-subscription";

type Props = {
  gamesPromise: Promise<GameResponseType[]>;
};

export const NewSubscriptionDialog = ({ gamesPromise }: Props) => {
  const games = use(gamesPromise);
  const [step, setStep] = useState<number>(0);
  const [currentGame, setCurrentGame] = useState<GameByIdType | null>(null);

  const { mutateAsync: createSubscription } = useCreateSubscriptionMutation();

  const form = useForm<SubscriptionType>({
    resolver: zodResolver(newSubscriptionSchema),
    defaultValues: {
      gameId: "",
    },
  });

  const steps = [
    {
      title: "Escolha um jogo para se inscrever",
      component: <FirstStepSubscription key={1} />,
    },
    {
      title: "Insira os dados da sua inscrição",
      component: <SecondStepSubscription key={2} />,
    },
    {
      title: "Confirme sua inscrição",
      component: <ThirdStepSubscription key={3} />,
    },
  ];

  const nextStep = () => {
    setStep((step) => {
      if (step < steps.length - 1) {
        return step + 1;
      }
      return step;
    });
  };

  const previousStep = () => {
    setStep((step) => {
      if (step > 0) {
        return step - 1;
      }
      return step;
    });
  };

  const currentStep = steps[step];

  const confirmPayment = async (data: SubscriptionType) => {
    try {
      const response = await createSubscription({
        gameId: data.gameId,
        competitors: data.persons,
      });

      if (!response?.initPoint) {
        console.error("initPoint não fornecido na resposta", response);
        return;
      }

      window.location.href = response.initPoint;
    } catch (err) {
      console.error("Erro ao criar inscrição:", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nova Inscrição</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-[500px] px-4 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-xs text-start mt-2 md:text-lg">
            {currentStep.title}
          </DialogTitle>
        </DialogHeader>
        <newSubscriptionContext.Provider
          value={{
            games,
            step,
            nextStep,
            form,
            previousStep,
            currentGame,
            setCurrentGame,
          }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(confirmPayment)}
              className="flex flex-col gap-1 max-h-[calc(85vh-8rem)] overflow-y-auto pr-2"
            >
              {step >= 1 && (
                <span className="flex w-full justify-start">
                  <Button
                    size={"sm"}
                    variant={"secondary"}
                    type="button"
                    onClick={previousStep}
                    className="w-fit mb-4"
                  >
                    <ArrowBigLeft />
                    Voltar
                  </Button>
                </span>
              )}
              {currentStep.component}
            </form>
          </Form>
        </newSubscriptionContext.Provider>
      </DialogContent>
    </Dialog>
  );
};
