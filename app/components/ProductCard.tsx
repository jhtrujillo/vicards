import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ product }: { product: any }) {
  const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price);

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
          <span className="font-bold text-gray-900">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
}
