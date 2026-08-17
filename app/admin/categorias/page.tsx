"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminCategoriasPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api-php/get_categories.php')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar categoría?")) return;
    const formData = new FormData();
    formData.append("action", "delete_category");
    formData.append("id", id.toString());
    
    try {
        const res = await fetch('/api-php/admin_categories.php', { method: 'POST', body: formData });
        const data = await res.json();
        
        if (data.success) {
            setCategories(categories.filter(c => c.id !== id));
        } else {
            alert(data.error || "Error al eliminar la categoría.");
        }
    } catch (err) {
        alert("Error de conexión al intentar eliminar.");
    }
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categorías</h1>
          <p className="text-gray-500 mt-1">Gestiona las categorías de tus productos</p>
        </div>
        <Link 
          href="/admin/categorias/nuevo" 
          className="bg-[#70970A] hover:bg-[#86b014] text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors"
        >
          <span>+</span> Añadir Categoría
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto"><table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 relative rounded-md overflow-hidden bg-gray-100 border">
                        {category.image && <img src={category.image} className="w-full h-full object-cover" />}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{category.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{category.slug}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/categorias/editar?id=${category.id}`} className="text-[#70970A] hover:text-[#5a7908] mr-4">Editar</Link>
                  <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">Eliminar</button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No hay categorías.</td></tr>
            )}
          </tbody>
        </table></div>
      </div>
    </div>
  );
}
