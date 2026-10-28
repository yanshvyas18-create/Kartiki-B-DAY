import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Cake, Play, Pause, RotateCcw, Trophy, ArrowLeft, ArrowRight } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { triggerBirthdayConfetti } from '../ConfettiEffect';

interface FallingItem {
  id: number;
  x: number; // percentage (0 - 90)
  y: number; // percentage (0 - 100)
  speed: number;
  type: 'cake' | 'cupcake' | 'heart';
  points: number;
  emoji: string;
}

export const CatchTheCake: React.FC = () => {
  const { title, instructions, durationSeconds, scoreThresholds, messages } =
    birthdayConfig.funZone.catchCake;

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'over'>('idle');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(durationSeconds);
  const [playerPosition, setPlayerPosition] = useState(50); // percentage 0 - 100
  const [highScore, setHighScore] = useState<number>(() => {
    return parseInt(localStorage.getItem('kartiki_catch_cake_highscore') || '0', 10);
  });

  const itemsRef = useRef<FallingItem[]>([]);
  const [renderItems, setRenderItems] = useState<FallingItem[]>([]);
  const requestRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const nextItemId = useRef(1);

  // Key pressed state
  const keysPressed = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  // Move player
  const movePlayer = useCallback((direction: 'left' | 'right') => {
    setPlayerPosition((prev) => {
      const step = 8;
      if (direction === 'left') return Math.max(5, prev - step);
      if (direction === 'right') return Math.min(95, prev + step);
      return prev;
    });
  }, []);

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressed.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressed.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState]);

  // Main game loop
  const updateGame = useCallback(() => {
    if (gameState !== 'playing') return;

    // Smooth keyboard movement update
    if (keysPressed.current.left) {
      setPlayerPosition((prev) => Math.max(6, prev - 1.8));
    }
    if (keysPressed.current.right) {
      setPlayerPosition((prev) => Math.min(94, prev + 1.8));
    }

    // Spawn new items randomly
    if (Math.random() < 0.045 && itemsRef.current.length < 8) {
      const types: ('cake' | 'cupcake' | 'heart')[] = ['cake', 'cupcake', 'heart'];
      const chosenType = types[Math.floor(Math.random() * types.length)];
      const points = chosenType === 'cake' ? 3 : chosenType === 'cupcake' ? 2 : 1;
      const emoji = chosenType === 'cake' ? '🎂' : chosenType === 'cupcake' ? '🧁' : '💖';

      itemsRef.current.push({
        id: nextItemId.current++,
        x: Math.random() * 85 + 5,
        y: 0,
        speed: Math.random() * 0.7 + 0.6,
        type: chosenType,
        points,
        emoji,
      });
    }

    // Move falling items and check collisions
    const remainingItems: FallingItem[] = [];

    itemsRef.current.forEach((item) => {
      const newY = item.y + item.speed;

      // Check collision with player basket at bottom (y >= 82 and y <= 95)
      if (newY >= 82 && newY <= 94) {
        const itemX = item.x;
        const playerX = playerPosition;
        const distance = Math.abs(itemX - playerX);

        if (distance < 12) {
          // Caught!
          setScore((s) => s + item.points);
          return; // Item caught and removed
        }
      }

      // If item hasn't fallen off screen
      if (newY < 100) {
        remainingItems.push({ ...item, y: newY });
      }
    });

    itemsRef.current = remainingItems;
    setRenderItems([...remainingItems]);

    requestRef.current = requestAnimationFrame(updateGame);
  }, [gameState, playerPosition]);

  useEffect(() => {
    if (gameState === 'playing') {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [gameState, updateGame]);

  // Countdown timer
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setGameState('over');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Handle Game Over & High Score
  useEffect(() => {
    if (gameState === 'over') {
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem('kartiki_catch_cake_highscore', score.toString());
      }
      if (score >= scoreThresholds.medium) {
        triggerBirthdayConfetti(0.5);
      }
    }
  }, [gameState, score, highScore, scoreThresholds.medium]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startGame = () => {
    setScore(0);
    setTimeLeft(durationSeconds);
    itemsRef.current = [];
    setRenderItems([]);
    setPlayerPosition(50);
    setGameState('playing');
  };

  const getResultMessage = () => {
    if (score < scoreThresholds.low) return messages.low;
    if (score < scoreThresholds.medium) return messages.medium;
    return messages.high;
  };

  return (
    <div className="paper-card p-4 sm:p-8 border border-[#F8C8DC] shadow-md max-w-2xl mx-auto relative select-none">
      <div className="washi-tape washi-tape-peach"></div>

      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFDCC8] text-[#553047] text-xs font-bold uppercase tracking-wider mb-2">
          <Cake className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Mini-Game 2</span>
        </div>
        <h3 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E6E83] mt-1 max-w-md mx-auto">
          {instructions}
        </p>
      </div>

      {/* Stats Bar (Score, Time Left, High Score) */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#FFF9F2] rounded-xl border border-pink-100 mb-4 text-xs font-bold text-[#553047]">
        <div className="flex items-center gap-1.5">
          <span>Score:</span>
          <span className="text-base text-[#E879A9]">{score}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span>Time:</span>
          <span className={`text-base ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-[#553047]'}`}>
            {timeLeft}s
          </span>
        </div>

        <div className="flex items-center gap-1 text-[#8E6E83]">
          <Trophy className="w-3.5 h-3.5 text-amber-500" />
          <span>High: {highScore}</span>
        </div>
      </div>

      {/* Arcade Canvas Area */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-gradient-to-b from-[#FFF9F2] to-[#FCE7F3]/60 rounded-2xl border-2 border-[#F8C8DC] overflow-hidden shadow-inner">
        {/* Falling Items */}
        {renderItems.map((item) => (
          <div
            key={item.id}
            className="absolute text-2xl sm:text-3xl -translate-x-1/2 drop-shadow-xs pointer-events-none transition-transform"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
          >
            {item.emoji}
          </div>
        ))}

        {/* Player Basket */}
        <div
          className="absolute bottom-2 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-75"
          style={{ left: `${playerPosition}%` }}
        >
          <span className="text-xs font-bold text-[#553047] bg-white/90 px-2 py-0.5 rounded-full shadow-xs mb-1 border border-pink-200">
            Kartiki
          </span>
          <div className="w-14 h-8 bg-gradient-to-t from-[#E879A9] to-[#FF9EAA] rounded-b-2xl border-2 border-white shadow-md flex items-center justify-center text-lg">
            🧺
          </div>
        </div>

        {/* IDLE SCREEN */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-[#553047]/40 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white">
            <span className="text-4xl mb-3 animate-bounce">🎂</span>
            <h4 className="font-serif-title text-xl sm:text-2xl font-bold mb-2">
              Ready to catch some birthday cake?
            </h4>
            <p className="text-xs sm:text-sm text-pink-100 max-w-xs mb-5">
              Cakes = +3 pts | Cupcakes = +2 pts | Hearts = +1 pt
            </p>
            <button
              onClick={startGame}
              type="button"
              className="px-7 py-3 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start 30s Mission</span>
            </button>
          </div>
        )}

        {/* GAME OVER SCREEN */}
        {gameState === 'over' && (
          <div className="absolute inset-0 bg-[#553047]/65 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center text-white animate-in zoom-in-95">
            <span className="text-4xl mb-2">🎉</span>
            <h4 className="font-serif-title text-2xl font-extrabold mb-1">
              Mission Completed!
            </h4>
            <p className="text-2xl font-black text-[#FFD166] mb-2">
              {score} Points
            </p>
            <p className="text-xs sm:text-sm text-pink-100 max-w-xs mb-6 italic">
              "{getResultMessage()}"
            </p>
            <button
              onClick={startGame}
              type="button"
              className="px-6 py-2.5 rounded-full bg-[#E879A9] text-white font-bold text-xs hover:bg-[#C94E7F] shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Play Again</span>
            </button>
          </div>
        )}
      </div>

      {/* MOBILE TOUCH CONTROLS (Left / Right buttons) */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => movePlayer('left')}
          type="button"
          disabled={gameState !== 'playing'}
          className="flex-1 py-3.5 rounded-2xl bg-white hover:bg-[#FFF9F2] active:bg-[#FCE7F3] border-2 border-[#F8C8DC] text-[#553047] font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
          aria-label="Move left"
        >
          <ArrowLeft className="w-5 h-5 text-[#E879A9]" />
          <span>Move Left</span>
        </button>

        {gameState === 'playing' && (
          <button
            onClick={() => setGameState('paused')}
            type="button"
            className="p-3.5 rounded-2xl bg-white border border-[#F8C8DC] text-[#8E6E83] shadow-xs"
            title="Pause"
          >
            <Pause className="w-5 h-5" />
          </button>
        )}

        {gameState === 'paused' && (
          <button
            onClick={() => setGameState('playing')}
            type="button"
            className="p-3.5 rounded-2xl bg-green-500 text-white font-bold text-xs shadow-xs"
          >
            Resume
          </button>
        )}

        <button
          onClick={() => movePlayer('right')}
          type="button"
          disabled={gameState !== 'playing'}
          className="flex-1 py-3.5 rounded-2xl bg-white hover:bg-[#FFF9F2] active:bg-[#FCE7F3] border-2 border-[#F8C8DC] text-[#553047] font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50"
          aria-label="Move right"
        >
          <span>Move Right</span>
          <ArrowRight className="w-5 h-5 text-[#E879A9]" />
        </button>
      </div>

      <p className="text-[11px] text-[#8E6E83] text-center mt-3">
        ⌨️ Desktop: Use Left/Right Arrow keys or A/D keys
      </p>
    </div>
  );
};
