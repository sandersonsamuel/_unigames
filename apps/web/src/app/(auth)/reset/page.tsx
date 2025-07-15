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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { requestResetPasswordAction } from "./actions";
import {
  RequestResetPasswordFormValues,
  requestResetPasswordSchema,
} from "@/schemas/reset-password";

const RequestResetPasswordPage = () => {
  const unigamesLogo = IMAGES.get("logo-unigames");

  const router = useRouter();

  const form = useForm<RequestResetPasswordFormValues>({
    resolver: zodResolver(requestResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: RequestResetPasswordFormValues) => {
    const { error } = await requestResetPasswordAction(data);

    if (error) {
      return toast.error(error);
    }

    toast.success("Link de redefinição de senha enviado para o seu email.");
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
        <h1 className="text-3xl font-bold text-center">Redefinir Senha</h1>
        <p className="text-muted-foreground text-sm text-center">
          Informe seu email para receber o link de redefinição de senha.
        </p>

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

            <div className="space-y-2.5">
              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting
                  ? "Enviando..."
                  : "Enviar link de redefinição"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default RequestResetPasswordPage;
