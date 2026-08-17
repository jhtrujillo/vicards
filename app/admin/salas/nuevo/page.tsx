"use client"

import Link from "next/link";
import SalaForm from "../SalaForm";

export default function NewSalaPage() {
  const emptySala = {
    id: 0,
    city: "",
    title: "",
    description: "",
    image: ""
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/salas" className="text-gray-500 hover:text-gray-800">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Añadir Nueva Sala de Experiencia</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#70970A]/30">
        <p className="text-sm text-gray-500 mb-6">Agrega la información de una nueva ubicación física para que los clientes puedan visitarla.</p>
        <SalaForm sala={emptySala} isNew={true} />
      </div>
    </div>
  );
}
