import React, { useState, useEffect } from 'react';
import { Sparkles, Cake, PartyPopper } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPastOrToday: boolean;
}

interface CountdownProps {
  onStartCakeCelebration: () => void;
  isCakeOpen: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ onStartCakeCelebration, isCakeOpen }) => {
  const calculateTimeLeft = (): TimeLeft => {
    try {
      const target = new Date(birthdayConfig.countdown.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (isNaN(target)) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPastOrToday: true };
      }

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isPastOrToday: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPastOrToday: false,
      };
    } catch {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPastOrToday: true };
    }
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [forceCelebration, setForceCelebration] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isCelebrationActive = timeLeft.isPastOrToday || forceCelebration;

  return (
    <section id="countdown-section" className="py-12 px-4 sm:px-6 max-w-4xl mx-auto text-center scroll-mt-24">
      <div className="paper-card p-6 sm:p-10 relative overflow-hidden">
        {/* Washi tape decoration */}
        <div className="washi-tape washi-tape-peach"></div>

        {!isCelebrationActive ? (
          <>
            {/* Pre-Birthday Countdown State */}
            <div className="space-y-2 mb-8">
              <span className="text-xs uppercase tracking-widest font-bold text-[#E879A9] bg-[#FCE7F3] px-3.5 py-1 rounded-full border border-[#F8C8DC]">
                Birthday Countdown
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#553047]">
                {birthdayConfig.countdown.preBirthdayNotice}
              </h2>
              <p className="text-xs sm:text-sm text-[#8E6E83]">
                Counting down every second till 1 November 2026!
              </p>
            </div>

            {/* Countdown Grid (Days, Hours, Minutes, Seconds) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8">
              {[
                { label: 'Days', value: timeLeft.days, emoji: '🌸' },
                { label: 'Hours', value: timeLeft.hours, emoji: '⏳' },
                { label: 'Minutes', value: timeLeft.minutes, emoji: '🎀' },
                { label: 'Seconds', value: timeLeft.seconds, emoji: '✨' },
              ].map((box) => (
                <div
                  key={box.label}
                  className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-[#F8C8DC] shadow-sm flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <span className="text-xs text-[#8E6E83] mb-1">{box.emoji}</span>
                  <span className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#E879A9] leading-none mb-1">
                    {String(box.value).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-semibold text-[#553047] uppercase tracking-wider">
                    {box.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Manual test celebration trigger */}
            <div className="pt-2 border-t border-pink-100 flex flex-col items-center gap-2">
              <p className="text-xs text-[#8E6E83]">
                Can't wait till 1 Nov 2026? Test blow candles right now! 👇
              </p>
              <button
                onClick={() => {
                  setForceCelebration(true);
                  onStartCakeCelebration();
                }}
                type="button"
                className="px-5 py-2.5 rounded-full bg-[#FFF9F2] hover:bg-[#FCE7F3] text-[#553047] font-semibold text-xs border border-[#F8C8DC] hover:border-[#E879A9] transition-all flex items-center gap-2 shadow-xs"
              >
                <PartyPopper className="w-3.5 h-3.5 text-[#E879A9]" />
                <span>Celebrate Now (Candle Mode) 🎂</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Birthday Day Celebration State */}
            <div className="space-y-4 py-4 animate-in fade-in duration-500">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FFDCC8] to-[#F8C8DC] text-[#553047] text-xs font-bold uppercase tracking-wider shadow-xs">
                <PartyPopper className="w-4 h-4 text-[#C94E7F]" />
                <span>Today is The Special Day!</span>
              </div>

              <h2 className="font-serif-title text-3xl sm:text-4xl font-extrabold text-[#553047]">
                {birthdayConfig.countdown.celebrationHeadline}
              </h2>

              <p className="text-sm sm:text-base text-[#8E6E83] max-w-lg mx-auto leading-relaxed">
                {birthdayConfig.countdown.celebrationSubtitle}
              </p>

              {!isCakeOpen && (
                <div className="pt-4">
                  <button
                    onClick={onStartCakeCelebration}
                    type="button"
                    className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-extrabold text-base sm:text-lg shadow-lg shadow-pink-300 hover:shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
                  >
                    <Cake className="w-5 h-5" />
                    <span>{birthdayConfig.countdown.blowCandlesButton}</span>
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
