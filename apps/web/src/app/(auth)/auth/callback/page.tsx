"use client";

import {
  UnigamesWarningLayout,
  WarningText,
} from "@/components/unigames-warning-layout";

import { redirect, useSearchParams } from "next/navigation";
import { callbackAction } from "./actions";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function CallbackPage() {
  const params = useSearchParams();
  const code = params.get("code");
  const [error, setError] = useState<string | null>(null);

  const handleCallback = async () => {
    const { error } = await callbackAction(code!);
    if (error) {
      setError(error.message);
    }

    redirect("/dashboard");
  };

  useEffect(() => {
    if (code) {
      handleCallback();
    }
  }, [code]);

  return (
    <UnigamesWarningLayout>
      <WarningText>
        {!error && code
          ? "Estamos processando sua autenticação..."
          : !error && !code
          ? "Código de autenticação inexistente"
          : "Erro ao autenticar: " + error}
      </WarningText>
      {!error && code && <Spinner size={64} />}
    </UnigamesWarningLayout>
  );
}
