import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { triggerBirthdayConfetti } from './ConfettiEffect';

export const EasterEggBadge: React.FC = () => {
  const { clickCountNeeded, triggerLabel, secretMessage } =
    birthdayConfig.littleThings.easterEgg;

  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    if (nextClicks >= clickCountNeeded) {
      setRevealed(true);
      triggerBirthdayConfetti(0.5);
      setClicks(0);
    }
  };

  return (
    <div className="text-center my-12">
      {/* Clickable Heart Seal Badge */}
      <div className="inline-block relative">
        <button
          onClick={handleClick}
          type="button"
          className="px-5 py-2.5 rounded-full bg-[#FFF9F2] hover:bg-[#FCE7F3] border-2 border-dashed border-[#E879A9] text-[#553047] text-xs font-bold transition-all transform active:scale-90 flex items-center gap-2 shadow-xs group"
          title="Psst... click me multiple times!"
        >
          <Heart className="w-4 h-4 text-[#E879A9] fill-pink-200 group-hover:scale-125 transition-transform" />
          <span>{triggerLabel}</span>
          {clicks > 0 && clicks < clickCountNeeded && (
            <span className="text-[10px] text-[#C94E7F] bg-pink-100 px-1.5 py-0.5 rounded-full font-bold">
              {clickCountNeeded - clicks} clicks left!
            </span>
          )}
        </button>
      </div>

      {/* Secret Easter Egg Modal */}
      {revealed && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#553047]/70 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-md w-full bg-[#FFF9F2] rounded-3xl p-6 sm:p-8 border-4 border-[#E879A9] shadow-2xl text-center">
            <button
              onClick={() => setRevealed(false)}
              type="button"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white hover:bg-pink-100 text-[#553047] flex items-center justify-center border border-pink-200"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-16 h-16 rounded-full bg-[#FCE7F3] flex items-center justify-center mx-auto mb-4 text-3xl shadow-xs">
              🤫
            </div>

            <h3 className="font-serif-title text-2xl font-bold text-[#553047] mb-3">
              Top Secret Bestie Easter Egg! 🕵️‍♀️💗
            </h3>

            <p className="text-sm text-[#553047] leading-relaxed mb-6 font-medium">
              {secretMessage}
            </p>

            <button
              onClick={() => setRevealed(false)}
              type="button"
              className="px-6 py-2.5 rounded-full bg-[#E879A9] text-white font-bold text-xs hover:bg-[#C94E7F] transition-all shadow-md"
            >
              Okay Okay, Secret Kept! 😂
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
