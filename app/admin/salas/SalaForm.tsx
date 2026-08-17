"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SalaForm({ sala = {}, isNew = false }: { sala?: any, isNew?: boolean }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setIsSaved(false);
    
    const formData = new FormData(e.currentTarget);
    formData.append("action", isNew ? "create" : "update");
    
    try {
        const res = await fetch('/api-php/admin_salas.php', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        
        if (data.success) {
            setIsSaved(true);
            setTimeout(() => {
                setIsSaved(false);
                if (isNew) {
                    window.location.href = "/admin/salas";
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
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 relative">
      {!isNew && <input type="hidden" name="id" value={sala.id} />}
      
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Ciudad</label>
        <input 
          type="text" 
          name="city" 
          defaultValue={sala.city} 
          required
          placeholder="Ej: Cali, Valle"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Título / Nombre de la Sala</label>
        <input 
          type="text" 
          name="title" 
          defaultValue={sala.title} 
          required
          placeholder="Ej: Showroom Principal"
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea 
          name="description" 
          defaultValue={sala.description} 
          required
          rows={4}
          placeholder="Descripción detallada o dirección de la sala..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#70970A]"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">{isNew ? "Subir Imagen de la Sala" : "Cambiar Imagen de la Sala"}</label>
        <div className="flex items-center gap-4">
          {!isNew && sala.image && (
            <img src={sala.image} alt="Preview" className="w-24 h-16 object-cover rounded-md border" />
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

      <div className="mt-4 flex items-center gap-4 border-t pt-6">
        <button 
          type="submit" 
          disabled={isSaving}
          className="bg-[#1a1a1a] hover:bg-[#70970A] disabled:bg-gray-400 text-white font-medium py-2 px-8 rounded-md transition-colors"
        >
          {isSaving ? "Guardando..." : (isNew ? "Crear Sala" : "Guardar Cambios")}
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
