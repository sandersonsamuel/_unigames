import z from "zod/v4";

export type competitorsType = z.infer<typeof competitorsSchema>;

export const competitorsSchema = z.array(z.object({
  name: z.string(),
  registration: z.string().optional(),
}))