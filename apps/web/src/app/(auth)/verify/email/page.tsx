import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Verificar Email",
  description: "Página para verificar o email após o cadastro.",
};

import {
  UnigamesWarningLayout,
  WarningText,
} from "@/components/unigames-warning-layout";

export default function VerifyEmail() {
  return (
    <UnigamesWarningLayout>
      <WarningText>
        Confirme seu cadastro com o link enviado para seu email.
      </WarningText>
    </UnigamesWarningLayout>
  );
}
