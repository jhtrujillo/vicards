import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Ponte en contacto con Vicards Muebles. Encuéntranos en nuestras sedes o escríbenos por WhatsApp para brindarte la mejor asesoría en mobiliario.",
  keywords: ["contacto muebles", "cotizar muebles", "sedes vicards", "comprar muebles", "atención al cliente muebles"],
};

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
