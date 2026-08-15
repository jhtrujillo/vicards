"use client";

import { useState } from "react";
import { updateProduct, createProduct, deleteProductImage } from "./actions";

export default function ProductForm({ product = {}, categories, isNew = false }: { product?: any, categories: any[], isNew?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    setIsSaved(false);
    
    if (isNew) {
      await createProduct(formData);
    } else {
      await updateProduct(formData);
    }
    
    setIsSaving(false);
    setIsSaved(true);

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      {!isNew && <input type="hidden" name="id" value={product.id} />}
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={product.name} 
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Precio</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input 
            type="number" 
            name="price" 
            defaultValue={product.price} 
            required
            className="border border-gray-300 rounded-md pl-8 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#70970A]"
          />
        </div>
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
        <label className="text-sm font-medium text-gray-700 mb-1">{isNew ? "Imagen Principal del Producto" : "Cambiar Imagen Principal"}</label>
        <div className="flex items-center gap-4">
          {!isNew && product.image && (
            <img src={product.image} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
          )}
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            required={isNew}
            className="border border-gray-300 rounded-md px-3 py-2 w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#70970A]/10 file:text-[#70970A] hover:file:bg-[#70970A]/20 transition-colors cursor-pointer"
          />
        </div>
        {!isNew && <p className="text-xs text-gray-400 mt-1">Sube una nueva imagen solo si deseas reemplazar la actual.</p>}
      </div>

      <div className="flex flex-col md:col-span-2 mt-4">
        <label className="text-sm font-medium text-gray-700 mb-2">Galería de Imágenes (Opcional)</label>
        
        {!isNew && product.images && product.images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mb-4">
            {product.images.map((img: any) => (
              <div key={img.id} className="relative group rounded-md overflow-hidden border border-gray-200">
                <img src={img.url} alt="Gallery" className="w-full h-24 object-cover" />
                <button
                  type="button"
                  onClick={async () => {
                    if (confirm("¿Seguro que deseas eliminar esta imagen de la galería?")) {
                      await deleteProductImage(img.id);
                    }
                  }}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4">
          <input 
            type="file" 
            name="galleryImages" 
            accept="image/*"
            multiple
            className="border border-gray-300 rounded-md px-3 py-2 w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#70970A]/10 file:text-[#70970A] hover:file:bg-[#70970A]/20 transition-colors cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Puedes seleccionar múltiples archivos a la vez para añadirlos a la galería.</p>
      </div>

      <div className="md:col-span-2 mt-4 flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-[#1a1a1a] hover:bg-[#70970A] disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          {isSaving ? "Guardando..." : (isNew ? "Crear Producto" : "Guardar Cambios")}
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
