import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Heart } from 'lucide-react';
import type { GalleryItem } from '../config/birthdayConfig';

interface PhotoLightboxProps {
  item: GalleryItem;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  item,
  isOpen,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}) => {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#553047]/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-[#F8C8DC] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header / Close Button */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#FFF9F2] border-b border-pink-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E879A9] animate-pulse"></span>
            <span className="text-xs font-bold text-[#553047] tracking-wider uppercase">
              Memory {currentIndex + 1} of {totalCount}
            </span>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 rounded-full bg-white hover:bg-pink-100 text-[#553047] border border-pink-200 flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Photo Area */}
        <div className="relative bg-[#FFF9F2] flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden p-4">
          <img
            src={item.url}
            alt={item.altText}
            className="max-h-[55vh] w-auto max-w-full object-contain rounded-xl shadow-md border-2 border-white"
          />

          {/* Navigation Arrows */}
          <button
            onClick={onPrev}
            type="button"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#553047] shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-pink-200"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={onNext}
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[#553047] shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-pink-200"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Details Caption */}
        <div className="p-6 bg-white border-t border-pink-100">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h3 className="font-serif-title text-xl font-bold text-[#553047]">
              {item.caption}
            </h3>
            {item.date && (
              <span className="inline-flex items-center gap-1.5 text-xs text-[#8E6E83] bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                <Calendar className="w-3.5 h-3.5 text-[#E879A9]" />
                {item.date}
              </span>
            )}
          </div>

          {item.description && (
            <p className="text-sm text-[#8E6E83] leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-[#8E6E83]">
            <span className="flex items-center gap-1">
              <Heart className="w-3.5 h-3.5 text-[#E879A9] fill-[#E879A9]" />
              Kartiki Special Memory
            </span>
            <span>Use ← → keys to navigate • Esc to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};
