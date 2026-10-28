import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Camera, Heart, ArrowDown } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface BirthdayHeroProps {
  onExploreClick: () => void;
}

export const BirthdayHero: React.FC<BirthdayHeroProps> = ({ onExploreClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative pt-6 pb-14 px-4 sm:px-6 max-w-5xl mx-auto text-center">
      {/* Top Small Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCE7F3] border border-[#F8C8DC] text-[#553047] text-xs font-bold tracking-wider uppercase mb-6 shadow-xs animate-float">
        <span>🎀</span>
        <span>{birthdayConfig.hero.badgeText}</span>
        <Heart className="w-3.5 h-3.5 text-[#E879A9] fill-[#E879A9]" />
      </div>

      {/* Main Headline */}
      <h1 className="font-serif-title text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#553047] leading-tight mb-4 tracking-tight">
        {birthdayConfig.hero.headline}
      </h1>

      {/* Funny Subtitle */}
      <p className="text-base sm:text-xl text-[#8E6E83] max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
        {birthdayConfig.hero.subtitle}
      </p>

      {/* Featured Polaroid Photo Card */}
      <div className="relative max-w-xs sm:max-w-sm mx-auto mb-10 group">
        {/* Washi tape on top */}
        <div className="washi-tape washi-tape-lavender"></div>

        {/* Polaroid frame */}
        <div className="polaroid-card rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
          <div className="w-full aspect-square bg-[#FCE7F3] rounded-sm overflow-hidden relative flex items-center justify-center border border-pink-100">
            {!imgError ? (
              <img
                src={birthdayConfig.hero.featuredPhotoUrl}
                alt="Kartiki Birthday Star"
                loading="eager"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center text-[#553047]">
                <div className="w-16 h-16 rounded-full bg-white shadow-xs flex items-center justify-center text-3xl mb-3 border border-pink-200">
                  👑
                </div>
                <h3 className="font-serif-title font-bold text-xl text-[#553047]">Kartiki ✨</h3>
                <p className="text-xs text-[#8E6E83] mt-1">Main Character & Birthday Star 🎀</p>
                <span className="mt-2 text-[11px] text-[#C94E7F] font-semibold bg-pink-50 px-2 py-0.5 rounded-full">
                  100% Iconic
                </span>
              </div>
            )}
          </div>
          {/* Polaroid handwritten caption */}
          <div className="pt-3 pb-1 text-center">
            <p className="handwritten text-2xl text-[#553047] font-semibold">
              The One & Only Birthday Girl 💗
            </p>
            <p className="text-[10px] text-[#8E6E83] tracking-widest uppercase mt-0.5">
              1 November 2026 • Bestie Special
            </p>
          </div>
        </div>

        {/* Floating sticker badge */}
        <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-[#FFDCC8] to-[#F8C8DC] text-[#553047] text-xs font-bold px-3 py-1.5 rounded-full shadow-md border border-white flex items-center gap-1 -rotate-6">
          <span>✨ Certified Cutie</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
        <button
          onClick={onExploreClick}
          type="button"
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-sm sm:text-base shadow-md shadow-pink-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>{birthdayConfig.hero.primaryButtonText}</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </button>

        <Link
          to="/memories"
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[#FFF9F2] text-[#553047] font-bold text-sm sm:text-base border-2 border-[#F8C8DC] hover:border-[#E879A9] shadow-xs transition-all flex items-center justify-center gap-2"
        >
          <Camera className="w-4 h-4 text-[#E879A9]" />
          <span>{birthdayConfig.hero.secondaryButtonText}</span>
        </Link>
      </div>
    </section>
  );
};
