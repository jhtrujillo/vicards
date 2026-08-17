"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export default function ProductCarousel({ products }: { products: Product[] }) {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMomentum, setIsMomentum] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  
  // Momentum refs
  const velocityRef = useRef(0);
  const momentumRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, time: 0 });
  const hasDraggedRef = useRef(false);

  // Create an artificially long array to simulate infinite scrolling
  const infiniteProducts = [...products, ...products, ...products];

  useEffect(() => {
    // Start in the middle set of products to allow scrolling in both directions
    if (scrollRef.current) {
      setTimeout(() => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;
      }, 100);
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const singleSetWidth = container.scrollWidth / 3;

    // If we scrolled into the first third, jump to the middle third
    if (container.scrollLeft < singleSetWidth / 2) {
      container.style.scrollBehavior = 'auto'; 
      container.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        if (container) container.style.scrollBehavior = '';
      });
    } 
    // If we scrolled into the last third, jump back to the middle third
    else if (container.scrollLeft > singleSetWidth * 2) {
      container.style.scrollBehavior = 'auto';
      container.scrollLeft -= singleSetWidth;
      requestAnimationFrame(() => {
        if (container) container.style.scrollBehavior = '';
      });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -350, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
    }
  };

  // Drag to scroll logic with momentum
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    if (momentumRef.current) cancelAnimationFrame(momentumRef.current);
    
    setIsDragging(true);
    setIsMomentum(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
    
    lastPosRef.current = { x: e.pageX, time: Date.now() };
    velocityRef.current = 0;
    hasDraggedRef.current = false;
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsMomentum(true);
    
    const momentumLoop = () => {
      if (!scrollRef.current) return;
      // Lower threshold from 0.5 to 0.1 to let it glide longer before stopping
      if (Math.abs(velocityRef.current) > 0.1) {
        scrollRef.current.scrollLeft -= velocityRef.current * 16;
        // Increase friction multiplier from 0.92 to 0.97 so it loses less speed per frame (longer glide)
        velocityRef.current *= 0.97; 
        momentumRef.current = requestAnimationFrame(momentumLoop);
      } else {
        setIsMomentum(false); // Stop momentum, re-enable snap
      }
    };
    
    momentumRef.current = requestAnimationFrame(momentumLoop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    
    // Calculate movement
    const walk = (x - startX) * 2;
    if (Math.abs(x - startX) > 5) {
      hasDraggedRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
    
    // Calculate velocity
    const now = Date.now();
    const dt = now - lastPosRef.current.time;
    if (dt > 10) {
      const dx = e.pageX - lastPosRef.current.x;
      velocityRef.current = dx / dt;
      lastPosRef.current = { x: e.pageX, time: now };
    }
  };

  const handleCardClick = (id: number) => {
    if (!hasDraggedRef.current) {
      router.push(`/producto?id=${id}`);
    }
  };

  return (
    <div className="relative group">
      {/* Navigation Buttons */}
      <button 
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 z-10 bg-white/90 backdrop-blur shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-[#70970A] hover:bg-[#70970A] hover:text-white transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button 
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 z-10 bg-white/90 backdrop-blur shadow-lg rounded-full w-12 h-12 flex items-center justify-center text-[#70970A] hover:bg-[#70970A] hover:text-white transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-0"
        aria-label="Siguiente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none ${isDragging || isMomentum ? 'cursor-grabbing snap-none scroll-auto' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
      >
        {infiniteProducts.map((item, index) => {
          const formattedPrice = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(Number(item.price));
          return (
            <div 
              key={`${item.id}-${index}`} 
              onClick={() => handleCardClick(item.id)}
              className="w-[85vw] sm:w-[45vw] lg:w-[280px] flex-shrink-0 snap-start bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group/card pointer-events-auto cursor-pointer"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-200">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 pointer-events-none"
                  draggable={false}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-gray-900 font-medium py-2 px-6 rounded-md hover:bg-[#70970A] hover:text-white transition-colors transform translate-y-4 group-hover/card:translate-y-0 duration-300">
                    Ver Detalles
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-[#70970A] font-medium">{formattedPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
