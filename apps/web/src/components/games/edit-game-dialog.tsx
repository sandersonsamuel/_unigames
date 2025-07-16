"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUpdateGameMutation } from "@/http/hooks/use-games";
import { createGamesSchema } from "@/schemas/games";
import { CreateGameType, GameType } from "@/types/games";
import { zodResolver } from "@hookform/resolvers/zod";
import { SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

type Props = {
  game: GameType;
};

export const EditGameDialog = ({ game }: Props) => {
  const { mutateAsync: updateGame } = useUpdateGameMutation()
  const form = useForm<CreateGameType>({
    resolver: zodResolver(createGamesSchema),
    defaultValues: {
      description: game.description,
      image: game.image,
      name: game.name,
      price: game.price,
      vacancies: game.vacancies,
      teamSize: game.teamSize,
      competition: game.competition,
    },
  });

  const handleEditGame = async (data: CreateGameType) => {
    try {
      await updateGame({ gameId: game.id, game: data });
      toast.success("Jogo editado com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-secondary/85 p-1 shadow-2xl hover:bg-secondary/70 transition-colors">
          <SquarePen size={20} />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar {game.name}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleEditGame)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      variantSize="sm"
                      {...field}
                      placeholder="Nome do jogo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Url da capa</FormLabel>
                  <FormControl>
                    <Input variantSize="sm" {...field} placeholder="Url" />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    Imagem em 1:1 (quadrada) da capa do jogo.
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      variantSize="sm"
                      {...field}
                      placeholder="Descrição do jogo"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preço</FormLabel>
                    <FormControl>
                      <Input
                        variantSize="sm"
                        type="number"
                        {...field}
                        placeholder="R$ 0,00"
                      />
                    </FormControl>
                    <FormDescription>Em centavos</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vacancies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vagas</FormLabel>
                    <FormControl>
                      <Input
                        variantSize="sm"
                        type="number"
                        {...field}
                        placeholder="0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Equipe</FormLabel>
                    <FormControl>
                      <Input
                        variantSize="sm"
                        type="number"
                        {...field}
                        placeholder="1"
                      />
                    </FormControl>
                    <FormDescription>1 = solo</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="competition"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Competição</FormLabel>
                    <FormDescription>
                      Desmarque se o jogo for livre ou sem competição.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <span className="w-full flex justify-end">
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
              </Button>
            </span>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
