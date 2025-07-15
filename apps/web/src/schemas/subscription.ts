import z from "zod";

export const newSubscriptionSchema = z.object({
  persons: z.array(
    z.object({
      name: z
        .string({
          required_error: "Nome é obrigatório",
        })
        .min(2, "Nome deve ter no mínimo 2 caracteres"),
      registration: z
        .string({
          required_error: "Registro é obrigatório",
        })
        .length(8, "Registro deve ter 8 caracteres")
        .optional(),
    })
  ),
  gameId: z.string(),
});
