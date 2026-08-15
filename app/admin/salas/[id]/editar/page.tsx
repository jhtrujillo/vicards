import { PrismaClient } from "@prisma/client";
import SalaForm from "../../SalaForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditarSalaPage({ params }: { params: { id: string } }) {
  const prisma = new PrismaClient();
  const sala = await prisma.experience.findUnique({
    where: { id: parseInt(params.id) }
  });

  if (!sala) {
    notFound();
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/salas" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-sm font-medium w-fit mb-4">
          <ArrowLeft size={16} /> Volver a Salas
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Editar Sala: {sala.title}</h1>
        <p className="text-sm text-gray-500 mt-1">Actualiza la información de esta sala de experiencia.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <SalaForm sala={sala} isNew={false} />
      </div>
    </div>
  );
}
