"use client";

import { useRef, useState, useEffect } from "react";

interface Experience {
  id: number;
  city: string;
  title: string;
  image: string;
}

export default function ExperienceCarousel({ items }: { items: Experience[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMomentum, setIsMomentum] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  
  // Momentum refs
  const velocityRef = useRef(0);
  const momentumRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, time: 0 });

  const infiniteItems = [...items, ...items, ...items];

  useEffect(() => {
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

    if (container.scrollLeft < singleSetWidth / 2) {
      container.style.scrollBehavior = 'auto'; 
      container.scrollLeft += singleSetWidth;
      requestAnimationFrame(() => {
        if (container) container.style.scrollBehavior = '';
      });
    } else if (container.scrollLeft > singleSetWidth * 2) {
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
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsMomentum(true);
    
    const momentumLoop = () => {
      if (!scrollRef.current) return;
      if (Math.abs(velocityRef.current) > 0.1) {
        scrollRef.current.scrollLeft -= velocityRef.current * 16;
        velocityRef.current *= 0.97; 
        momentumRef.current = requestAnimationFrame(momentumLoop);
      } else {
        setIsMomentum(false);
      }
    };
    
    momentumRef.current = requestAnimationFrame(momentumLoop);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
    
    const now = Date.now();
    const dt = now - lastPosRef.current.time;
    if (dt > 10) {
      const dx = e.pageX - lastPosRef.current.x;
      velocityRef.current = dx / dt;
      lastPosRef.current = { x: e.pageX, time: now };
    }
  };

  return (
    <div className="relative mt-12 group">
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

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUpOrLeave}
        onMouseUp={handleMouseUpOrLeave}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] select-none ${isDragging || isMomentum ? 'cursor-grabbing snap-none scroll-auto' : 'cursor-grab snap-x snap-mandatory scroll-smooth'}`}
      >
        {infiniteItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="w-[85vw] sm:w-[45vw] lg:w-[320px] flex-shrink-0 snap-start bg-white overflow-hidden shadow-md group/card pointer-events-none border border-gray-100">
            <div className="h-48 md:h-64 relative overflow-hidden bg-gray-200 pointer-events-auto">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110 pointer-events-none"
                draggable={false}
              />
            </div>
            <div className="p-5 pointer-events-auto bg-white">
              <p className="text-gray-600 text-sm mb-2 flex items-center gap-2 font-medium">
                <span className="w-1.5 h-1.5 bg-gray-600 rounded-full inline-block"></span> {item.city}
              </p>
              <h3 className="text-[#96C11F] font-bold text-xl">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
