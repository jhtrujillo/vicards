import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  const formattedPrice = new Intl.NumberFormat('es-CO').format(product.price);

  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <Link href={`/producto/${product.id}`} className="relative aspect-square w-full overflow-hidden block">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
        
        {/* Etiqueta Nueva Colección (opcional, simulada) */}
        {product.id % 3 === 0 && (
          <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-1 px-3 rounded-full">
            Nuevo
          </span>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-1 text-xs text-gray-400 font-medium uppercase tracking-wider">
          {product.category?.name || "Muebles"}
        </div>
        <Link href={`/producto/${product.id}`} className="block flex-grow">
          <h3 className="font-display font-bold text-gray-900 text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="font-bold text-gray-900">${formattedPrice}</span>
          <button className="text-gray-400 hover:text-primary transition-colors p-2 -mr-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
