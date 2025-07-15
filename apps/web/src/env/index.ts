import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_CLIENT_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
    NEXT_PUBLIC_EVENT_DATE: z.string().min(1),
    NEXT_PUBLIC_EVENT_TIME: z
      .string()
      .min(2)
      .transform((val) => parseInt(val)),
    NEXT_PUBLIC_API_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_EVENT_DATE: process.env.NEXT_PUBLIC_EVENT_DATE,
    NEXT_PUBLIC_EVENT_TIME: process.env.NEXT_PUBLIC_EVENT_TIME,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
  },
});
