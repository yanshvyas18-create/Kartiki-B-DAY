import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, Star, Smile, Gift, Lock } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

const stampIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  Sparkles,
  Star,
  Smile,
  Gift,
};

export const SecretMessages: React.FC = () => {
  const { secretMessagesHeading, secretMessagesSubtitle, secretMessages } =
    birthdayConfig.littleThings;

  // Track which envelopes are currently opened
  const [openIds, setOpenIds] = useState<number[]>([]);

  const toggleEnvelope = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section className="mb-20 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FCE7F3] border border-pink-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-2">
          <Mail className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Private Notes</span>
        </div>
        <h3 className="font-serif-title text-3xl font-extrabold text-[#553047]">
          {secretMessagesHeading}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E6E83] mt-2">
          {secretMessagesSubtitle}
        </p>
      </div>

      {/* Envelopes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {secretMessages.map((msg) => {
          const isOpen = openIds.includes(msg.id);
          const StampIcon = stampIcons[msg.stampIcon] || Heart;

          return (
            <div
              key={msg.id}
              onClick={() => toggleEnvelope(msg.id)}
              className="cursor-pointer group select-none transition-all duration-300"
            >
              <div
                className={`paper-card p-5 sm:p-6 border-2 transition-all duration-300 relative ${
                  isOpen
                    ? 'border-[#E879A9] bg-white shadow-lg -translate-y-1'
                    : 'border-[#F8C8DC] bg-gradient-to-br from-white to-[#FFF9F2] shadow-sm hover:border-[#E879A9] hover:shadow-md'
                }`}
              >
                {/* Washi Tape */}
                <div className="washi-tape washi-tape-peach"></div>

                {/* Envelope Header Icon & Label */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isOpen
                          ? 'bg-[#E879A9] text-white'
                          : 'bg-[#FCE7F3] text-[#E879A9] group-hover:scale-105'
                      }`}
                    >
                      {isOpen ? (
                        <MailOpen className="w-4 h-4" />
                      ) : (
                        <Mail className="w-4 h-4" />
                      )}
                    </div>
                    <span className="font-bold text-xs text-[#553047]">
                      {msg.label}
                    </span>
                  </div>

                  {/* Stamp Seal */}
                  <div className="w-7 h-7 rounded-full bg-[#FFF9F2] border border-[#F8C8DC] flex items-center justify-center text-[#E879A9]">
                    <StampIcon className="w-3.5 h-3.5 fill-pink-100" />
                  </div>
                </div>

                {/* Content */}
                {!isOpen ? (
                  <div className="py-4 text-center">
                    <p className="text-xs text-[#8E6E83] italic mb-3">
                      "{msg.preview}"
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E879A9] bg-pink-50 px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3" /> Tap to Unseal Note
                    </span>
                  </div>
                ) : (
                  <div className="py-2 animate-in fade-in zoom-in-95 duration-200">
                    <p className="handwritten text-xl text-[#553047] font-semibold leading-relaxed mb-4">
                      "{msg.content}"
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-pink-100 text-[10px] text-[#8E6E83]">
                      <span>With love, Bestie 🎀</span>
                      <span className="text-[#E879A9] font-bold">Tap to fold</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
