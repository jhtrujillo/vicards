import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tienda de Muebles",
  description: "Explora nuestro catálogo completo de muebles para salas, alcobas, comedores y más. Diseños exclusivos y calidad garantizada.",
  keywords: ["tienda de muebles", "catálogo de muebles", "comprar muebles online", "muebles modernos", "vicards tienda"],
};

export default function TiendaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
