import React from 'react';
import { Sparkles, Coffee, Utensils, HeartHandshake, Heart, Calendar } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Coffee,
  Utensils,
  HeartHandshake,
};

export const MemoryTimeline: React.FC = () => {
  const items = birthdayConfig.timeline.items;

  return (
    <section className="mb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#E9DDFB] border border-purple-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-3">
          <Heart className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Timeline of Us</span>
        </div>
        <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#553047] leading-tight">
          {birthdayConfig.timeline.heading}
        </h2>
        <p className="text-sm sm:text-base text-[#8E6E83] mt-3 leading-relaxed">
          {birthdayConfig.timeline.subtitle}
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative max-w-3xl mx-auto px-4">
        {/* Center vertical dashed line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 border-l-2 border-dashed border-[#F8C8DC]"></div>

        <div className="space-y-8 sm:space-y-12">
          {items.map((item, index) => {
            const Icon = iconMap[item.iconName] || Sparkles;
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 group`}
              >
                {/* Center Node Icon */}
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white border-2 border-[#E879A9] shadow-md flex items-center justify-center text-[#E879A9] z-10 group-hover:scale-110 group-hover:bg-[#FCE7F3] transition-all">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Content Card (Left or Right on desktop) */}
                <div className="ml-14 sm:ml-0 sm:w-1/2 px-2 sm:px-6">
                  <div className="paper-card p-6 border border-[#F8C8DC] shadow-sm hover:shadow-md hover:border-[#E879A9] transition-all duration-300 relative">
                    {/* Washi tape */}
                    <div className="washi-tape washi-tape-peach"></div>

                    {/* Tag & Date */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FCE7F3] text-[#C94E7F]">
                        {item.tag}
                      </span>
                      {item.date && (
                        <span className="text-xs text-[#8E6E83] flex items-center gap-1 font-medium">
                          <Calendar className="w-3 h-3 text-[#E879A9]" />
                          {item.date}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-title text-lg sm:text-xl font-bold text-[#553047] mb-2">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#8E6E83] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
