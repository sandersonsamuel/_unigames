import { CreateSubscriptionResponseType, CreateSubscriptionType } from "@/@types/subscription";
import { getUser } from "@/app/actions/user";
import { apiClient } from "@/http/client";
import { useMutation } from "@tanstack/react-query";

export const useCreateSubscription = () => {
  return useMutation({
    mutationFn: async ({
      gameId,
      competitors
    }: CreateSubscriptionType) => {

      const user = await getUser()

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const email = user.email
      const userId = user.id

      const response = await apiClient("/purchases/subscribe", {
        method: "POST",
        body: JSON.stringify({
          gameId,
          email,
          userId,
          competitors
        })
      });

      return response.json() as Promise<CreateSubscriptionResponseType>
    }
  })
};