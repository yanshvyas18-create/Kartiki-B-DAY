import React, { useState } from 'react';
import { Share2, Check, RotateCcw, Smile } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import type { PersonalityResult } from '../../config/birthdayConfig';
import { triggerBirthdayConfetti } from '../ConfettiEffect';

export const PersonalityGame: React.FC = () => {
  const { title, instructions, questions, results } = birthdayConfig.funZone.personality;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<PersonalityResult | null>(null);
  const [copied, setCopied] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelect = (vibe: string) => {
    const updatedAnswers = [...answers, vibe];
    setAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Calculate dominant vibe
      const counts: Record<string, number> = {};
      updatedAnswers.forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
      });

      let dominantVibe = 'drama';
      let maxCount = 0;
      Object.entries(counts).forEach(([vibeKey, count]) => {
        if (count > maxCount) {
          maxCount = count;
          dominantVibe = vibeKey;
        }
      });

      const calculatedResult = results[dominantVibe] || results['drama'];
      setResult(calculatedResult);
      triggerBirthdayConfetti(0.5);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setResult(null);
    setCopied(false);
  };

  const handleShare = async () => {
    if (!result) return;
    const shareText = `Kartiki's Official Birthday Vibe: ${result.title} (${result.badge})! "${result.quote}" Check out her Birthday Universe! 🎀`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Kartiki's Birthday Vibe Report",
          text: shareText,
          url: window.location.href,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Failed clipboard
    }
  };

  return (
    <div className="paper-card p-4 sm:p-8 border border-[#F8C8DC] shadow-md max-w-2xl mx-auto relative select-none">
      <div className="washi-tape washi-tape-peach"></div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFDCC8] text-[#553047] text-xs font-bold uppercase tracking-wider mb-2">
          <Smile className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Mini-Game 4</span>
        </div>
        <h3 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E6E83] mt-1 max-w-md mx-auto">
          {instructions}
        </p>
      </div>

      {!result ? (
        <div>
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-semibold text-[#8E6E83] mb-1.5">
              <span>Scenario {currentIndex + 1} of {questions.length}</span>
              <span>Step-by-Step Vibe Scan</span>
            </div>
            <div className="w-full bg-[#FFF9F2] h-2 rounded-full overflow-hidden border border-pink-100">
              <div
                className="bg-gradient-to-r from-[#FFDCC8] to-[#E879A9] h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F2] border border-pink-100 mb-6">
            <h4 className="font-serif-title text-base sm:text-lg font-bold text-[#553047]">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {currentQ.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(option.vibe)}
                type="button"
                className="p-4 rounded-xl bg-white hover:bg-pink-50/60 border-2 border-[#F8C8DC] hover:border-[#E879A9] text-left text-xs sm:text-sm font-semibold text-[#553047] transition-all shadow-xs hover:scale-[1.01] active:scale-[0.99]"
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* VIBE REPORT RESULT SCREEN */
        <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
          <div
            className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl shadow-lg border-4 border-white"
            style={{ backgroundColor: result.color }}
          >
            👑
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-pink-100 text-[#C94E7F]">
              {result.badge}
            </span>
            <h4 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047] mt-3">
              {result.title}
            </h4>
          </div>

          {/* Quote Badge */}
          <div className="p-4 rounded-2xl bg-[#FFF9F2] border border-pink-200 max-w-md mx-auto">
            <p className="handwritten text-xl text-[#E879A9] font-bold">
              "{result.quote}"
            </p>
          </div>

          {/* Detailed Diagnosis */}
          <p className="text-xs sm:text-sm text-[#8E6E83] leading-relaxed max-w-md mx-auto">
            {result.description}
          </p>

          {/* Share & Restart Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleShare}
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#E879A9] hover:bg-[#C94E7F] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share My Vibe Report</span>
                </>
              )}
            </button>

            <button
              onClick={handleRestart}
              type="button"
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white hover:bg-pink-50 text-[#553047] font-bold text-xs border border-pink-300 shadow-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
