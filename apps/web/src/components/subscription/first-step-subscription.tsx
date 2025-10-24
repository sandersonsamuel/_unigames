"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "../ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useNewSubscription } from "./new-subscription-provider"
import { useEffect } from "react"
import { useGameByIdQuery } from "@/http/hooks/use-games"

export const FirstStepSubscription = () => {
  const {
    form: { control, watch },
    games,
  } = useNewSubscription()

  const gameId = watch("gameId")

  return (
    <>
      <FormField
        control={control}
        name="gameId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Selecione o jogo</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Jogo" />
                </SelectTrigger>
                <SelectContent>
                  {games.map((game) => (
                    <SelectItem value={game.id} key={game.id}>
                      {game.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        )}
      />

      {gameId && <SubscriptionGameCard />}
    </>
  )
}
export const SubscriptionGameCard = () => {
  const { form, nextStep, setCurrentGame } = useNewSubscription()
  const gameId = form.watch("gameId")

  const { data: game } = useGameByIdQuery(gameId)

  const onNext = () => {
    form.trigger("gameId").then(() => {
      nextStep()
    })
  }

  useEffect(() => {
    if (game) {
      setCurrentGame(game)
    }
  }, [game])

  const gameVancanciesLeft = (game?.vacancies || 0) - (game?.purchasesCount || 0)

  if (game) {
    return (
      <Card className="gap-0">
        <CardHeader className="px-4">
          <CardTitle className="text-base sm:text-lg">{game.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-2 px-4">
          <p className="text-xs text-justify line-clamp-3 sm:line-clamp-none">{game.description}</p>
          <div className="flex flex-wrap justify-between items-center">
            <p className="text-bold text-primary text-xl sm:text-2xl">R${(game.price / 100).toFixed(2)}</p>
            <p className="text-bold text-primary text-sm sm:text-base">{gameVancanciesLeft} vagas</p>
          </div>
        </CardContent>
        <CardFooter className="mt-2 px-4">
          <Button
            onClick={onNext}
            type="button"
            disabled={gameVancanciesLeft <= 0}
            size={"default"}
            className="w-full text-base sm:text-lg"
          >
            Inscrever-se
          </Button>
        </CardFooter>
      </Card>
    )
  }
}
