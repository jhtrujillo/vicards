import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import ProductForm from "./ProductForm";

const prisma = new PrismaClient();
const ITEMS_PER_PAGE = 20;

export default async function ProductsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; pagina?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams.pagina) || 1;
  const selectedCategoryId = resolvedParams.categoria ? Number(resolvedParams.categoria) : undefined;

  const categories = await prisma.category.findMany();

  // Si no hay categoría seleccionada, usamos la primera por defecto (si existe)
  const effectiveCategoryId = selectedCategoryId || (categories.length > 0 ? categories[0].id : 0);

  const totalProducts = await prisma.product.count({
    where: effectiveCategoryId ? { categoryId: effectiveCategoryId } : undefined,
  });

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const products = await prisma.product.findMany({
    where: effectiveCategoryId ? { categoryId: effectiveCategoryId } : undefined,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    orderBy: { id: "desc" }
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Administrar Productos</h1>
        <Link href="/admin/productos/nuevo" className="bg-[#70970A] hover:bg-[#5a7a08] text-white px-4 py-2 rounded-md font-medium transition-colors">
          + Añadir Producto
        </Link>
      </div>

      <p className="text-gray-500 mb-8">
        Gestiona tu catálogo. Selecciona una categoría para ver los productos asociados.
      </p>

      {/* Filtros */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex items-center gap-4">
        <span className="font-medium text-gray-700">Filtrar por Categoría:</span>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/admin/productos?categoria=${cat.id}&pagina=1`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                effectiveCategoryId === cat.id
                  ? "bg-[#70970A] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Tabla de Productos */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Imagen</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600">Precio</th>
              <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-gray-500">
                  No hay productos en esta categoría.
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded shadow-sm border border-gray-200" />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{product.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link 
                      href={`/admin/productos/${product.id}/editar`}
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

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Link
            href={`/admin/productos?categoria=${effectiveCategoryId}&pagina=${Math.max(1, currentPage - 1)}`}
            className={`px-4 py-2 rounded border text-sm font-medium ${currentPage === 1 ? 'text-gray-400 border-gray-200 pointer-events-none' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          >
            Anterior
          </Link>
          
          <span className="text-sm text-gray-600 font-medium px-4">
            Página {currentPage} de {totalPages}
          </span>

          <Link
            href={`/admin/productos?categoria=${effectiveCategoryId}&pagina=${Math.min(totalPages, currentPage + 1)}`}
            className={`px-4 py-2 rounded border text-sm font-medium ${currentPage === totalPages ? 'text-gray-400 border-gray-200 pointer-events-none' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          >
            Siguiente
          </Link>
        </div>
      )}
    </div>
  );
}
