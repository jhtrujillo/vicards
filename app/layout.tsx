import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Vicars Muebles - Calidad y Diseño",
  description: "Descubre la elegancia en cada rincón.",
};

import { PrismaClient } from "@prisma/client";

import WhatsAppWidget from "./components/WhatsAppWidget";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prisma = new PrismaClient();
  const topCategories = await prisma.category.findMany({
    take: 4,
    orderBy: { products: { _count: 'desc' } }
  });

  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Header categories={topCategories} />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
