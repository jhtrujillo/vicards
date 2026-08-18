"use client"

import Link from "next/link";
import Image from "next/image";
import ProductCarousel from "./components/ProductCarousel";
import FeatureCarousel from "./components/ui/feature-carousel";
import HeroSlider from "./components/ui/HeroSlider";
import { Truck, ShieldCheck, Leaf } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [slides, setSlides] = useState([]);
  const [dbProducts, setDbProducts] = useState([]);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api-php/get_hero.php').then(res => res.json()).then(data => setSlides(data)).catch(console.error);
    fetch('/api-php/get_products.php').then(res => res.json()).then(data => setDbProducts(data)).catch(console.error);
    fetch('/api-php/get_categories.php').then(res => res.json()).then(data => setCategories(data)).catch(console.error);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSlider slides={slides} />



      {/* Nuestros Beneficios */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8 animate-fade-in-up">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-[#70970A]">
            Nuestros Beneficios
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
          {/* Benefit 1 */}
          <div className="bg-white px-5 py-5 rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center gap-4 transform hover:-translate-y-1 transition-transform border border-gray-50 animate-fade-in-up delay-100">
            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#96C11F] flex items-center justify-center bg-white shadow-sm">
              <svg className="w-5 h-5 text-[#96C11F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V10C19 8.89543 18.1046 8 17 8H7C5.89543 8 5 8.89543 5 10V21M3 8H21M5 8L5.95116 3.24419C6.11306 2.43467 6.82488 1.85 7.64964 1.85H16.3504C17.1751 1.85 17.8869 2.43467 18.0488 3.24419L19 8M8 21V16C8 15.4477 8.44772 15 9 15H15C15.5523 15 16 15.4477 16 16V21"></path></svg>
            </div>
            <h3 className="text-[#96C11F] font-sans text-sm md:text-base font-semibold leading-tight">Fabricantes directos</h3>
          </div>
          
          {/* Benefit 2 */}
          <div className="bg-white px-5 py-5 rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center gap-4 transform hover:-translate-y-1 transition-transform border border-gray-50 animate-fade-in-up delay-200">
            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#96C11F] flex items-center justify-center bg-white shadow-sm">
              <svg className="w-5 h-5 text-[#96C11F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3V21H21M3 16L8.5 10.5L12.5 14.5L20.5 6.5M20.5 6.5H15.5M20.5 6.5V11.5"></path></svg>
            </div>
            <h3 className="text-[#96C11F] font-sans text-sm md:text-base font-semibold leading-tight">Experiencia de 15 años en el mercado</h3>
          </div>
          
          {/* Benefit 3 */}
          <div className="bg-white px-5 py-5 rounded-lg shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center gap-4 transform hover:-translate-y-1 transition-transform border border-gray-50 animate-fade-in-up delay-300">
            <div className="flex-shrink-0 w-12 h-12 rounded-full border border-[#96C11F] flex items-center justify-center bg-white shadow-sm">
              <svg className="w-5 h-5 text-[#96C11F]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 8V12L15 15"></path></svg>
            </div>
            <h3 className="text-[#96C11F] font-sans text-sm md:text-base font-semibold leading-tight">Mobiliario de vanguardia y calidad</h3>
          </div>
        </div>
      </div>

      {/* Featured Products Collection */}
      <section className="py-20 bg-gray-50 relative overflow-hidden mt-8 animate-fade-in-up delay-200">
        {/* Right Decorative subtle shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#70970A]/5 rounded-bl-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-[#96C11F] font-bold tracking-wider uppercase text-sm mb-2 block">Exclusividad</span>
              <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 leading-tight">
                Colección <span className="text-[#70970A]">Destacada</span>
              </h2>
            </div>
            <Link 
              href="/tienda" 
              className="group flex items-center text-[#70970A] font-bold hover:text-primary transition-colors text-lg"
            >
              Ver catálogo completo 
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          
          <ProductCarousel products={dbProducts} />
        </div>
      </section>


      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Explora Nuestras Categorías</h2>
            <p className="text-gray-600">Encuentra el estilo perfecto para cada espacio de tu hogar</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {categories.filter(c => c.isFeatured == 1 || c.isFeatured === true).map((category) => (
              <Link key={category.id} href={`/tienda?categoria=${category.slug}`} className="group relative h-80 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] rounded-lg overflow-hidden block">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-display font-bold tracking-wider uppercase">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
          {categories.filter(c => c.isFeatured == 1 || c.isFeatured === true).length === 0 && (
            <p className="text-center text-gray-500 mt-8">No hay categorías destacadas configuradas.</p>
          )}
        </div>
      </section>

      {/* Escríbenos ahora Section */}
      <section className="relative py-24">
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/DSC02160-600x338.jpg" 
            alt="Fondo Escríbenos" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[2rem] py-12 px-8 md:px-16 text-center shadow-2xl">
            <h2 className="text-[#96C11F] text-3xl font-display font-bold mb-4">
              Escríbenos ahora
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base">
              Disponemos de un equipo altamente capacitado y comprometido, listo para brindarle asistencia y apoyo personalizado.
            </p>
            <a 
              href="https://wa.me/1234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#96C11F] hover:bg-[#85ab1b] text-white font-medium py-3 px-8 rounded-md transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Escríbenos ahora
            </a>
          </div>
        </div>
      </section>

      {/* Salas de experiencia Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative Dotted Circles */}
        <div className="absolute left-0 bottom-0 w-64 h-64 -translate-x-1/4 translate-y-1/4 opacity-40 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full text-[#96C11F]">
            <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 8" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row gap-12 md:items-end justify-between">
            <div className="w-full md:w-1/3">
              <h2 className="text-[#96C11F] text-4xl md:text-5xl font-display font-bold leading-tight">
                Salas de<br />experiencia
              </h2>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-gray-600 leading-relaxed text-base">
                ¿Ha considerado la posibilidad de adquirir piezas exclusivas que realcen la estética de sus espacios? Con una trayectoria de más de 15 años, nos hemos dedicado al diseño y fabricación de mobiliario destinado a proporcionar ese toque distintivo a su hogar. Continuamos avanzando y ofreciendo lo más vanguardista en términos de diseño, comodidad y tecnología.
              </p>
            </div>
          </div>
          
          <FeatureCarousel />
        </div>
      </section>

      {/* Video de Fabrica Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Nuestra <span className="text-[#70970A]">Fábrica</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Conoce el proceso de creación de nuestros muebles de lujo, elaborados con pasión y dedicación.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video w-full max-w-4xl mx-auto bg-black">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline 
              controls
            >
              <source src="/images/VideodeFabrica.mp4" type="video/mp4" />
              Tu navegador no soporta el formato de video.
            </video>
          </div>
        </div>
      </section>
    </div>
  );
}
