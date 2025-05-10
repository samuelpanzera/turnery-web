import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/headers/Header";

export const metadata: Metadata = {
  title: "TornoMix - Tornearia e soldas",
  description: "Site da empresa de tornearia, para orçamentos e serviços",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={`antialiased min-h-screen relative`}>
        <Header />

        {children}
      </body>
    </html>
  );
}
