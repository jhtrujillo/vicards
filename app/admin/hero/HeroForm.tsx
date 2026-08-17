"use client";

import { useState } from "react";

export default function HeroForm({ slide }: { slide: any }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);
    
    const formData = new FormData(e.currentTarget);
    formData.append("action", "update");
    
    try {
        const res = await fetch('/api-php/admin_hero.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.success) {
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
            }, 3000);
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
      <input type="hidden" name="id" value={slide.id} />
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Título Parte 1</label>
        <input 
          type="text" 
          name="title1" 
          defaultValue={slide.title1} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Título Parte 2</label>
        <input 
          type="text" 
          name="title2" 
          defaultValue={slide.title2} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Texto Resaltado (Verde)</label>
        <input 
          type="text" 
          name="titleHighlight" 
          defaultValue={slide.titleHighlight} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
        <input 
          type="text" 
          name="subtitle" 
          defaultValue={slide.subtitle} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Texto descriptivo 1</label>
        <input 
          type="text" 
          name="text1" 
          defaultValue={slide.text1} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Texto descriptivo 2</label>
        <input 
          type="text" 
          name="text2" 
          defaultValue={slide.text2} 
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col md:col-span-2">
        <label className="text-sm font-medium text-gray-700 mb-1">Cambiar Imagen de Fondo</label>
        <div className="flex items-center gap-4">
          <img src={slide.image} alt="Preview" className="w-16 h-16 object-cover rounded-md border" />
          <input 
            type="file" 
            name="image" 
            accept="image/*"
            className="border border-gray-300 rounded-md px-3 py-2 w-full file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[#70970A]/10 file:text-[#70970A] hover:file:bg-[#70970A]/20 transition-colors cursor-pointer"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Sube una nueva imagen solo si deseas reemplazar la actual.</p>
      </div>

      <div className="md:col-span-2 mt-2 flex items-center gap-4">
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-[#1a1a1a] hover:bg-[#70970A] disabled:bg-gray-400 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          {isSaving ? "Guardando..." : "Guardar Cambios del Slide"}
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
