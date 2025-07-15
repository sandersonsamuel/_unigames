import { signinSchema } from "@/schemas/signin";
import { z } from "zod";

export type SigninFormValues = z.infer<typeof signinSchema>;
