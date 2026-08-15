"use client";

import { useState } from "react";
import { updateCategory, createCategory } from "./actions";

export default function CategoryForm({ category = {}, isNew = false }: { category?: any, isNew?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsSaving(true);
    setIsSaved(false);
    
    if (isNew) {
      await createCategory(formData);
    } else {
      await updateCategory(formData);
    }
    
    setIsSaving(false);
    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
      {!isNew && <input type="hidden" name="id" value={category.id} />}
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Nombre</label>
        <input 
          type="text" 
          name="name" 
          defaultValue={category.name} 
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Slug (URL amigable)</label>
        <input 
          type="text" 
          name="slug" 
          defaultValue={category.slug} 
          required
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium text-gray-700 mb-1">{isNew ? "Subir Imagen de Categoría" : "Cambiar Imagen de Categoría"}</label>
        <div className="flex items-center gap-4">
          {!isNew && category.image && (
            <img src={category.image} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
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

      <div className="md:col-span-2 mt-2 flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-[#1a1a1a] hover:bg-[#70970A] disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          {isSaving ? "Guardando..." : (isNew ? "Crear Categoría" : "Guardar Cambios")}
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
