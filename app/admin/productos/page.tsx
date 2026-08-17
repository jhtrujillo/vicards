"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminProductosPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api-php/get_products.php')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar producto?")) return;
    const formData = new FormData();
    formData.append("action", "delete_product");
    formData.append("id", id.toString());
    
    await fetch('/api-php/admin_products.php', { method: 'POST', body: formData });
    setProducts(products.filter(p => p.id !== id));
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
          <p className="text-gray-500 mt-1">Gestiona el catálogo de tu tienda</p>
        </div>
        <Link 
          href="/admin/productos/nuevo" 
          className="bg-[#70970A] hover:bg-[#86b014] text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors"
        >
          <span>+</span> Añadir Producto
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 relative rounded-md overflow-hidden bg-gray-100 border">
                        <img src={product.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <Link href={`/admin/productos/editar?id=${product.id}`} className="text-[#70970A] hover:text-[#5a7908]">Editar</Link>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No hay productos.</td></tr>
            )}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
