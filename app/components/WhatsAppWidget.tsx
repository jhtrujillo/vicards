"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppWidget() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay showing the widget slightly so it pops in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <a 
      href="https://wa.me/573113791524?text=Hola,%20me%20gustar%C3%ADa%20recibir%20asesor%C3%ADa%20sobre%20sus%20muebles." 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 animate-fade-in-up"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></span>
    </a>
  );
}
