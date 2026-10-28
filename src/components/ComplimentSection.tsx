import React, { useState } from 'react';
import { Laugh, Heart, RefreshCw } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const ComplimentSection: React.FC = () => {
  const [mode, setMode] = useState<'funny' | 'sweet'>('funny');
  const [funnyIndex, setFunnyIndex] = useState(0);
  const [sweetIndex, setSweetIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const funnyList = birthdayConfig.littleThings.funnyCompliments;
  const sweetList = birthdayConfig.littleThings.sweetCompliments;

  const currentMessage =
    mode === 'funny' ? funnyList[funnyIndex] : sweetList[sweetIndex];

  const handleNextMessage = () => {
    setIsAnimating(true);

    setTimeout(() => {
      if (mode === 'funny') {
        let nextIdx = Math.floor(Math.random() * funnyList.length);
        if (nextIdx === funnyIndex) {
          nextIdx = (funnyIndex + 1) % funnyList.length;
        }
        setFunnyIndex(nextIdx);
      } else {
        let nextIdx = Math.floor(Math.random() * sweetList.length);
        if (nextIdx === sweetIndex) {
          nextIdx = (sweetIndex + 1) % sweetList.length;
        }
        setSweetIndex(nextIdx);
      }
      setIsAnimating(false);
    }, 200);
  };

  return (
    <section className="mb-16 max-w-3xl mx-auto">
      {/* Mode Switcher (Funny vs Wholesome) */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={() => setMode('funny')}
          type="button"
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            mode === 'funny'
              ? 'bg-[#E879A9] text-white shadow-md shadow-pink-200'
              : 'bg-white text-[#553047] border border-pink-200 hover:bg-pink-50'
          }`}
        >
          <Laugh className="w-3.5 h-3.5" />
          <span>Funny Teasing 😂</span>
        </button>

        <button
          onClick={() => setMode('sweet')}
          type="button"
          className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
            mode === 'sweet'
              ? 'bg-[#C94E7F] text-white shadow-md shadow-pink-200'
              : 'bg-white text-[#553047] border border-pink-200 hover:bg-pink-50'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Wholesome 🫶</span>
        </button>
      </div>

      {/* Main Compliment Sticky Note Card */}
      <div className="paper-card p-6 sm:p-10 border-2 border-[#F8C8DC] shadow-lg relative text-center">
        <div className="washi-tape washi-tape-lavender"></div>

        <span className="text-xs font-bold uppercase tracking-widest text-[#E879A9] bg-[#FCE7F3] px-3.5 py-1 rounded-full border border-pink-100">
          {mode === 'funny' ? birthdayConfig.littleThings.funnyHeading : birthdayConfig.littleThings.sweetHeading}
        </span>

        {/* Compliment Speech Quote */}
        <div className="min-h-[110px] flex items-center justify-center my-6 px-4">
          <p
            className={`font-serif-title text-xl sm:text-2xl font-bold text-[#553047] leading-relaxed transition-all duration-200 ${
              isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            "{currentMessage}"
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleNextMessage}
          type="button"
          className="px-7 py-3 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-200 hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 mx-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
          <span>{birthdayConfig.littleThings.funnyButtonText}</span>
        </button>
      </div>
    </section>
  );
};
