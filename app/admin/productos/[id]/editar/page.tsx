import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductForm from "../../ProductForm"; // Adjusted relative path

const prisma = new PrismaClient();

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return notFound();

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true }
  });

  if (!product) return notFound();

  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/admin/productos?categoria=${product.categoryId}&pagina=1`} className="text-gray-500 hover:text-gray-800">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Editar Producto: {product.name}</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <ProductForm product={product} categories={categories} />
      </div>
    </div>
  );
}
