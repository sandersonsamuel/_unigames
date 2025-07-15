import { signupSchema } from "@/schemas/signup";
import z from "zod";

export type SignupFormValues = z.infer<typeof signupSchema>;
