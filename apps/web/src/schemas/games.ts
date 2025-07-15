import z from "zod";

export const createGamesSchema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .nonempty("Nome é obrigatório"),
    description: z
      .string({
        required_error: "Descrição é obrigatória",
      })
      .nonempty("Descrição é obrigatória"),
    image: z
      .string({
        required_error: "Imagem é obrigatória",
      })
      .url({
        message: "Imagem deve ser uma URL válida",
      }),
    price: z.coerce
      .number({
        required_error: "Preço é obrigatório",
      })
      .int(),
    vacancies: z.coerce
      .number({
        required_error: "Quantidade é obrigatória",
      })
      .int()
      .optional(),
    teamSize: z.coerce
      .number({
        required_error: "Tamanho do time é obrigatório",
      })
      .int()
      .min(1, "Tamanho do time deve ser maior que 0"),
    competition: z.boolean({
      required_error: "Competição é obrigatória",
    }),
  })
  .refine(
    (data) => {
      if (data.competition) {
        return typeof data.vacancies === "number" && data.vacancies > 0;
      }
      return true;
    },
    {
      message: "Vagas devem ser definidas para competições",
      path: ["vacancies"],
    }
  );
