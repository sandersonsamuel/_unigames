"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteGameMutation } from "@/http/hooks/use-games";

type Props = {
  gameId: string;
};

export const DeleteGameAlert = ({ gameId }: Props) => {
  const { mutateAsync: deleteGame } = useDeleteGameMutation();

  const handleDeleteGame = async () => {
    try {
      await deleteGame(gameId);
      toast.success("Jogo excluído com sucesso!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-destructive/85 p-1 shadow-2xl hover:bg-destructive/70 transition-colors">
          <Trash size={20} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tem certeza que deseja excluir o jogo?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Isso não pode ser desfeito.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-4">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteGame}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
