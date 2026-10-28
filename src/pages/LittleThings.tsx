import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { ComplimentSection } from '../components/ComplimentSection';
import { SecretMessages } from '../components/SecretMessages';
import { WishWall } from '../components/WishWall';
import { EasterEggBadge } from '../components/EasterEggBadge';

import { CatPawIcon } from '../components/CatStickers';

export const LittleThings: React.FC = () => {
  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFDCC8] border border-orange-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-3">
          <span>🎀</span>
          <span>Compliments & Whispers</span>
          <CatPawIcon className="w-3.5 h-3.5 text-[#E879A9]" />
        </div>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-extrabold text-[#553047] leading-tight">
          {birthdayConfig.littleThings.heading}
        </h1>
        <p className="text-sm sm:text-base text-[#8E6E83] mt-3 leading-relaxed">
          Kuch baatein roz nahi boli jaati, lekin aaj officially bolni padegi! 😂💗
        </p>
      </div>

      {/* Compliment Section (Funny & Wholesome) */}
      <ComplimentSection />

      {/* Secret Envelopes */}
      <SecretMessages />

      {/* Birthday Wish Wall */}
      <WishWall />

      {/* Hidden Easter Egg Badge */}
      <EasterEggBadge />

      {/* Next Step CTA -> Page 5 (Letter) */}
      <div className="mt-12 text-center">
        <Link
          to="/letter"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Mail className="w-5 h-5" />
          <span>Next: Read Bestie's Heartfelt Letter 💌</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
