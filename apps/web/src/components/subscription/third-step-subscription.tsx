import { useNewSubscription } from "./new-subscription-provider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "../ui/button";

export const ThirdStepSubscription = () => {
  const { form, currentGame } = useNewSubscription();
  const { persons } = form.watch();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo da Inscrição</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-primary text-lg">
          <p>{currentGame?.name}</p>
          <p>
            Valor:{" "}
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format((currentGame?.price ?? 0) / 100)}
          </p>
        </div>
        <Separator />
        <div className="space-y-2">
          <h3 className="font-semibold">Jogadores</h3>
          <ul className="space-y-2 text-primary">
            {persons?.map((person, index) => (
              <li key={index}>
                <p>
                  <span className="font-semibold">- P{index + 1}:</span>{" "}
                  {person.name}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Confirmando..." : "Confirmar e Pagar"}
        </Button>
      </CardContent>
    </Card>
  );
};
