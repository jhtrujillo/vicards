"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title1: string;
  title2: string;
  titleHighlight: string;
  subtitle: string;
  text1: string;
  text2: string;
}

const AUTO_PLAY_INTERVAL = 5000;

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  if (!slides || slides.length === 0) return null;

  return (
    <section 
      className="relative h-[80vh] min-h-[600px] flex items-center pt-[104px] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-40 bg-black/20 hover:bg-[#70970A] text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 bg-black/20 hover:bg-[#70970A] text-white p-3 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
        aria-label="Siguiente"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, index: number) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-[#70970A] w-8" : "bg-white/50 hover:bg-white"
            }`}
            aria-label={`Ir a la diapositiva ${index + 1}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-[#1a1a1a]">
            <img 
              src={slides[currentIndex].image} 
              alt="Hero image" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-6xl font-display font-black text-primary leading-tight mb-4 tracking-tight drop-shadow-lg">
              {slides[currentIndex].title1} <br />
              {slides[currentIndex].title2} <br />
              <span className="text-white">{slides[currentIndex].titleHighlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-white mb-6 font-medium drop-shadow-md">
              {slides[currentIndex].subtitle}
            </p>
            
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-0.5 w-12 bg-primary mb-6 origin-left"
            ></motion.div>
            
            <p className="text-gray-200 text-base mb-2 font-sans font-medium drop-shadow-sm">
              {slides[currentIndex].text1}
            </p>
            <p className="text-gray-200 text-base mb-8 font-sans font-medium drop-shadow-sm uppercase tracking-wide">
              {slides[currentIndex].text2}
            </p>
            
            <Link 
              href="/tienda" 
              className="inline-block bg-[#70970A] hover:bg-primary text-white font-bold py-3 px-8 transition-colors text-base"
            >
              Conoce más
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
