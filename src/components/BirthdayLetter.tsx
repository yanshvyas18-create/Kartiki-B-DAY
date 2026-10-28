import React, { useState } from 'react';
import { Mail, MailOpen, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { birthdayConfig } from '../config/birthdayConfig';
import { triggerBirthdayConfetti } from './ConfettiEffect';

export const BirthdayLetter: React.FC = () => {
  const { heading, intro, envelopeLabel, openPrompt, content, signature, continueButtonText } =
    birthdayConfig.letter;

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    setIsOpen(true);
    triggerBirthdayConfetti(0.4);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FCE7F3] border border-pink-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Exclusive for Kartiki</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-extrabold text-[#553047] leading-tight">
          {heading}
        </h1>
        <p className="text-sm sm:text-base text-[#8E6E83] mt-3 leading-relaxed">
          {intro}
        </p>
      </div>

      {!isOpen ? (
        /* CLOSED ENVELOPE STATE */
        <div className="paper-card p-8 sm:p-12 border-2 border-[#F8C8DC] shadow-xl text-center max-w-lg mx-auto relative group">
          <div className="washi-tape washi-tape-lavender"></div>

          {/* Envelope Visual */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#F8C8DC] to-[#FCE7F3] border-2 border-[#E879A9]/30 flex items-center justify-center mx-auto mb-6 shadow-md group-hover:scale-105 transition-transform duration-300">
            <Mail className="w-12 h-12 text-[#E879A9]" />
          </div>

          <span className="text-xs uppercase font-bold text-[#8E6E83] tracking-widest block mb-1">
            {envelopeLabel}
          </span>
          <h3 className="font-serif-title text-2xl font-bold text-[#553047] mb-6">
            A Letter From Your Bestie 🎀
          </h3>

          <button
            onClick={handleOpenLetter}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <MailOpen className="w-5 h-5" />
            <span>{openPrompt}</span>
          </button>
        </div>
      ) : (
        /* OPENED LETTER ON ELEGANT PAPER CARD */
        <div className="paper-card p-6 sm:p-12 border-2 border-[#F8C8DC] shadow-2xl relative animate-in fade-in zoom-in-95 duration-500">
          {/* Top Washi Tape */}
          <div className="washi-tape washi-tape-peach"></div>

          {/* Stamp Seal on top right */}
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#FFF9F2] border-2 border-dashed border-[#E879A9] flex items-center justify-center text-[#E879A9] shadow-xs">
            <Heart className="w-6 h-6 fill-pink-100" />
          </div>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 pt-4 sm:pt-6 font-serif-title text-base sm:text-lg text-[#553047] leading-relaxed max-w-2xl mx-auto">
            {content.map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'handwritten text-3xl sm:text-4xl font-bold text-[#E879A9] mb-4'
                    : 'text-[#553047] font-medium leading-relaxed'
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Handwritten Signature */}
          <div className="mt-8 pt-6 border-t border-pink-200 text-right max-w-2xl mx-auto">
            <p className="handwritten text-3xl sm:text-4xl text-[#E879A9] font-bold leading-tight whitespace-pre-line">
              {signature}
            </p>
          </div>

          {/* Continue to Final Surprise Button */}
          <div className="mt-10 pt-6 text-center">
            <Link
              to="/surprise"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-extrabold text-base shadow-lg shadow-pink-300 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>{continueButtonText}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
