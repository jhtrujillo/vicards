"use client"

import ProductCard from "../components/ProductCard";
import StoreFilters from "./StoreFilters";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function TiendaContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';
  const categoria = searchParams.get('categoria') || '';
  const min = searchParams.get('min') || '';
  const max = searchParams.get('max') || '';

  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategoryName, setActiveCategoryName] = useState("Colecciones");

  useEffect(() => {
    fetch('/api-php/get_categories.php')
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (categoria) {
            const cat = data.find((c: any) => c.slug === categoria || c.id == categoria);
            if (cat) setActiveCategoryName(cat.name);
        } else {
            setActiveCategoryName("Colecciones");
        }
      });
  }, [categoria]);

  useEffect(() => {
    let url = `/api-php/get_products.php?q=${encodeURIComponent(q)}&min=${min}&max=${max}`;
    // Si tenemos categoría, necesitamos resolver si es ID o Slug (el backend PHP ahora espera categoryId o maneja lo que le enviemos)
    // Para simplificar, si el backend espera categoryId, lo resolvemos aquí:
    if (categoria && categories.length > 0) {
        const cat = categories.find((c: any) => c.slug === categoria || c.id == categoria);
        if (cat) {
            url += `&categoriaId=${cat.id}`;
        }
    }
    
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [q, categoria, min, max, categories]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Banner de Página */}
      <div className="bg-[#1a1a1a] text-white pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-widest mb-4">
            {activeCategoryName}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Explora nuestra cuidadosa selección de muebles diseñados para transformar tus espacios en hogares extraordinarios.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <StoreFilters categories={categories} minPrice={0} maxPrice={10000000} />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-500 text-sm">
              Mostrando <span className="font-bold text-gray-900">{products.length}</span> resultados
              {q && <span> para "{q}"</span>}
            </h2>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-100 p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500 text-sm">Intenta ajustar tus filtros o término de búsqueda para ver más resultados.</p>
            </div>
          )}
        </div>
        
      </div>
    </main>
  );
}

export default function TiendaPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <TiendaContent />
        </Suspense>
    )
}
