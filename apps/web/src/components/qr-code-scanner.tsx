"use client";

import { useEffect, useRef, useState } from "react";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { setTicketReedemedAction } from "@/app/(protected)/(admin)/ticket/actions";
import { QrCode, ScanLine, ScanQrCode } from "lucide-react";

export default function CustomQrCodeScanner() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  // Cria o scanner só uma vez
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
        async (decodedText: string, decodedResult: Html5QrcodeResult) => {
          stopScan();
          toast.promise(setTicketReedemedAction(decodedText), {
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
