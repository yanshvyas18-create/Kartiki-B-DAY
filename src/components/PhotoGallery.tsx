import React, { useState } from 'react';
import { Camera, Eye } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { PhotoLightbox } from './PhotoLightbox';

export const PhotoGallery: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items = birthdayConfig.gallery.items;

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length);
    }
  };

  return (
    <section className="mb-20">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FCE7F3] border border-pink-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-3">
          <Camera className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Polaroid Scrapbook</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#553047] leading-tight">
          {birthdayConfig.gallery.heading}
        </h2>
        <p className="text-sm sm:text-base text-[#8E6E83] mt-3 leading-relaxed">
          {birthdayConfig.gallery.subtitle}
        </p>
      </div>

      {/* Polaroid Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {items.map((item, index) => {
          const rotationStyle = item.rotation ? { transform: `rotate(${item.rotation})` } : {};

          return (
            <div
              key={item.id}
              onClick={() => handleOpen(index)}
              className="group cursor-pointer select-none"
              style={rotationStyle}
            >
              <div className="polaroid-card relative">
                {/* Washi Tape on Alternate Cards */}
                {index % 2 === 0 ? (
                  <div className="washi-tape washi-tape-peach"></div>
                ) : (
                  <div className="washi-tape washi-tape-lavender"></div>
                )}

                {/* Photo frame */}
                <div className="w-full aspect-[4/3] sm:aspect-square bg-[#FCE7F3] rounded-xs overflow-hidden relative border border-pink-100 flex items-center justify-center">
                  <img
                    src={item.url}
                    alt={item.altText}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay with Eye */}
                  <div className="absolute inset-0 bg-[#553047]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-4 py-2 bg-white/95 rounded-full text-xs font-bold text-[#553047] flex items-center gap-1.5 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-3.5 h-3.5 text-[#E879A9]" /> Click to Expand
                    </span>
                  </div>

                  {/* Tag badge */}
                  {item.tag && (
                    <span className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold text-[#553047] px-2 py-0.5 rounded shadow-xs border border-pink-200">
                      {item.tag}
                    </span>
                  )}
                </div>

                {/* Handwritten Polaroid Caption */}
                <div className="pt-4 pb-2 px-1 text-center">
                  <p className="handwritten text-xl sm:text-2xl text-[#553047] font-semibold leading-tight group-hover:text-[#E879A9] transition-colors">
                    {item.caption}
                  </p>
                  {item.date && (
                    <p className="text-[11px] text-[#8E6E83] mt-1 font-medium tracking-wide">
                      {item.date}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <PhotoLightbox
          item={items[selectedIndex]}
          isOpen={selectedIndex !== null}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          currentIndex={selectedIndex}
          totalCount={items.length}
        />
      )}
    </section>
  );
};
