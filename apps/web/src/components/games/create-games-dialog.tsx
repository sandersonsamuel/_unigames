"use client";

import { CreateGameType } from "@/@types/games";
import { createGameAction } from "@/app/(protected)/(admin)/games/actions";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createGamesSchema } from "@/schemas/games";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
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
import { Checkbox } from "../ui/checkbox";

export const CreateGamesDialog = () => {
  const form = useForm<CreateGameType>({
    resolver: zodResolver(createGamesSchema),
    defaultValues: {
      description: "",
      image: "",
      name: "",
      price: 0,
      vacancies: 0,
      teamSize: 0,
      competition: true,
    },
  });

  const onSubmit = async (data: CreateGameType) => {
    try {
      await createGameAction(data);
      toast.success("Jogo adicionado com sucesso!");
      form.reset();
    } catch (error) {
      toast.error("Erro ao adicionar o jogo!");
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Adicionar</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do jogo</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                {form.formState.isSubmitting ? "Criando..." : "Adicionar"}
              </Button>
            </span>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
