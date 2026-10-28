import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { CatPawIcon } from './CatStickers';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-[#F8C8DC]/60 bg-gradient-to-b from-transparent to-[#FCE7F3]/40 pt-12 pb-16 px-4 text-center relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        {/* Cute Bow Icon */}
        <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-[#F8C8DC] flex items-center justify-center text-xl animate-float">
          🎀
        </div>

        {/* Tagline */}
        <div className="space-y-1">
          <p className="font-serif-title text-lg sm:text-xl font-bold text-[#553047]">
            {birthdayConfig.personalization.websiteTitle}
          </p>
          <p className="text-xs sm:text-sm text-[#8E6E83] italic max-w-md mx-auto">
            "{birthdayConfig.personalization.mainTagline}"
          </p>
        </div>

        {/* Quick Link Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <Link to="/" className="text-xs px-3 py-1 bg-white/70 hover:bg-white text-[#553047] rounded-full border border-pink-200 transition-colors">
            Home
          </Link>
          <Link to="/memories" className="text-xs px-3 py-1 bg-white/70 hover:bg-white text-[#553047] rounded-full border border-pink-200 transition-colors">
            Memories
          </Link>
          <Link to="/fun-zone" className="text-xs px-3 py-1 bg-white/70 hover:bg-white text-[#553047] rounded-full border border-pink-200 transition-colors">
            Fun Zone
          </Link>
          <Link to="/little-things" className="text-xs px-3 py-1 bg-white/70 hover:bg-white text-[#553047] rounded-full border border-pink-200 transition-colors">
            Little Things
          </Link>
          <Link to="/letter" className="text-xs px-3 py-1 bg-white/70 hover:bg-white text-[#553047] rounded-full border border-pink-200 transition-colors">
            Bestie's Letter
          </Link>
          <Link to="/surprise" className="text-xs px-3 py-1 bg-[#E879A9] text-white rounded-full font-semibold shadow-xs hover:bg-[#C94E7F] transition-colors">
            Final Gift 🎁
          </Link>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-4 border-t border-[#F8C8DC]/40 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#8E6E83] gap-2">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E879A9] fill-[#E879A9]" />
            <span>by Bestie for Kartiki's Special Day</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>1 November 2026</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Unlimited Cake & Kitty Love <CatPawIcon className="w-3 h-3 text-[#E879A9]" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
