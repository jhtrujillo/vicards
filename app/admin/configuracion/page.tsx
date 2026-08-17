"use client";

import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

export default function ConfiguracionPage() {
  const [showPrices, setShowPrices] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetch('/api-php/admin_settings.php')
      .then(res => res.json())
      .then(data => {
        if (data.show_prices !== undefined) {
          setShowPrices(data.show_prices);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage({ text: "Error al cargar la configuración", type: "error" });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ text: "", type: "" });
    try {
      const res = await fetch('/api-php/admin_settings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ show_prices: showPrices }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Configuración guardada correctamente", type: "success" });
      } else {
        setMessage({ text: "Error al guardar", type: "error" });
      }
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error de red al guardar", type: "error" });
    } finally {
      setIsSaving(false);
      setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#70970A]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Configuración Global</h1>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#70970A] text-white px-4 py-2 rounded-md hover:bg-[#86b50c] transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          Guardar Cambios
        </button>
      </div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Visualización de Productos</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-900">Mostrar Precios en la Tienda</h3>
              <p className="text-sm text-gray-500 mt-1">
                Si desactivas esta opción, los precios de todos los productos se ocultarán tanto en la página de inicio como en la tienda y en el detalle de cada producto.
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => setShowPrices(!showPrices)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#70970A] focus:ring-offset-2 ${
                showPrices ? 'bg-[#70970A]' : 'bg-gray-200'
              }`}
              role="switch"
              aria-checked={showPrices}
            >
              <span className="sr-only">Toggle precios</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showPrices ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
