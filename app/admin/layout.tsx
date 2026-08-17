"use client";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, MapPin, Tags, Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => {
    if (path === '/admin' && pathname === '/admin') return true;
    if (path !== '/admin' && pathname?.startsWith(path)) return true;
    return false;
  };

  const navLinks = [
    { href: "/admin", icon: LayoutDashboard, label: "Inicio" },
    { href: "/admin/hero", icon: ImageIcon, label: "Hero Slider" },
    { href: "/admin/productos", icon: ShoppingBag, label: "Productos" },
    { href: "/admin/categorias", icon: Tags, label: "Categorías" },
    { href: "/admin/salas", icon: MapPin, label: "Salas de Experiencia" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden">
      
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 w-full h-16 bg-[#1a1a1a] text-white flex items-center justify-between px-4 z-50">
        <h2 className="text-xl font-bold text-[#70970A]">Vicar's Admin</h2>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={closeMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#1a1a1a] text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="p-6 border-b border-gray-800 hidden md:block">
          <h2 className="text-2xl font-bold text-[#70970A]">Vicar's Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-0 overflow-y-auto">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={closeMenu}
                className={`flex items-center gap-3 px-4 py-3 rounded transition-colors ${
                  isActive(link.href) ? "bg-[#70970A] text-white font-medium" : "hover:bg-gray-800 text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {link.label}
              </Link>
            );
          })}
          
          <div className="pt-8 border-t border-gray-800 mt-8">
            <Link 
              href="/" 
              className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              ← Volver a la Tienda
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50 pt-16 md:pt-0 w-full">
        <div className="p-4 sm:p-8 max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
