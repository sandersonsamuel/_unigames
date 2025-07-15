import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const font = Press_Start_2P({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s - Unigames",
    default: "Unigames",
  },
  description: "Evento de jogos eletrônicos da Unifacema",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${font.className} antialiased bg-gradient-to-r from-[#010A2C] to-[#160117] min-h-screen`}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
