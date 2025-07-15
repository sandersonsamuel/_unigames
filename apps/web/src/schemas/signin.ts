import z from "zod";

export const signinSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .min(3, "Email é obrigatório")
    .email("Email deve ter um formato válido"),
  password: z
    .string({ required_error: "Senha é obrigatório" })
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(100, "Senha deve ter no máximo 100 caracteres"),
});
