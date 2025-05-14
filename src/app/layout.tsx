import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/headers/Header";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "TornoMix - Tornearia e soldas",
  description: "Site da empresa de tornearia, para orçamentos e serviços",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A1E33" />
      </head>
      <body className={`antialiased min-h-screen relative bg-gray-900`}>
        <Header />
        <main className="flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
