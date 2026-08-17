"use client";

import { useState } from "react";

export default function CategoryForm({ category = {}, isNew = false }: { category?: any, isNew?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);
    
    const formData = new FormData(e.currentTarget);
    formData.append("action", isNew ? "create" : "update");
    
    try {
        const res = await fetch('/api-php/admin_categories.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
                if (isNew) {
                    window.location.href = "/admin/categorias";
                } else {
                    window.location.reload();
                }
            }, 1500);
        } else {
            alert("Error guardando");
        }
    } catch (err) {
        alert("Error de conexión");
    }
    
    setIsSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
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

      <div className="md:col-span-2 mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-[#1a1a1a] hover:bg-[#70970A] disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          {isSaving ? "Guardando..." : (isNew ? "Crear Categoría" : "Guardar Cambios")}
        </button>

        {isSaving && (
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Subiendo información y guardando...</span>
          </div>
        )}

        {isSaved && (
          <span className="text-[#70970A] font-medium animate-pulse flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            ¡Guardado exitosamente!
          </span>
        )}
      </div>
    </form>
  );
}
