import { PrismaClient } from "@prisma/client";
import HeroForm from "./HeroForm";

const prisma = new PrismaClient();

export default async function HeroAdminPage() {
  const slides = await prisma.heroSlide.findMany();

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Administrar Hero Slider</h1>
      <p className="text-gray-500 mb-8">
        Edita los textos de las diapositivas que se muestran en el inicio.
      </p>

      <div className="space-y-8">
        {slides.map((slide, index) => (
          <div key={slide.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 text-[#70970A]">Diapositiva {index + 1}</h2>
            <HeroForm slide={slide} />
          </div>
        ))}
      </div>
    </div>
  );
}
