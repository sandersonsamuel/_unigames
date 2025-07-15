import { PersonsTypeResponse, PurchaseType } from "@/types/purchase";
import { Badge } from "@/components/ui/badge";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { toPng } from "html-to-image";
import { Calendar, CreditCard, QrCode, Trophy, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useCallback, useRef, useState } from "react";
import { Button } from "../ui/button";
import { getPaymentMethodLabel, getStatusConfig } from "../subscription/utils";
import { useCompetitorsQuery } from "@/http/hooks/use-competitors";

interface PurchaseDetailsDialogProps {
  purchase: PurchaseType;
}

export function PurchaseDetailsDialog({
  purchase,
}: PurchaseDetailsDialogProps) {
  const [selectedCompetitor, setSelectedCompetitor] =
    useState<PersonsTypeResponse | null>(null);

  const { data: competitors } = useCompetitorsQuery(purchase.id);

  console.log(competitors, purchase);

  const statusConfig = getStatusConfig(purchase.paymentStatus);
  const StatusIcon = statusConfig.icon;

  const ref = useRef<HTMLDivElement>(null);

  const handleDownloadQRCode = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `ingresso_${selectedCompetitor?.name
          .replaceAll(" ", "_")
          .toLocaleLowerCase()}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref, selectedCompetitor]);

  const handleSelectCompetitor = (competitor: PersonsTypeResponse) => {
    setSelectedCompetitor(competitor);
  };

  return (
    <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-xl">Detalhes da Compra</DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Informações do Jogo</h3>
          </div>

          <div className="grid grid-cols-1 gap-3 pl-7">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Nome do Jogo
              </p>
              <p className="font-medium">{purchase.game.name}</p>
            </div>

            {purchase.game.description && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Descrição
                </p>
                <p className="text-sm">{purchase.game.description}</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Detalhes do Pagamento</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 pl-7">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <Badge className={`${statusConfig.className} w-fit`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {statusConfig.label}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">Valor</p>
              <p className="font-semibold text-lg">
                {(purchase.game.price / 100).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Método de Pagamento
              </p>
              <p className="font-medium">
                {getPaymentMethodLabel(purchase.paymentMethod)}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Data da Compra
              </p>
              <p className="font-medium">
                {new Date(purchase.paidAt).toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {competitors && competitors.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-lg">
                  Competidores ({competitors.length})
                </h3>
              </div>

              <div className="pl-7 space-y-3">
                {competitors.map((competitor, index) => (
                  <div
                    key={competitor.id}
                    onClick={() => handleSelectCompetitor(competitor)}
                    className="flex items-center justify-between p-3 bg-accent/30 rounded-lg cursor-pointer hover:bg-accent/75 transition-colors"
                  >
                    <div>
                      <p className="font-medium">{competitor.name}</p>
                      {competitor.registration && (
                        <p className="text-sm text-card-foreground">
                          Matrícula: {competitor.registration}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        #{index + 1}
                      </Badge>
                      <QrCode className="w-5 h-5 text-card-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <Separator />

        {selectedCompetitor ? (
          <div className="flex flex-col items-center p-4 rounded-lg space-y-3">
            <div ref={ref} className="space-y-3">
              <QRCodeSVG
                value={selectedCompetitor.id}
                size={300}
                level="M"
                marginSize={2}
              />
              <p className="text-sm font-semibold text-center">
                {selectedCompetitor.name}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground text-center">
                Use este código para a identificação do competidor.
              </p>
              <Button
                variant={"link"}
                className="w-full"
                onClick={handleDownloadQRCode}
              >
                Download QR Code
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-3 p-4 rounded-lg bg-accent/30 min-h-[300px]">
            <Users className="w-16 h-16 text-muted-foreground" />
            <p className="text-muted-foreground text-center">
              Selecione um competidor acima para ver seu QR Code.
            </p>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            ID da Compra: {purchase.id}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
