import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, ShoppingBag, MapPin } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] text-white flex flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-2xl font-bold text-[#70970A]">Vicar's Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-800 transition-colors">
            <LayoutDashboard size={20} />
            Inicio
          </Link>
          <Link href="/admin/hero" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-800 transition-colors">
            <ImageIcon size={20} />
            Hero Slider
          </Link>
          <Link href="/admin/productos" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-800 transition-colors">
            <ShoppingBag size={20} />
            Productos
          </Link>
          <Link href="/admin/salas" className="flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-800 transition-colors">
            <MapPin size={20} />
            Salas de Experiencia
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
