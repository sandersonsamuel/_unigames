import z from "zod";

export const env = z
	.object({
		PORT: z.coerce.number().default(3333),
		DATABASE_URL: z.url().startsWith("postgresql://"),
		CLIENT_URL: z.url(),
    MP_ACCESS_TOKEN: z.string(),
    MP_WEBHOOK_SECRET: z.string(),
	})
	.parse(process.env);
