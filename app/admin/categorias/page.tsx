import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

export default async function CategoriesAdminPage() {
  const categories = await prisma.category.findMany({
    include: {
      products: true
    }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Administrar Categorías</h1>
        <Link href="/admin/categorias/nuevo" className="bg-[#70970A] hover:bg-[#5a7a08] text-white px-4 py-2 rounded-md font-medium transition-colors">
          + Añadir Categoría
        </Link>
      </div>

      <p className="text-gray-500 mb-8">
        Gestiona las categorías que agrupan a tus productos.
      </p>

      {/* Tabla de Categorías */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-24">Imagen</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">URL Amigable (Slug)</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-center">Productos</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-gray-500">
                  No hay categorías creadas.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    {category.image ? (
                      <img src={category.image} alt={category.name} className="w-12 h-12 object-cover rounded shadow-sm border border-gray-200" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">Sin img</div>
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{category.name}</td>
                  <td className="py-3 px-4 text-gray-500 text-sm">{category.slug}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded font-medium">
                      {category.products.length}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link 
                      href={`/admin/categorias/${category.id}/editar`}
                      className="text-[#70970A] hover:text-[#5a7a08] font-medium text-sm"
                    >
                      Editar
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
