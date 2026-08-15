import { PrismaClient } from "@prisma/client";
import ProductCard from "../components/ProductCard";
import StoreFilters from "./StoreFilters";
import Header from "../components/Header";
import Footer from "../components/Footer";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === 'string' ? resolvedParams.q : undefined;
  
  let categoriaId: number | undefined = undefined;
  let categoriaSlug: string | undefined = undefined;
  let activeCategoryName = "Colecciones";

  if (typeof resolvedParams.categoria === 'string') {
    if (!isNaN(Number(resolvedParams.categoria))) {
      categoriaId = Number(resolvedParams.categoria);
    } else {
      categoriaSlug = resolvedParams.categoria;
    }
  }

  const min = typeof resolvedParams.min === 'string' ? Number(resolvedParams.min) : undefined;
  const max = typeof resolvedParams.max === 'string' ? Number(resolvedParams.max) : undefined;

  // Fetch categories for sidebar first to find the active one
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: 'asc' }
  });

  // Find active category
  if (categoriaId) {
    const activeCat = categories.find(c => c.id === categoriaId);
    if (activeCat) activeCategoryName = activeCat.name;
  } else if (categoriaSlug) {
    const activeCat = categories.find(c => c.slug === categoriaSlug);
    if (activeCat) {
      activeCategoryName = activeCat.name;
      categoriaId = activeCat.id; // Resolve slug to ID for filtering
    }
  }

  // Build the Prisma WHERE clause
  const where: any = {};
  
  if (q) {
    where.name = { contains: q };
  }
  if (categoriaId) {
    where.categoryId = categoriaId;
  }
  
  if (min !== undefined || max !== undefined) {
    where.price = {};
    if (min !== undefined) where.price.gte = min;
    if (max !== undefined) where.price.lte = max;
  }

  // Fetch products
  const products = await prisma.product.findMany({
    where,
    include: { category: true },
    orderBy: { createdAt: 'desc' }
  });

  // Fetch min/max limits for placeholders
  const aggregations = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
  });
  const absoluteMin = aggregations._min.price || 0;
  const absoluteMax = aggregations._max.price || 10000000;

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Banner de Página */}
      <div className="bg-[#1a1a1a] text-white pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-widest mb-4">
            {activeCategoryName}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Explora nuestra cuidadosa selección de muebles diseñados para transformar tus espacios en hogares extraordinarios.
          </p>
        </div>
      </div>

      <div className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <StoreFilters categories={categories} minPrice={absoluteMin} maxPrice={absoluteMax} />
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-gray-500 text-sm">
              Mostrando <span className="font-bold text-gray-900">{products.length}</span> resultados
              {q && <span> para "{q}"</span>}
            </h2>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-100 p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No se encontraron productos</h3>
              <p className="text-gray-500 text-sm">Intenta ajustar tus filtros o término de búsqueda para ver más resultados.</p>
            </div>
          )}
        </div>
        
      </div>
    </main>
  );
}
