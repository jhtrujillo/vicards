import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Users, Leaf, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Nosotros - Vicar's Muebles",
  description: "Conoce nuestra historia y trayectoria. Más de 25 años creando hogares y fabricando muebles de lujo hechos a mano en Colombia.",
};

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col pt-32">
      
      {/* Hero Section */}
      <section className="relative bg-[#1a1a1a] text-white overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/DSC02160-600x338.jpg" 
            alt="Nosotros Vicar's Muebles" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-[#96C11F] font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Esencia</span>
            <h1 className="font-display font-bold text-4xl md:text-6xl mb-6 leading-tight">
              Diseñamos Muebles, <br/>
              <span className="text-gray-300">Creamos Hogares.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
              Con más de 25 años de trayectoria, nos dedicamos a ofrecer piezas exclusivas que realzan la estética de sus espacios con comodidad y lujo.
            </p>
          </div>
        </div>
      </section>

      {/* History & Handcrafted Section */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Image Grid */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-4 mt-12">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img src="/images/DSC02223-600x338.jpg" alt="Detalle mueble" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="bg-[#fdfdf7] p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center aspect-square">
                  <span className="font-display font-bold text-5xl text-[#96C11F] mb-2">1998</span>
                  <span className="text-gray-600 font-medium text-sm uppercase tracking-widest">Año de Fundación</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg">
                  <img src="/images/DSC02219-600x338.jpg" alt="Taller de fabricación" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2">
              <span className="text-[#96C11F] font-bold tracking-widest uppercase text-sm mb-4 block">Hecho a Mano en Colombia</span>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 mb-6 leading-tight">
                Tradición, Calidad y <br/> Diseño Exclusivo
              </h2>
              <div className="space-y-6 text-gray-600 text-base leading-relaxed">
                <p>
                  ¿Ha considerado la posibilidad de adquirir piezas exclusivas que realcen la estética de sus espacios? Con una trayectoria de más de dos décadas, nos hemos dedicado al diseño y fabricación de mobiliario destinado a proporcionar ese toque distintivo a su hogar.
                </p>
                <p>
                  Cada una de nuestras piezas es fabricada artesanalmente en Colombia, utilizando maderas seleccionadas, telas importadas con tecnología anti-manchas y espumas de alta densidad, garantizando no solo una estética impecable sino también una durabilidad que trasciende generaciones.
                </p>
                <p>
                  Continuamos avanzando y ofreciendo lo más vanguardista en términos de diseño, comodidad y tecnología, manteniéndonos fieles a nuestros valores fundacionales de calidad y servicio excepcional.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-[#f0f5e1] p-2 rounded-lg text-[#96C11F]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Calidad Premium</h4>
                    <p className="text-sm text-gray-500 mt-1">Materiales certificados</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-[#f0f5e1] p-2 rounded-lg text-[#96C11F]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Garantía</h4>
                    <p className="text-sm text-gray-500 mt-1">Respaldo total en estructura</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#fdfdf7] py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl text-gray-900 mb-6">Ven y conoce nuestras Colecciones</h2>
          <p className="text-gray-600 text-lg mb-8">
            Te invitamos a visitar nuestras salas de experiencia donde podrás apreciar de primera mano la calidad, texturas y comodidad de nuestro mobiliario.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sedes" className="inline-flex justify-center items-center px-8 py-4 bg-[#96C11F] text-white font-bold rounded-md hover:bg-[#85ab1b] transition-colors">
              Nuestras Sedes
            </Link>
            <Link href="/tienda" className="inline-flex justify-center items-center px-8 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-md hover:bg-gray-50 transition-colors">
              Explorar Tienda
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
