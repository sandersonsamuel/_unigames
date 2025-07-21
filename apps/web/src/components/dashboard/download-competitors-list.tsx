"use client";

import { Button } from "../ui/button";
import { fetcher } from "@/lib/fetcher";

export const DownloadCompetitorsList = () => {
  const handleDownload = async () => {
    try {
      const blob = await fetcher<Blob>("/dashboard/competitors/sheet");
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "unigames-participantes.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao baixar o arquivo", error);
    }
  };

  return (
    <Button onClick={handleDownload} className="self-start p-0" variant="link">
      Baixar lista de competidores
    </Button>
  );
};
