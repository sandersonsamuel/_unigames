import {
  UnigamesWarningLayout,
  WarningText,
} from "@/components/unigames-warning-layout";

import { callbackAction } from "@/app/(auth)/auth/callback/actions";
import { Spinner } from "@/components/ui/spinner";
import { Role } from "@/constants/role";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const CallbackComponent = () => {
  const params = useSearchParams();
  const code = params.get("code");
  const [error, setError] = useState<string | null>(null);

  const handleCallback = async () => {
    const { error, data } = await callbackAction(code!);
    if (error) {
      setError(error.message);
    }

    redirect(
      data.user?.user_metadata.role == Role.ADMIN ? "/dashboard" : "/subscribe"
    );
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
};
