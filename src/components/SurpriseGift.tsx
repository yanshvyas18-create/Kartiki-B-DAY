import React, { useState } from 'react';
import { Gift, Sparkles, Home, Share2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { birthdayConfig } from '../config/birthdayConfig';
import { triggerBirthdayConfetti, triggerStarConfetti } from './ConfettiEffect';
import { CatPawIcon, PeekingKittenSticker } from './CatStickers';

export const SurpriseGift: React.FC = () => {
  const {
    heading,
    subtitle,
    boxButtonText,
    revealedTitle,
    message,
    signature,
    backHomeButtonText,
    shareButtonText,
    featuredPhotoUrl,
  } = birthdayConfig.finalSurprise;

  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    triggerBirthdayConfetti(0.4);
    triggerStarConfetti();
  };

  const handleShare = async () => {
    const text = `Check out Kartiki's Little Birthday Universe 💗! A special surprise made by Bestie! 🎀`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Kartiki's Little Birthday Universe",
          text,
          url: window.location.origin,
        });
        return;
      } catch {
        // Fallback
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Ignored
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 text-center">
      {/* Header */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#FCE7F3] border border-pink-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-3">
          <Gift className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>The Grand Finale</span>
          <CatPawIcon className="w-3.5 h-3.5 text-[#E879A9]" />
        </div>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-extrabold text-[#553047] leading-tight">
          {heading}
        </h1>
        <p className="text-sm sm:text-base text-[#8E6E83] mt-3 leading-relaxed">
          {subtitle}
        </p>
      </div>

      {!isOpen ? (
        /* CLOSED INTERACTIVE GIFT BOX */
        <div className="paper-card p-8 sm:p-14 border-2 border-[#E879A9] shadow-xl max-w-md mx-auto relative group">
          <div className="washi-tape washi-tape-peach"></div>

          {/* Peeking Kitten behind Gift Box */}
          <div className="absolute -top-7 right-6 pointer-events-none z-20 group-hover:scale-110 transition-transform">
            <PeekingKittenSticker className="w-16 h-12" />
          </div>

          {/* 3D-Like Gift Box Graphic */}
          <div className="relative w-36 h-36 mx-auto mb-8 cursor-pointer select-none" onClick={handleOpenGift}>
            {/* Gift Box Base */}
            <div className="absolute inset-x-2 bottom-0 h-24 bg-gradient-to-tr from-[#E879A9] to-[#FF9EAA] rounded-2xl shadow-lg border-2 border-white flex items-center justify-center">
              {/* Vertical Gold Ribbon */}
              <div className="absolute inset-y-0 w-6 bg-[#FFD166] shadow-xs"></div>
              {/* Horizontal Gold Ribbon */}
              <div className="absolute inset-x-0 h-6 bg-[#FFD166] shadow-xs"></div>
            </div>

            {/* Gift Box Lid with Ribbon Bow */}
            <div className="absolute inset-x-0 top-3 h-10 bg-gradient-to-r from-[#FF758F] to-[#E879A9] rounded-xl shadow-md border-2 border-white group-hover:-translate-y-2 transition-transform duration-300 flex items-center justify-center">
              <div className="w-6 h-full bg-[#FFD166]"></div>
              {/* Bow on Top */}
              <div className="absolute -top-6 text-3xl animate-bounce">
                🎀
              </div>
            </div>
          </div>

          <h3 className="font-serif-title text-xl font-bold text-[#553047] mb-6">
            Something Made With Whole Heart 💗
          </h3>

          <button
            onClick={handleOpenGift}
            type="button"
            className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-extrabold text-base shadow-lg shadow-pink-300 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>{boxButtonText}</span>
          </button>
        </div>
      ) : (
        /* REVEALED GRAND SURPRISE */
        <div className="paper-card p-6 sm:p-12 border-2 border-[#E879A9] shadow-2xl relative text-left animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
          <div className="washi-tape washi-tape-lavender"></div>

          {/* Header Badge */}
          <div className="flex items-center gap-2 mb-6 text-[#E879A9]">
            <Sparkles className="w-6 h-6 animate-spin" />
            <span className="font-serif-title text-2xl font-bold">
              {revealedTitle}
            </span>
          </div>

          {/* Featured Photo Polaroid with preserved aspect ratio */}
          {featuredPhotoUrl && (
            <div className="max-w-[240px] mx-auto mb-8 polaroid-card -rotate-1">
              <div className="aspect-[4/5] bg-[#FCE7F3] rounded-sm overflow-hidden flex items-center justify-center">
                {!imgError ? (
                  <img
                    src={featuredPhotoUrl}
                    alt="Kartiki & Bestie"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center top' }}
                  />
                ) : (
                  <div className="text-center p-4">
                    <span className="text-3xl">💖</span>
                    <p className="text-xs text-[#553047] font-bold mt-1">Kartiki 🎀</p>
                  </div>
                )}
              </div>
              <p className="handwritten text-lg text-[#553047] text-center pt-2 font-semibold flex items-center justify-center gap-1.5">
                <span>Forever Besties 🫶</span>
                <CatPawIcon className="w-3.5 h-3.5 text-[#E879A9]" />
              </p>
            </div>
          )}

          {/* Message Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-[#553047] leading-relaxed font-serif-title mb-8">
            {message.map((line, idx) => (
              <p key={idx} className="font-medium">
                {line}
              </p>
            ))}
          </div>

          {/* Signature */}
          <div className="pt-4 border-t border-pink-200 text-right">
            <p className="handwritten text-3xl sm:text-4xl text-[#E879A9] font-bold whitespace-pre-line">
              {signature}
            </p>
          </div>

          {/* Navigation & Share Buttons */}
          <div className="mt-10 pt-6 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-[#553047] font-bold text-xs border border-pink-200 shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-4 h-4 text-[#E879A9]" />
              <span>{backHomeButtonText}</span>
            </Link>

            <button
              onClick={handleShare}
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E879A9] hover:bg-[#C94E7F] text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>{shareButtonText}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
