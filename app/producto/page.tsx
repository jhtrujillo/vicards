"use client"

import ProductGallery from "../components/ProductGallery";
import ProductCard from "../components/ProductCard";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams?.get("id");
  
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    fetch(`/api-php/get_product.php?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
            setProduct(null);
        } else {
            setProduct(data);
            // Fetch related
            fetch(`/api-php/get_products.php?categoriaId=${data.categoryId}`)
                .then(r => r.json())
                .then(related => {
                    setRelatedProducts(related.filter((p: any) => p.id !== data.id).slice(0, 4));
                });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#FAFAFA] pt-32 text-center">Cargando producto...</div>;
  if (!product) return <div className="min-h-screen bg-[#FAFAFA] pt-32 text-center">Producto no encontrado</div>;

  const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(product.price);

  return (
    <div className="flex-grow pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumbs */}
          <nav className="flex text-sm text-gray-500 mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
            <span className="mx-2">/</span>
            <Link href="/tienda" className="hover:text-primary transition-colors">Tienda</Link>
            <span className="mx-2">/</span>
            <Link href={`/tienda?categoria=${product.categoryId}`} className="hover:text-primary transition-colors">{product.category?.name || 'Categoría'}</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Product Gallery */}
            <div className="w-full lg:w-3/5">
              <ProductGallery mainImage={product.image} gallery={product.gallery || []} />
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-2/5 flex flex-col">
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">
                {product.category?.name || 'Categoría'}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {product.price !== null && product.price !== undefined && (
                <div className="text-2xl font-bold text-[#96C11F] mb-6">
                  {formattedPrice}
                </div>
              )}
              
              <div className="prose prose-sm text-gray-600 mb-8">
                <p>
                  Mueble de alta calidad con acabados premium. Nuestro proceso de diseño y fabricación garantiza durabilidad y estilo atemporal para tu hogar.
                </p>
              </div>

              {/* Call to action */}
              <div className="bg-white border border-gray-200 p-6 rounded-lg mb-8 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">¿Te interesa este producto?</h3>
                <p className="text-sm text-gray-600 mb-4">Habla con uno de nuestros asesores para recibir más información, coordinar la entrega o personalizar detalles.</p>
                
                <Link 
                  href="/contacto" 
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-[#86b014] text-white font-bold uppercase tracking-wider py-3 px-6 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                  Solicitar Presupuesto
                </Link>
              </div>

              {/* Product details accordion (mocked since no real DB data for this yet) */}
              <div className="border-t border-gray-200">
                <details className="group" open>
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4 text-gray-900">
                    <span>Detalles de Fabricación</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </span>
                  </summary>
                  <div className="text-gray-600 text-sm pb-4">
                    Todos nuestros productos son fabricados en Colombia usando maderas seleccionadas, espumas de alta densidad y telas importadas anti-manchas.
                  </div>
                </details>
                <details className="group border-t border-gray-200">
                  <summary className="flex justify-between items-center font-medium cursor-pointer list-none py-4 text-gray-900">
                    <span>Envíos y Garantía</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    </span>
                  </summary>
                  <div className="text-gray-600 text-sm pb-4">
                    Garantía de 5 años por defectos de fabricación en estructura. Envíos nacionales disponibles con empresas transportadoras aliadas.
                  </div>
                </details>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
              También podría interesarte
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
  );
}

export default function ProductDetailPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] pt-32 text-center">Cargando...</div>}>
        <ProductDetailContent />
      </Suspense>
    </main>
  )
}
