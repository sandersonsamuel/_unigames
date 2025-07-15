"use client";

import { SigninFormValues } from "@/types/signin";
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
import { signinSchema } from "@/schemas/signin";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signinAction, signinWithGoogleAction } from "./actions";
import Link from "next/link";
import { redirectByRole } from "@/app/actions/user";

const SigninPage = () => {
  const unigamesLogo = IMAGES.get("logo-unigames");
  const router = useRouter();

  const form = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormValues) => {
    const response = await signinAction(data);

    if (response.status === 'error') {
      return toast.error(response.message);
    }

    toast.success("Login realizado com sucesso!");
    redirectByRole();
  };

  const handleGoogleLogin = async () => {
    const { error, data } = await signinWithGoogleAction();

    if (error) {
      return toast.error(error.message);
    }

    router.push(data.url);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {unigamesLogo && (
        <div className="mb-3">
          <Image
            onClick={() => router.push("/")}
            className="w-[400px] h-auto"
            src={unigamesLogo.src}
            width={400}
            height={47}
            alt={unigamesLogo.alt}
          />
        </div>
      )}

      <div className="w-full max-w-md space-y-2">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Entrar</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
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
                      type="password"
                      placeholder="Digite sua senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-start text-sm text-muted-foreground">
              <Link href="/reset" className="underline hover:text-primary">
                Esqueci minha senha
              </Link>
            </div>

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
                {form.formState.isSubmitting ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
        </Form>

        <div className="text-center text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link href="/signup" className="underline hover:text-primary">
            Cadastre-se
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
