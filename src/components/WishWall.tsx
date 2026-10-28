import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const WishWall: React.FC = () => {
  const { wishWallHeading, wishWallSubtitle, wishes } = birthdayConfig.littleThings;

  return (
    <section className="mb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#E9DDFB] border border-purple-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Intentions & Prayers</span>
        </div>
        <h3 className="font-serif-title text-3xl font-extrabold text-[#553047]">
          {wishWallHeading}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E6E83] mt-2">
          {wishWallSubtitle}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {wishes.map((wish) => (
          <div
            key={wish.id}
            className="paper-card p-6 border border-[#F8C8DC] shadow-sm hover:shadow-md hover:border-[#E879A9] transition-all relative group"
          >
            {/* Corner emoji */}
            <div className="w-10 h-10 rounded-full bg-[#FFF9F2] border border-pink-100 flex items-center justify-center text-xl shadow-xs mb-3 group-hover:scale-110 transition-transform">
              {wish.emoji}
            </div>

            <h4 className="font-serif-title text-lg font-bold text-[#553047] mb-1.5">
              {wish.title}
            </h4>

            <p className="text-xs sm:text-sm text-[#8E6E83] leading-relaxed">
              {wish.message}
            </p>

            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-[11px] text-[#8E6E83]">
              <span className="capitalize font-semibold text-[#E879A9] bg-pink-50 px-2.5 py-0.5 rounded-full">
                {wish.category}
              </span>
              <Heart className="w-3 h-3 text-[#E879A9] fill-[#E879A9]" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
