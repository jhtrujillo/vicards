"use client"

import Link from "next/link";
import ProductForm from "../ProductForm";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  
  const [product, setProduct] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api-php/get_categories.php')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(console.error);
      
    if (id) {
        setLoading(true);
        fetch(`/api-php/get_product.php?id=${id}`)
          .then(res => res.json())
          .then(data => {
              if (!data.error) {
                  setProduct(data);
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

  if (loading) return <div>Cargando producto desde BD...</div>;
  if (!product) return <div>Producto no encontrado o id inválido</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/productos" className="text-gray-500 hover:text-gray-800">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Editar Producto: {product.name}</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#70970A]/30">
        <ProductForm product={product} categories={categories} isNew={false} />
      </div>
    </div>
  );
}

export default function EditProductPage() {
    return (
        <Suspense fallback={<div>Cargando editor (Suspense)...</div>}>
            <EditProductContent />
        </Suspense>
    )
}
