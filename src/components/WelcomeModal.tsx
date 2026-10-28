import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { triggerBirthdayConfetti } from './ConfettiEffect';

interface WelcomeModalProps {
  onOpen: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    // Check if user has already opened the welcome envelope in this session
    const seen = sessionStorage.getItem('kartiki_welcome_seen');
    if (!seen) {
      setIsOpen(true);
    }
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpening(true);
    triggerBirthdayConfetti(0.5);

    setTimeout(() => {
      sessionStorage.setItem('kartiki_welcome_seen', 'true');
      setIsOpen(false);
      onOpen();
    }, 1200);
  };

  const handleSkip = () => {
    sessionStorage.setItem('kartiki_welcome_seen', 'true');
    setIsOpen(false);
    onOpen();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#553047]/60 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className={`relative w-full max-w-lg bg-[#FFF9F2] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#F8C8DC] text-center transition-all duration-700 ${
          isOpening ? 'scale-95 opacity-0 -translate-y-6' : 'scale-100 opacity-100'
        }`}
      >
        {/* Washi tape decoration */}
        <div className="washi-tape washi-tape-peach"></div>

        {/* Envelope Icon with glowing badge */}
        <div className="relative mx-auto w-20 h-20 mb-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#F8C8DC] to-[#FCE7F3] border-2 border-[#E879A9]/40 flex items-center justify-center shadow-md animate-float">
            <Mail className="w-10 h-10 text-[#E879A9]" />
          </div>
          <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#E879A9] text-white flex items-center justify-center text-xs font-bold shadow-xs">
            1
          </span>
        </div>

        {/* Heading & Subtitle */}
        <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#553047] mb-3 flex items-center justify-center gap-2">
          {birthdayConfig.welcomeScreen.title}
        </h2>
        <p className="text-sm sm:text-base text-[#8E6E83] mb-6 leading-relaxed max-w-md mx-auto">
          {birthdayConfig.welcomeScreen.subtitle}
        </p>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-[1px] w-12 bg-[#F8C8DC]"></div>
          <Heart className="w-4 h-4 text-[#E879A9] fill-[#E879A9]" />
          <div className="h-[1px] w-12 bg-[#F8C8DC]"></div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleOpenEnvelope}
          disabled={isOpening}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-base shadow-lg shadow-pink-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <Sparkles className="w-5 h-5" />
          <span>{isOpening ? 'Surprise Unfolding... 🎀' : birthdayConfig.welcomeScreen.buttonText}</span>
        </button>

        {/* Skip button for safety */}
        <button
          onClick={handleSkip}
          type="button"
          className="mt-4 text-xs text-[#8E6E83] hover:text-[#553047] underline underline-offset-4 transition-colors block mx-auto"
        >
          {birthdayConfig.welcomeScreen.skipText}
        </button>
      </div>
    </div>
  );
};
