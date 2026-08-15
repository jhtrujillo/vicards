"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";

export default function StoreFilters({ categories, minPrice, maxPrice }: { categories: any[], minPrice: number, maxPrice: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for the price inputs
  const [min, setMin] = useState(searchParams.get("min") || minPrice.toString());
  const [max, setMax] = useState(searchParams.get("max") || maxPrice.toString());

  const currentCategory = searchParams.get("categoria");

  // Create a new URLSearchParams to update a parameter
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const applyFilters = () => {
    let params = new URLSearchParams(searchParams.toString());
    if (min) params.set("min", min);
    else params.delete("min");
    
    if (max) params.set("max", max);
    else params.delete("max");
    
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm sticky top-24">
      <h2 className="font-display font-bold text-lg text-gray-900 mb-6 uppercase tracking-wider">Filtros</h2>

      {/* Buscador */}
      <div className="mb-8">
        <form onSubmit={(e) => {
          e.preventDefault();
          const val = (e.currentTarget.elements.namedItem('q') as HTMLInputElement).value;
          router.push(pathname + "?" + createQueryString("q", val));
        }} className="relative">
          <input 
            type="text" 
            name="q"
            defaultValue={searchParams.get("q") || ""}
            placeholder="Buscar producto..." 
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary pr-8"
          />
          <button type="submit" className="absolute right-2 top-2 text-gray-400 hover:text-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
        </form>
      </div>

      {/* Categorías */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 text-sm">Categorías</h3>
        <ul className="space-y-3">
          <li>
            <button 
              onClick={() => router.push(pathname + "?" + createQueryString("categoria", ""))}
              className={`text-sm transition-colors flex items-center justify-between w-full text-left ${!currentCategory ? "text-primary font-bold" : "text-gray-600 hover:text-primary"}`}
            >
              <span>Ver Todo</span>
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button 
                onClick={() => router.push(pathname + "?" + createQueryString("categoria", cat.id.toString()))}
                className={`text-sm transition-colors flex items-center justify-between w-full text-left ${currentCategory === cat.id.toString() ? "text-primary font-bold" : "text-gray-600 hover:text-primary"}`}
              >
                <span>{cat.name}</span>
                <span className="text-xs bg-gray-100 text-gray-500 py-0.5 px-2 rounded-full">{cat._count?.products || 0}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rango de Precios */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-800 mb-4 text-sm">Rango de Precio</h3>
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Mínimo</label>
            <input 
              type="number" 
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={minPrice.toString()}
            />
          </div>
          <span className="text-gray-400 mt-5">-</span>
          <div className="flex-1">
            <label className="text-xs text-gray-500 mb-1 block">Máximo</label>
            <input 
              type="number" 
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder={maxPrice.toString()}
            />
          </div>
        </div>
        <button 
          onClick={applyFilters}
          className="w-full bg-gray-900 hover:bg-primary text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors"
        >
          Aplicar Precio
        </button>
      </div>

    </div>
  );
}
