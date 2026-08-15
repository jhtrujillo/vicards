import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import ProductForm from "../ProductForm";

const prisma = new PrismaClient();

export default async function NewProductPage() {
  const categories = await prisma.category.findMany();

  // Objeto vacío para el formulario (adaptado para creación)
  const emptyProduct = {
    id: 0,
    name: "",
    price: "",
    image: "",
    categoryId: categories.length > 0 ? categories[0].id : 1
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/productos" className="text-gray-500 hover:text-gray-800">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Añadir Nuevo Producto</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-[#70970A]/30">
        <p className="text-sm text-gray-500 mb-6">Completa la información a continuación para añadir un producto al catálogo. El producto será creado en la categoría que selecciones.</p>
        <ProductForm product={emptyProduct} categories={categories} isNew={true} />
      </div>
    </div>
  );
}
