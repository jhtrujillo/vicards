"use client";

import { useState } from "react";
import { updateProduct } from "./actions";

export default function ProductForm({ product, categories }: { product: any, categories: any[] }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    setIsSaved(false);
    
    await updateProduct(formData);
    
    setIsSaving(false);
    setIsSaved(true);

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      <input type="hidden" name="id" value={product.id} />
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={product.name} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Precio (ej: $ 2,500.000)</label>
        <input 
          type="text" 
          name="price" 
          defaultValue={product.price} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select 
          name="categoryId" 
          defaultValue={product.categoryId}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A] bg-white"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium text-gray-700 mb-1">Cambiar Imagen del Producto</label>
        <div className="flex items-center gap-4">
          <img src={product.image} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
          <input 
            type="file" 
            name="imageFile" 
            accept="image/*"
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#70970A]/10 file:text-[#70970A] hover:file:bg-[#70970A]/20"
          />
        </div>
      </div>

      <div className="md:col-span-2 mt-4 flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-[#1a1a1a] hover:bg-[#70970A] disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          {isSaving ? "Guardando..." : "Guardar Cambios"}
        </button>

        {isSaved && (
          <span className="text-[#70970A] font-medium animate-pulse">
            ¡Guardado exitosamente!
          </span>
        )}
      </div>
    </form>
  );
}
