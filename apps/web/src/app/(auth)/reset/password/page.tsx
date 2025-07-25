"use client";

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
import { IMAGES } from "@/constants/images";
import { ResetPasswordFormValues, resetPasswordSchema } from "@/schemas/reset-password";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { resetPasswordAction } from "./actions";
import {
  UnigamesWarningLayout,
  WarningText,
} from "@/components/unigames-warning-layout";

const ResetPasswordPage = () => {
  const params = useSearchParams();

  const code = params.get("code");

  if (!code) {
    return (
      <UnigamesWarningLayout>
        <WarningText>
          Código de redefinição de senha inválido ou expirado.
        </WarningText>
      </UnigamesWarningLayout>
    );
  }

  const unigamesLogo = IMAGES.get("logo-unigames");
  const router = useRouter();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    const { error } = await resetPasswordAction(data, code);

    if (error) {
      return toast.error(error);
    }

    toast.success("Senha redefinida com sucesso!");
    router.push("/subscribe");
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

      <div className="w-full max-w-md space-y-3">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Redefinir Senha</h1>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Digite sua nova senha"
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
                  <FormLabel>Confirmar Nova Senha</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirme sua nova senha"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2.5">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Redefinindo..."
                  : "Redefinir Senha"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
