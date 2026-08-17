"use client"

import Link from "next/link";
import CategoryForm from "../CategoryForm";

export default function NewCategoryPage() {
  const emptyCategory = {
    id: 0,
    name: "",
    slug: "",
    image: ""
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/categorias" className="text-gray-500 hover:text-gray-800">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Añadir Nueva Categoría</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#70970A]/30">
        <p className="text-sm text-gray-500 mb-6">Completa la información a continuación para añadir una nueva categoría de productos.</p>
        <CategoryForm category={emptyCategory} isNew={true} />
      </div>
    </div>
  );
}
