"use client";

import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  redirectTo: string;
};

export const RedirectSubscribeButton = ({ redirectTo }: Props) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push(redirectTo)}
      size={"lg"}
      variant={"secondary"}
      className="text-2xl"
    >
      INSCREVA-SE
    </Button>
  );
};
