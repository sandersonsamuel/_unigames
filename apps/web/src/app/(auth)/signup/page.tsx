"use client";

import { SignupFormValues } from "@/@types/signup";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { GOOGLE_LOGO, IMAGES } from "@/constants/images";
import { signupSchema } from "@/schemas/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupAction } from "./actions";
import toast from "react-hot-toast";
import Link from "next/link";

const SignupPage = () => {
  const unigamesLogo = IMAGES.get("logo-unigames");
  const router = useRouter();

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    const { error } = await signupAction(data);
    if (error) {
      return toast.error(error);
    }

    router.push("/verify/email");
  };

  const handleGoogleLogin = async () => {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {unigamesLogo && (
        <div className="mb-3">
          <Image
            onClick={() => router.push("/")}
            className="w-[400px]  h-auto"
            src={unigamesLogo.src}
            width={400}
            height={47}
            alt={unigamesLogo.alt}
          />
        </div>
      )}

      <div className="w-full max-w-md space-y-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Cadastrar</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="new-password"
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2.5">
              <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full"
                onClick={handleGoogleLogin}
              >
                {GOOGLE_LOGO} Entrar com Google
              </Button>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Cadastrar..." : "Cadastrar"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          Já tem uma conta?{" "}
          <Link href="/signin" className="underline hover:text-primary">
            Entrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
