import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";

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
  metadataBase: new URL('https://vicarsmuebles.com'),
  title: {
    template: '%s | Vicards Muebles',
    default: 'Vicards Muebles - Calidad y Diseño Excepcional',
  },
  description: 'Fabricantes directos de muebles de alta calidad con más de 15 años de experiencia. Transformamos espacios con mobiliario de vanguardia para tu hogar.',
  keywords: ['muebles', 'salas', 'comedores', 'alcobas', 'muebles colombia', 'fabricantes de muebles', 'diseño interior', 'vicards muebles', 'muebles premium'],
  openGraph: {
    title: 'Vicards Muebles - Calidad y Diseño Excepcional',
    description: 'Fabricantes directos de muebles de alta calidad con más de 15 años de experiencia. Transformamos espacios con mobiliario de vanguardia para tu hogar.',
    url: 'https://vicarsmuebles.com',
    siteName: 'Vicards Muebles',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Vicards Muebles Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vicards Muebles - Calidad y Diseño Excepcional',
    description: 'Fabricantes directos de muebles de alta calidad con más de 15 años de experiencia.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppWidget />
      </body>
    </html>
  );
}
