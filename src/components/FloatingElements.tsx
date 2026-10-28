import React from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const FloatingElements: React.FC = () => {
  if (!birthdayConfig.theme.enableFloatingHearts) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none opacity-40">
      {/* Top Left Heart */}
      <div 
        className="absolute top-12 left-6 text-[#F8C8DC] animate-float"
        style={{ animationDuration: '6s' }}
      >
        <Heart className="w-8 h-8 fill-pink-100/50" />
      </div>

      {/* Top Right Star */}
      <div 
        className="absolute top-20 right-10 text-[#FFDCC8] animate-float-delayed"
        style={{ animationDuration: '7s' }}
      >
        <Star className="w-6 h-6 fill-amber-100/60" />
      </div>

      {/* Mid Left Sparkle */}
      <div 
        className="absolute top-1/3 left-4 text-[#E9DDFB] animate-float"
        style={{ animationDuration: '8s', animationDelay: '1s' }}
      >
        <Sparkles className="w-7 h-7 text-[#C084FC]/40" />
      </div>

      {/* Mid Right Heart */}
      <div 
        className="absolute top-1/2 right-6 text-[#F8C8DC] animate-float-delayed"
        style={{ animationDuration: '7.5s' }}
      >
        <Heart className="w-7 h-7 fill-pink-200/40" />
      </div>

      {/* Bottom Left Bow/Heart */}
      <div 
        className="absolute bottom-24 left-10 text-[#FFDCC8] animate-float"
        style={{ animationDuration: '6.5s', animationDelay: '2s' }}
      >
        <span className="text-2xl opacity-60">🎀</span>
      </div>

      {/* Floating Cute Pastel Kitten Accent */}
      <div 
        className="absolute top-1/4 right-8 text-[#F8C8DC] animate-float-delayed"
        style={{ animationDuration: '8.5s' }}
      >
        <span className="text-2xl opacity-50">🐱</span>
      </div>

      {/* Floating Paw Print Accent */}
      <div 
        className="absolute bottom-1/3 left-8 text-[#E879A9] animate-float"
        style={{ animationDuration: '7s', animationDelay: '3s' }}
      >
        <span className="text-xl opacity-40">🐾</span>
      </div>

      {/* Bottom Right Star & Paw */}
      <div 
        className="absolute bottom-16 right-12 text-[#E9DDFB] animate-float-delayed"
        style={{ animationDuration: '9s' }}
      >
        <Sparkles className="w-8 h-8 text-pink-300/40" />
      </div>
    </div>
  );
};
