"use client";
import { useState } from "react";

export default function ProductGallery({ mainImage, gallery }: { mainImage: string, gallery: { id: number, url: string }[] }) {
  // Combine main image with gallery images for the thumbnail strip
  const allImages = [{ id: 0, url: mainImage }, ...gallery];
  const [currentImage, setCurrentImage] = useState(mainImage);
  const [isZooming, setIsZooming] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setTransformOrigin(`${x}% ${y}%`);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Main Image with Zoom */}
        <div 
          className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-zoom-in relative"
          onMouseEnter={() => setIsZooming(true)}
          onMouseLeave={() => setIsZooming(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        >
          <img 
            src={currentImage} 
            alt="Product details" 
            style={{ 
              transformOrigin, 
              transform: isZooming ? "scale(2.5)" : "scale(1)" 
            }}
            className={`w-full h-full object-cover transition-transform ${isZooming ? "duration-0" : "duration-500"}`}
          />
        </div>

        {/* Thumbnails */}
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
            {allImages.map((img) => (
              <button
                key={img.id}
                onClick={() => setCurrentImage(img.url)}
                className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${
                  currentImage === img.url ? "border-primary opacity-100" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img 
                  src={img.url} 
                  alt="Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12">
          <button 
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-primary bg-black/50 rounded-full p-2 transition-colors z-50"
            aria-label="Cerrar imagen"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={currentImage} 
              alt="Vista completa" 
              className="max-w-full max-h-full object-contain select-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
