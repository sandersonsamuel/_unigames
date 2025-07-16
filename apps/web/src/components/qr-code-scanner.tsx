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

  const { mutateAsync } = useSetTicketRemeeded();

  useEffect(() => {
    scannerRef.current = new Html5Qrcode("reader");
    return () => {
      scannerRef.current?.stop().catch(console.error);
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
    } catch (err) {
      console.error("Failed to start scanning:", err);
    }
  };

  const stopScan = async () => {
    if (!scannerRef.current) return;

    try {
      await scannerRef.current.stop();
      scannerRef.current.clear();
      setIsScanning(false);
    } catch (err) {
      console.error("Failed to stop scanning:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        id="reader"
        className="w-[300px] h-auto border-4 flex items-center justify-center mt-12"
      />

      {!isScanning && (
        <div className="flex h-[300px] items-center justify-center">
          <ScanLine size={250} />
        </div>
      )}

      {!isScanning ? (
        <Button onClick={startScan} className="px-4 py-2 w-[300px]">
          Iniciar scan
        </Button>
      ) : (
        <Button onClick={stopScan} className="px-4 py-2 w-[300px]">
          Parar de escanear
        </Button>
      )}
    </div>
  );
}
