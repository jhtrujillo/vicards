import SalaForm from "../SalaForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NuevaSalaPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link href="/admin/salas" className="text-gray-500 hover:text-gray-800 flex items-center gap-2 text-sm font-medium w-fit mb-4">
          <ArrowLeft size={16} /> Volver a Salas
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Añadir Sala de Experiencia</h1>
        <p className="text-sm text-gray-500 mt-1">Completa los datos de la nueva sucursal o showroom.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <SalaForm isNew={true} />
      </div>
    </div>
  );
}
