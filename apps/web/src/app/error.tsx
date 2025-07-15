"use client";

import { Button } from "@/components/ui/button";
import { IMAGES } from "@/constants/images";
import Image from "next/image";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error }: Props) {
  console.log(error);
  const unigamesLogo = IMAGES.get("logo-unigames");

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="max-w-2xl flex flex-col gap-4">
        {unigamesLogo && (
          <Image
            src={unigamesLogo.src}
            width={400}
            height={300}
            alt={unigamesLogo.alt}
          />
        )}
        <h1 className="text-4xl font-bold">Ops! Algo deu errado.</h1>
        <p className="text-sm truncate line-clamp-6">{error.message}</p>
        <Button size={"lg"} onClick={() => location.reload()}>
          Tentar novamente
        </Button>
      </span>
    </div>
  );
}
