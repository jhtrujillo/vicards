import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import CategoryForm from "../../CategoryForm";

const prisma = new PrismaClient();

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);
  if (isNaN(id)) return notFound();

  const category = await prisma.category.findUnique({
    where: { id }
  });

  if (!category) return notFound();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/categorias" className="text-gray-500 hover:text-gray-800">
          ← Volver
        </Link>
        <h1 className="text-3xl font-bold text-gray-800">Editar Categoría: {category.name}</h1>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
