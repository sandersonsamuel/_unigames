"use client";

import { useSetTicketRemeeded } from "@/http/hooks/use-competitors";
import { Html5Qrcode } from "html5-qrcode";
import { ScanLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

export default function CustomQrCodeScanner() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const isActuallyRunningRef = useRef(false);

  const { mutateAsync } = useSetTicketRemeeded();

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");
    return () => {
      if (isActuallyRunningRef.current) {
        scannerRef.current?.stop().catch(() => {});
        isActuallyRunningRef.current = false;
      }
    };
  }, []);

  const startScan = async () => {
    if (!scannerRef.current) return;

    try {
      await scannerRef.current.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (competitorId: string) => {
          stopScan();
          toast.promise(mutateAsync(competitorId), {
            loading: "Escaneando...",
            success: "Código scaneado com sucesso!",
            error: (err) => err.message,
          });
        },
        (errorMessage) => {
          console.warn(`Scan error: ${errorMessage}`);
        }
      );
      setIsScanning(true);
      isActuallyRunningRef.current = true;
    } catch (err) {
      console.error("Failed to start scanning:", err);
    }
  };

  const stopScan = async () => {
    if (!scannerRef.current) return;
    if (!isActuallyRunningRef.current) return;
    try {
      await scannerRef.current.stop();
      scannerRef.current.clear();
      setIsScanning(false);
      isActuallyRunningRef.current = false;
    } catch (err) {
      
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        id="reader"
        className="w-full max-w-xs h-auto flex items-center justify-center rounded-lg"
      />

      {!isScanning && (
        <div className="flex h-[250px] items-center justify-center">
          <ScanLine size={200} />
        </div>
      )}

      {!isScanning ? (
        <Button onClick={startScan} className="px-4 py-2 w-full max-w-xs">
          Iniciar leitura
        </Button>
      ) : (
        <Button
          onClick={stopScan}
          className="px-4 py-2 w-full max-w-xs"
          variant="secondary"
        >
          Parar leitura
        </Button>
      )}
      <span className="text-sm text-muted-foreground text-center">
        Certifique-se de que o QR Code esteja visível e bem iluminado para uma
        leitura rápida.
      </span>
    </div>
  );
}
