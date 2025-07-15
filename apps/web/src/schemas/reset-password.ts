import z from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Nova senha é obrigatória" })
      .min(6, "Nova senha deve ter pelo menos 6 caracteres")
      .max(100, "Nova senha deve ter no máximo 100 caracteres"),
    confirmPassword: z
      .string({ required_error: "Confirmação de senha é obrigatória" })
      .min(6, "Confirmação de senha deve ter pelo menos 6 caracteres")
      .max(100, "Confirmação de senha deve ter no máximo 100 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const requestResetPasswordSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .min(3, "Email é obrigatório")
    .email("Email deve ter um formato válido"),
});

export type RequestResetPasswordFormValues = z.infer<
  typeof requestResetPasswordSchema
>;

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
