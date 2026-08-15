import { PrismaClient } from "@prisma/client";
import ProductForm from "./ProductForm";

const prisma = new PrismaClient();

export default async function ProductsAdminPage() {
  const products = await prisma.product.findMany();
  const categories = await prisma.category.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Administrar Productos Destacados</h1>
      <p className="text-gray-500 mb-8">
        Gestiona la información, categoría y fotografías de los productos que se muestran en el carrusel de la página de inicio.
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#70970A]">Producto: {product.name}</h2>
            <ProductForm product={product} categories={categories} />
          </div>
        ))}
      </div>
    </div>
  );
}
