import { Button } from "../ui/button";
import { fetcher } from "@/lib/fetcher";

export const DownloadCompetitorsList = async () => {
  const promise = await fetcher<Blob>("/dashboard/competitors/sheet");
  console.log(promise);

  return (
    <Button className="self-start p-0" variant="link">
      Baixar lista de competidores
    </Button>
  );
};
