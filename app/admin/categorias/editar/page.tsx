"use client";

import Link from "next/link";
import CategoryForm from "../CategoryForm";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

function EditCategoryContent() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  
  const [category, setCategory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
        setLoading(true);
        fetch('/api-php/get_categories.php')
          .then(res => res.json())
          .then(data => {
              const cat = data.find((c: any) => c.id == id);
              if (cat) {
                  setCategory(cat);
              }
          })
          .catch(console.error)
          .finally(() => {
              setLoading(false);
          });
    } else {
        setLoading(false);
    }
  }, [id]);

  if (loading) return <div>Cargando categoría desde BD...</div>;
  if (!category) return <div>Categoría no encontrada o id inválido</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/categorias" className="text-gray-500 hover:text-gray-800">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Editar Categoría</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#70970A]/30">
        <CategoryForm category={category} isNew={false} />
      </div>
    </div>
  );
}

export default function EditCategoryPage() {
    return (
        <Suspense fallback={<div>Cargando editor (Suspense)...</div>}>
            <EditCategoryContent />
        </Suspense>
    )
}
