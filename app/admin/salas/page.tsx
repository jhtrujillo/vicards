import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { Edit, Plus, MapPin } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function SalasAdminPage() {
  const prisma = new PrismaClient();
  const salas = await prisma.experience.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Salas de Experiencia</h1>
          <p className="text-sm text-gray-500 mt-1">Administra las sucursales y showrooms de Vicar's.</p>
        </div>
        <Link 
          href="/admin/salas/nuevo" 
          className="bg-[#70970A] hover:bg-[#5f8008] text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center gap-2 shadow-sm"
        >
          <Plus size={18} />
          Añadir Sala
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sala</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ciudad</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {salas.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p>No hay salas de experiencia registradas.</p>
                </td>
              </tr>
            ) : (
              salas.map((sala) => (
                <tr key={sala.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-16 flex-shrink-0 bg-gray-100 rounded overflow-hidden mr-4">
                        <img className="h-10 w-16 object-cover" src={sala.image || "/images/placeholder.jpg"} alt={sala.title} />
                      </div>
                      <div className="font-medium text-gray-900">{sala.title}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {sala.city}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {sala.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link href={`/admin/salas/${sala.id}/editar`} className="text-[#70970A] hover:text-[#5f8008] inline-flex items-center gap-1">
                      <Edit size={16} /> Editar
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
