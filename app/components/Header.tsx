"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className="w-full fixed top-0 z-50 transition-all duration-500 border-b border-white/5 shadow-lg bg-[#333333]/95 backdrop-blur-md py-2"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          
          {/* Left: Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="Vicars Muebles Logo" 
                className="w-auto h-10"
              />
            </Link>
          </div>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 justify-center h-full flex-1 ml-10">
            <div 
              className="relative h-full py-4 flex items-center group cursor-pointer"
              onMouseEnter={() => setActiveMenu('tienda')}
            >
              <Link href="/tienda" className={`font-display font-bold uppercase tracking-widest text-[11px] transition-colors flex items-center gap-1.5 relative ${activeMenu === 'tienda' ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                Tienda
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'tienda' ? '-rotate-180 text-primary' : 'group-hover:-rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${activeMenu === 'tienda' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </div>

            <div 
              className="relative h-full py-4 flex items-center group cursor-pointer"
              onMouseEnter={() => setActiveMenu('nosotros')}
            >
              <Link href="/nosotros" className={`font-display font-bold uppercase tracking-widest text-[11px] transition-colors flex items-center gap-1.5 relative ${activeMenu === 'nosotros' ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                Nosotros
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'nosotros' ? '-rotate-180 text-primary' : 'group-hover:-rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${activeMenu === 'nosotros' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </div>

            <div 
              className="relative h-full py-4 flex items-center group cursor-pointer"
              onMouseEnter={() => setActiveMenu('salas')}
            >
              <Link href="/salas-de-experiencia" className={`font-display font-bold uppercase tracking-widest text-[11px] transition-colors flex items-center gap-1.5 relative ${activeMenu === 'salas' ? 'text-primary' : 'text-white group-hover:text-primary'}`}>
                Salas de exp.
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${activeMenu === 'salas' ? '-rotate-180 text-primary' : 'group-hover:-rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                <span className={`absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-300 ${activeMenu === 'salas' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
              </Link>
            </div>
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-6 justify-end">
            {/* Search */}
            <button className="text-white hover:text-primary transition-colors transform hover:-translate-y-0.5 duration-200">
              <span className="sr-only">Buscar</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </button>
            
            {/* Cart */}
            <button className="text-white hover:text-primary transition-colors relative group transform hover:-translate-y-0.5 duration-200">
              <span className="sr-only">Carrito</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">0</span>
            </button>
            
            {/* Contact Button */}
            <Link href="/contacto" className="bg-primary hover:bg-[#96C11F] text-white font-display font-bold uppercase tracking-widest text-[11px] py-2.5 px-6 rounded-md transition-colors shadow-sm transform hover:-translate-y-0.5 duration-200" onMouseEnter={() => setActiveMenu(null)}>
              Contacto
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex justify-end">
            <button className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Mega Menu Dropdown */}
      {activeMenu && (
        <div 
          className="absolute top-full left-0 w-full bg-[#fdfdf7] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border-t border-gray-100 animate-in fade-in slide-in-from-top-2 duration-300 overflow-hidden cursor-default"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[380px]">
            <div className="grid grid-cols-4 gap-12 h-full">
              
              {/* Left Column: Quick Links */}
              <div className="col-span-1">
                <h3 className="font-display font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest text-primary border-b border-gray-200 pb-3">
                  {activeMenu === 'tienda' && 'Colecciones'}
                  {activeMenu === 'nosotros' && 'Nuestra Marca'}
                  {activeMenu === 'salas' && 'Visítanos'}
                </h3>
                <ul className="space-y-4">
                  {activeMenu === 'tienda' && (
                    <>
                      <li><Link href="/tienda" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Ver Todo</Link></li>
                      <li><Link href="/ofertas" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Nuevos Lanzamientos</Link></li>
                      <li><Link href="/decoracion" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Decoración y Arte</Link></li>
                    </>
                  )}
                  {activeMenu === 'nosotros' && (
                    <>
                      <li><Link href="/historia" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Nuestra Historia</Link></li>
                      <li><Link href="/materiales" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Calidad y Materiales</Link></li>
                      <li><Link href="/diseñadores" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>El Equipo</Link></li>
                    </>
                  )}
                  {activeMenu === 'salas' && (
                    <>
                      <li><Link href="/agendar" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Agendar Cita</Link></li>
                      <li><Link href="/ubicaciones" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Ver Ubicaciones</Link></li>
                      <li><Link href="/virtual" className="text-gray-600 hover:text-primary font-medium text-sm transition-colors flex items-center gap-3 group/link"><span className="w-8 h-[1px] bg-gray-300 group-hover/link:bg-primary transition-colors group-hover/link:w-12"></span>Recorrido Virtual 360</Link></li>
                    </>
                  )}
                </ul>
              </div>
              
              {/* Right Columns: Visual Categories */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                {activeMenu === 'tienda' && (
                  <>
                    <div className="group/cat cursor-pointer">
                      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 relative shadow-sm">
                        <img src="http://vicards.local/wp-content/uploads/2023/12/sala.jpeg" alt="Salas" className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <Link href="/categoria/salas" className="block text-center">
                        <h4 className="font-display font-bold text-gray-900 text-base group-hover/cat:text-primary transition-colors">Salas</h4>
                      </Link>
                    </div>
                    <div className="group/cat cursor-pointer">
                      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 relative shadow-sm">
                        <img src="http://vicards.local/wp-content/uploads/2025/04/DSC02223-600x338.jpg" alt="Alcobas" className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <Link href="/categoria/alcobas" className="block text-center">
                        <h4 className="font-display font-bold text-gray-900 text-base group-hover/cat:text-primary transition-colors">Alcobas</h4>
                      </Link>
                    </div>
                    <div className="group/cat cursor-pointer">
                      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 relative shadow-sm">
                        <img src="http://vicards.local/wp-content/uploads/2025/04/DSC02219-600x338.jpg" alt="Comedores" className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <Link href="/categoria/comedores" className="block text-center">
                        <h4 className="font-display font-bold text-gray-900 text-base group-hover/cat:text-primary transition-colors">Comedores</h4>
                      </Link>
                    </div>
                  </>
                )}

                {activeMenu === 'nosotros' && (
                  <>
                    <div className="group/cat cursor-pointer col-span-2">
                      <div className="aspect-[21/9] rounded-lg overflow-hidden mb-3 relative shadow-sm">
                        <img src="http://vicards.local/wp-content/uploads/2025/04/DSC02213-600x338.jpg" alt="Calidad" className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <Link href="/nosotros" className="block text-left px-2">
                        <h4 className="font-display font-bold text-gray-900 text-base group-hover/cat:text-primary transition-colors">Hecho a Mano en Colombia</h4>
                        <p className="text-xs text-gray-500 mt-1">Descubre nuestro proceso artesanal y garantía de calidad.</p>
                      </Link>
                    </div>
                    <div className="group/cat cursor-pointer">
                      <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden mb-3 relative shadow-sm flex items-center justify-center">
                        <h4 className="font-display font-bold text-3xl text-gray-300">1998</h4>
                      </div>
                      <Link href="/historia" className="block text-left px-2">
                        <h4 className="font-display font-bold text-gray-900 text-base group-hover/cat:text-primary transition-colors">Nuestra Trayectoria</h4>
                        <p className="text-xs text-gray-500 mt-1">Más de 25 años creando hogares.</p>
                      </Link>
                    </div>
                  </>
                )}

                {activeMenu === 'salas' && (
                  <>
                    <div className="group/cat cursor-pointer">
                      <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3 relative shadow-sm">
                        <img src="http://vicards.local/wp-content/uploads/2025/04/DSC02216-600x338.jpg" alt="Sala Principal" className="w-full h-full object-cover group-hover/cat:scale-105 transition-transform duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/cat:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <Link href="/sedes" className="block text-center">
                        <h4 className="font-display font-bold text-gray-900 text-base group-hover/cat:text-primary transition-colors">Showroom Principal</h4>
                      </Link>
                    </div>
                    <div className="col-span-2 flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="text-center">
                        <svg className="w-10 h-10 text-primary mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        <h4 className="font-display font-bold text-gray-900 text-xl mb-2">Asesoría Personalizada</h4>
                        <p className="text-sm text-gray-600 mb-6">Agenda una cita con nuestros diseñadores de interiores en cualquiera de nuestras sedes.</p>
                        <button className="bg-primary hover:bg-[#96C11F] text-white font-display font-bold uppercase tracking-widest text-[11px] py-2 px-6 rounded-md transition-colors shadow-sm">Agendar Ahora</button>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
