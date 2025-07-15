import z from "zod";

export const signupSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .min(3, "Nome deve ter pelo menos 3 caracteres"),
    email: z
      .string({
        required_error: "Email é obrigatório",
      })
      .min(3, "Email deve ter pelo menos 3 caracteres")
      .email("Email deve ter um formato válido"),
    password: z
      .string()
      .min(8, "Senha precisa ter pelo menos 8 caracteres")
      .refine(
        (val) => /[a-z]/.test(val),
        "Deve conter ao menos uma letra minúscula"
      )
      .refine(
        (val) => /[A-Z]/.test(val),
        "Deve conter ao menos uma letra maiúscula"
      )
      .refine((val) => /[0-9]/.test(val), "Deve conter ao menos um número")
      .refine(
        (val) => /[^A-Za-z0-9]/.test(val),
        "Deve conter ao menos um símbolo"
      ),
    confirmPassword: z
      .string({
        required_error: "Confirmação de senha é obrigatória",
      })
      .min(6, "Confirmação de senha deve ter pelo menos 6 caracteres")
      .max(100, "Confirmação de senha deve ter no máximo 100 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
  });
