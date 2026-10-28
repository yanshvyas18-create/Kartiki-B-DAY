import React, { useState, useEffect } from 'react';
import { RotateCcw, Trophy, Timer, Brain, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { triggerBirthdayConfetti } from '../ConfettiEffect';

interface CardItem {
  id: number;
  symbol: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_SYMBOLS = [
  { symbol: '🎂', name: 'Cake' },
  { symbol: '🎀', name: 'Pink Bow' },
  { symbol: '🐱', name: 'White Kitten' },
  { symbol: '🐾', name: 'Cat Paw' },
  { symbol: '👑', name: 'Crown' },
  { symbol: '💖', name: 'Heart' },
];

export const MemoryMatch: React.FC = () => {
  const { title, instructions } = birthdayConfig.funZone.memoryMatch;

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const [bestMoves, setBestMoves] = useState<number | null>(() => {
    const saved = localStorage.getItem('kartiki_memory_best_moves');
    return saved ? parseInt(saved, 10) : null;
  });

  // Initialize and shuffle cards
  const initializeGame = () => {
    const paired = [...CARD_SYMBOLS, ...CARD_SYMBOLS].map((item, index) => ({
      id: index,
      symbol: item.symbol,
      name: item.name,
      isFlipped: false,
      isMatched: false,
    }));

    // Fisher-Yates shuffle
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }

    setCards(paired);
    setFlippedIndices([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
    setSeconds(0);
    setTimerActive(false);
    setGameWon(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  // Timer loop
  useEffect(() => {
    let interval: number | null = null;
    if (timerActive && !gameWon) {
      interval = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, gameWon]);

  // Handle card click
  const handleCardClick = (index: number) => {
    if (isLocked) return;
    if (cards[index].isMatched || cards[index].isFlipped) return;

    if (!timerActive) {
      setTimerActive(true);
    }

    // Flip card
    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    // If two cards flipped, check match
    if (newFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIdx, secondIdx] = newFlipped;
      if (cards[firstIdx].symbol === cards[secondIdx].symbol) {
        // Matched!
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setFlippedIndices([]);
          setMatches((m) => {
            const newMatches = m + 1;
            if (newMatches === CARD_SYMBOLS.length) {
              setGameWon(true);
              setTimerActive(false);
              triggerBirthdayConfetti(0.5);
            }
            return newMatches;
          });
          setIsLocked(false);
        }, 400);
      } else {
        // Not matched, flip back
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedIndices([]);
          setIsLocked(false);
        }, 900);
      }
    }
  };

  // Check victory and save high score
  useEffect(() => {
    if (gameWon) {
      if (!bestMoves || moves < bestMoves) {
        setBestMoves(moves);
        localStorage.setItem('kartiki_memory_best_moves', moves.toString());
      }
    }
  }, [gameWon, moves, bestMoves]);

  return (
    <div className="paper-card p-4 sm:p-8 border border-[#F8C8DC] shadow-md max-w-2xl mx-auto relative select-none">
      <div className="washi-tape washi-tape-lavender"></div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E9DDFB] text-[#553047] text-xs font-bold uppercase tracking-wider mb-2">
          <Brain className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Mini-Game 3</span>
        </div>
        <h3 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E6E83] mt-1 max-w-md mx-auto">
          {instructions}
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#FFF9F2] rounded-xl border border-pink-100 mb-6 text-xs font-bold text-[#553047]">
        <div className="flex items-center gap-1.5">
          <span>Moves:</span>
          <span className="text-base text-[#E879A9]">{moves}</span>
        </div>

        <div className="flex items-center gap-1 text-[#C94E7F]">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>{matches}/6</span>
        </div>

        <div className="flex items-center gap-1.5">
          <Timer className="w-3.5 h-3.5 text-[#8E6E83]" />
          <span>{seconds}s</span>
        </div>

        <div className="flex items-center gap-1 text-[#8E6E83]">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>Best: {bestMoves !== null ? `${bestMoves}` : '-'}</span>
        </div>
      </div>

      {/* Card Grid (4x3 = 12 cards) */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto mb-6">
        {cards.map((card, index) => {
          const isRevealed = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-2xl flex items-center justify-center cursor-pointer transition-all duration-300 transform border-2 ${
                isRevealed
                  ? card.isMatched
                    ? 'bg-green-50 border-green-300 scale-95 shadow-xs'
                    : 'bg-white border-[#E879A9] shadow-md scale-100'
                  : 'bg-gradient-to-tr from-[#F8C8DC] to-[#FCE7F3] border-white shadow-sm hover:scale-105 active:scale-95'
              }`}
            >
              {isRevealed ? (
                <span className="text-3xl sm:text-4xl animate-in zoom-in-75 duration-200">
                  {card.symbol}
                </span>
              ) : (
                <span className="text-xl sm:text-2xl opacity-70">❓</span>
              )}
            </div>
          );
        })}
      </div>

      {/* VICTORY OVERLAY / MESSAGE */}
      {gameWon && (
        <div className="p-5 rounded-2xl bg-[#FFF9F2] border-2 border-pink-200 text-center animate-in zoom-in-95 mb-6">
          <span className="text-3xl mb-1 block">🏆</span>
          <h4 className="font-serif-title text-xl sm:text-2xl font-extrabold text-[#553047]">
            Focus 100/10! You Won!
          </h4>
          <p className="text-xs sm:text-sm text-[#8E6E83] mt-1">
            Completed in <span className="font-bold text-[#E879A9]">{moves} moves</span> and <span className="font-bold text-[#E879A9]">{seconds} seconds</span>!
          </p>
          <p className="text-xs text-[#553047] font-semibold mt-2 italic">
            "Cake ke saath-saath memory bhi sharp hai madam ki! 😂"
          </p>
        </div>
      )}

      {/* Replay Control */}
      <div className="text-center">
        <button
          onClick={initializeGame}
          type="button"
          className="px-6 py-2.5 rounded-full bg-white hover:bg-pink-50 text-[#553047] font-bold text-xs border border-pink-300 shadow-xs flex items-center gap-1.5 mx-auto transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Cards</span>
        </button>
      </div>
    </div>
  );
};
