"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminSalasPage() {
  const [salas, setSalas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api-php/get_salas.php')
      .then(res => res.json())
      .then(data => {
        setSalas(data);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Eliminar sala?")) return;
    const formData = new FormData();
    formData.append("action", "delete_sala");
    formData.append("id", id.toString());
    
    await fetch('/api-php/admin_salas.php', { method: 'POST', body: formData });
    setSalas(salas.filter(s => s.id !== id));
  }

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Salas de Experiencia</h1>
          <p className="text-gray-500 mt-1">Gestiona las ubicaciones físicas mostradas en la web</p>
        </div>
        <Link 
          href="/admin/salas/nuevo" 
          className="bg-[#70970A] hover:bg-[#86b014] text-white font-bold py-2 px-4 rounded flex items-center gap-2 transition-colors"
        >
          <span>+</span> Añadir Sala
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {salas.map((sala) => (
          <div key={sala.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-200 relative">
                {sala.image && <img src={sala.image} alt={sala.title} className="w-full h-full object-cover" />}
            </div>
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-[#70970A]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                <span className="text-sm font-semibold text-[#70970A] uppercase tracking-wider">{sala.city}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{sala.title}</h3>
              <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3">{sala.description}</p>
              
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-auto">
                <button onClick={() => handleDelete(sala.id)} className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
        {salas.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
            No has agregado ninguna sala de experiencia aún.
          </div>
        )}
      </div>
    </div>
  );
}
