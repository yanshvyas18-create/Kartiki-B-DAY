import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, RotateCcw, ChevronRight } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { triggerBirthdayConfetti } from '../ConfettiEffect';

export const BirthdayQuiz: React.FC = () => {
  const { questions, title, instructions } = birthdayConfig.funZone.quiz;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);

    if (index === currentQ.correctOptionIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
      triggerBirthdayConfetti(0.5);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowFeedback(false);
    setQuizFinished(false);
  };

  return (
    <div className="paper-card p-6 sm:p-10 border border-[#F8C8DC] shadow-md max-w-2xl mx-auto relative">
      <div className="washi-tape washi-tape-lavender"></div>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E9DDFB] text-[#553047] text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Mini-Game 1</span>
        </div>
        <h3 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E6E83] mt-1 max-w-md mx-auto">
          {instructions}
        </p>
      </div>

      {!quizFinished ? (
        <div>
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-semibold text-[#8E6E83] mb-1.5">
              <span>Question {currentIndex + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>
            <div className="w-full bg-[#FFF9F2] h-2 rounded-full overflow-hidden border border-pink-100">
              <div
                className="bg-gradient-to-r from-[#F8C8DC] to-[#E879A9] h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF9F2] border border-pink-100 mb-6">
            <h4 className="font-serif-title text-lg sm:text-xl font-bold text-[#553047]">
              {currentQ.question}
            </h4>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctOptionIndex;

              let btnStyle = 'bg-white border-[#F8C8DC] text-[#553047] hover:border-[#E879A9] hover:bg-pink-50/50';

              if (showFeedback) {
                if (isCorrect) {
                  btnStyle = 'bg-green-100 border-green-400 text-green-800 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-pink-100 border-pink-400 text-[#553047]';
                } else {
                  btnStyle = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={showFeedback}
                  type="button"
                  className={`p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-between ${btnStyle}`}
                >
                  <span>{option}</span>
                  {showFeedback && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {showFeedback && (
            <div className="p-4 rounded-2xl bg-pink-50 border border-pink-200 animate-in fade-in flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-[#553047] font-medium italic">
                "{currentQ.feedback}"
              </p>
              <button
                onClick={handleNext}
                type="button"
                className="px-6 py-2.5 rounded-full bg-[#E879A9] text-white text-xs font-bold hover:bg-[#C94E7F] transition-all flex items-center gap-1 shadow-sm shrink-0"
              >
                <span>{currentIndex + 1 < questions.length ? 'Next Question' : 'View Result'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Result Screen */
        <div className="text-center py-6 space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFDCC8] to-[#F8C8DC] flex items-center justify-center mx-auto shadow-md border-2 border-white text-3xl">
            🏆
          </div>

          <div>
            <h4 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047]">
              Quiz Completed! 🎉
            </h4>
            <p className="text-base text-[#8E6E83] mt-1">
              Score: <span className="font-bold text-[#E879A9] text-xl">{score} / {questions.length}</span>
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFF9F2] border border-pink-200 max-w-md mx-auto">
            <p className="text-sm font-semibold text-[#553047] leading-relaxed">
              {score >= 4
                ? "Diagnosis: Kartiki is 100% self-aware and certified icon! Full marks to your royal energy 👑"
                : "Diagnosis: Thoda sa mood swings, thoda sa confusion, but overall 100% lovable! 😂💗"}
            </p>
          </div>

          <button
            onClick={handleRestart}
            type="button"
            className="px-6 py-3 rounded-full bg-white hover:bg-pink-50 text-[#553047] font-bold text-xs border border-pink-300 shadow-xs flex items-center gap-2 mx-auto transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Quiz Again</span>
          </button>
        </div>
      )}
    </div>
  );
};
