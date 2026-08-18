"use client";
import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#FAFAFA] flex flex-col pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#96C11F] font-bold tracking-widest uppercase text-sm mb-4 block">Hablemos</span>
          <h1 className="font-display font-bold text-4xl md:text-5xl text-gray-900 mb-6">Contáctenos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Estamos listos para asesorarte y ayudarte a crear el hogar de tus sueños. Déjanos tus datos o visítanos en nuestro showroom.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Contact Info (Left) */}
          <div className="w-full lg:w-2/5 bg-[#1a1a1a] text-white p-10 md:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#96C11F] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="font-display text-3xl font-bold mb-8">Información de Contacto</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-[#96C11F]">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Nuestras Sedes</h3>
                    <div className="text-gray-400 leading-relaxed text-sm space-y-2">
                      <p><strong className="text-white">Ciudad Jardín:</strong><br/>Calle 16 No. 100A - 35</p>
                      <p><strong className="text-white">Las Delicias:</strong><br/>Calle 44 No. 4E - 13</p>
                      <p><strong className="text-white">Alianza:</strong><br/>Calle 44 No. 1D2 - 25Norte</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-[#96C11F]">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Llámanos</h3>
                    <p className="text-gray-400">
                      <a href="tel:3160180007" className="hover:text-white transition-colors">316 0180007</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-[#96C11F]">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Escríbenos</h3>
                    <p className="text-gray-400">
                      <a href="mailto:servicioalcliente@vicars.com" className="hover:text-white transition-colors break-all">servicioalcliente@vicars.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-full text-[#96C11F]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Horarios</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Lunes a Viernes: 8:00 AM - 6:00 PM<br />
                      Sábados: 9:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm">
                También puedes escribirnos directamente por WhatsApp para una atención más rápida y personalizada.
              </p>
              <a 
                href="https://wa.me/573160180007" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[#96C11F] font-bold hover:text-white transition-colors"
              >
                Chat por WhatsApp &rarr;
              </a>
            </div>
          </div>

          {/* Contact Form (Right) */}
          <div className="w-full lg:w-3/5 p-10 md:p-14">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Envíanos un mensaje</h2>
            <p className="text-gray-500 mb-8">Completa el formulario y uno de nuestros asesores se pondrá en contacto contigo pronto.</p>

            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 ml-1" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">¡Mensaje Enviado!</h3>
                <p className="text-green-700">Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos a la mayor brevedad posible.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-green-700 font-bold hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      required
                      value={formData.nombre}
                      onChange={e => setFormData({...formData, nombre: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96C11F] focus:bg-white transition-colors"
                      placeholder="Ej. Juan Pérez"
                    />
                  </div>
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">Teléfono / Celular *</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      required
                      value={formData.telefono}
                      onChange={e => setFormData({...formData, telefono: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96C11F] focus:bg-white transition-colors"
                      placeholder="Ej. 300 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96C11F] focus:bg-white transition-colors"
                    placeholder="ejemplo@correo.com"
                  />
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                  <textarea 
                    id="mensaje" 
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={e => setFormData({...formData, mensaje: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#96C11F] focus:bg-white transition-colors resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full md:w-auto px-10 py-4 bg-[#96C11F] hover:bg-[#85ab1b] text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
