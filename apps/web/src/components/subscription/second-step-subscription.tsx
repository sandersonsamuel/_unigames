import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useNewSubscription } from "./new-subscription-provider";

export const SecondStepSubscription = () => {
  const { form, currentGame, nextStep } = useNewSubscription();

  const onNext = () => {
    form.trigger(["persons"]).then((isValid) => {
      if (isValid) {
        nextStep();
      }
    });
  };

  return (
    <>
      {currentGame &&
        [...new Array(currentGame.teamSize)].map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <FormField
              key={index}
              control={form.control}
              name={`persons.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome do jogador {index + 1}{" "}
                    <b className="text-red-500">*</b>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      variantSize="sm"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`persons.${index}.registration`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value ?? ""}
                      variantSize="sm"
                    />
                  </FormControl>
                  <FormDescription />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}

      <p className="text-sm text-muted-foreground">
        Se não tiver matrícula, deixe em branco.
      </p>

      <Button type="button" onClick={onNext}>
        Próximo
      </Button>
    </>
  );
};
