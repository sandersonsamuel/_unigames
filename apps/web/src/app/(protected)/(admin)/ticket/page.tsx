import QrCodeScanner from "@/components/qr-code-scanner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Ticket = () => {
  return (
    <div className="flex flex-col p-3 px-5 gap-6 w-full mx-auto mt-3">
      <h1 className="text-3xl font-bold">Validação de Ingressos</h1>
      <p className="text-muted-foreground text-base text-justify mt-1 mb-2">
        Utilize o leitor de QR Code para validar os ingressos dos participantes
        do torneio. O sistema irá marcar o ingresso como resgatado, evitando
        duplicidade e garantindo a segurança do evento.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full mt-2 text-xl" size="lg">
            Abrir scanner
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center gap-4 max-w-md">
          <DialogHeader>
            <DialogTitle>Escanear QR Code</DialogTitle>
            <DialogDescription>
              Aponte a câmera para o QR Code do ingresso. Após a leitura, o
              ingresso será validado automaticamente.
            </DialogDescription>
          </DialogHeader>
          <QrCodeScanner />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Ticket;
