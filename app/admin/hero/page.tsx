"use client"

import HeroForm from "./HeroForm";
import { useEffect, useState } from "react";

export default function AdminHeroPage() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api-php/get_hero.php')
      .then(res => res.json())
      .then(data => {
        setSlides(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Sección Hero (Carrusel Inicio)</h1>
          <p className="text-gray-500 mt-1">Modifica las imágenes y textos del banner principal</p>
        </div>
      </div>

      <div className="space-y-8">
        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-medium text-gray-800">Slide #{index + 1}</h2>
            </div>
            <div className="p-6">
              <HeroForm slide={slide} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
