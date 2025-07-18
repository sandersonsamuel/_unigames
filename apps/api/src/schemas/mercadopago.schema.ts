import z from "zod/v4";

export const mercadoPagoWebhookSchema = z.object({
  type: z.string(),
  data: z.object({ id: z.string() })
});
