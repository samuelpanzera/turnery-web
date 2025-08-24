import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Analytics from "@/lib/analytics";

export const metadata: Metadata = {
  title: "TornoMix - Tornearia e soldas",
  description: "Site da empresa de tornearia, para orçamentos e serviços",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0A1E33" />
        <Analytics />
      </head>
      <body className={`antialiased min-h-screen relative bg-gray-900`}>
        <Header />
        <main className="flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
