import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Wind, Sparkles, RefreshCw, Heart, CheckCircle2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { triggerBirthdayConfetti, triggerStarConfetti } from './ConfettiEffect';

export const BirthdayCake: React.FC = () => {
  const candleCount = birthdayConfig.cakeGame.candleCount || 5;

  // Candle state: array of booleans indicating if each candle is lit
  const [candlesLit, setCandlesLit] = useState<boolean[]>(() =>
    Array(candleCount).fill(true)
  );

  // User's secret wish (client-only)
  const [userWish, setUserWish] = useState('');
  const [wishLocked, setWishLocked] = useState(false);

  // Microphone detection state
  const [isMicListening, setIsMicListening] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  // Final celebration revealed state
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  // Refs for Web Audio API
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const litCount = candlesLit.filter(Boolean).length;
  const allExtinguished = litCount === 0;

  // Handle extinguishing a single candle (progressive or click)
  const extinguishCandle = (index?: number) => {
    setCandlesLit((prev) => {
      const next = [...prev];
      if (typeof index === 'number') {
        next[index] = false;
      } else {
        // Find first lit candle and extinguish
        const firstLitIndex = next.findIndex((lit) => lit);
        if (firstLitIndex !== -1) {
          next[firstLitIndex] = false;
        }
      }
      return next;
    });
  };

  // Stop microphone and clean up audio context
  const stopMicrophone = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setIsMicListening(false);
    setMicVolume(0);
  };

  // Start microphone analysis for blowing sound
  const startMicrophone = async () => {
    setMicError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setMicError('Microphone is not supported in this browser. Please use the Tap to Blow button!');
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false,
        },
      });

      mediaStreamRef.current = stream;
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.3;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsMicListening(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let blowStreak = 0;

      const detectBlow = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average energy in sound
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalized = Math.min(100, Math.round((average / 128) * 100));
        setMicVolume(normalized);

        // Blow detection threshold: sustained energy (e.g. blowing sound)
        if (normalized > 30) {
          blowStreak += 1;
          if (blowStreak >= 6) {
            extinguishCandle();
            blowStreak = 0;
          }
        } else {
          blowStreak = Math.max(0, blowStreak - 1);
        }

        animationFrameRef.current = requestAnimationFrame(detectBlow);
      };

      detectBlow();
    } catch (err: unknown) {
      console.warn('Mic access error:', err);
      setMicError(birthdayConfig.cakeGame.micPermissionError);
      setIsMicListening(false);
    }
  };

  // When all candles are extinguished, trigger celebratory confetti
  useEffect(() => {
    if (allExtinguished) {
      stopMicrophone();
      triggerBirthdayConfetti(0.5);
      triggerStarConfetti();
    }
  }, [allExtinguished]);

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  // Relight all candles
  const handleReset = () => {
    stopMicrophone();
    setCandlesLit(Array(candleCount).fill(true));
    setShowFinalMessage(false);
    setUserWish('');
    setWishLocked(false);
  };

  return (
    <div className="mt-8 paper-card p-6 sm:p-10 border-2 border-[#F8C8DC] shadow-xl relative text-center">
      <div className="washi-tape washi-tape-lavender"></div>

      {/* Title */}
      <div className="max-w-xl mx-auto mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#E879A9] bg-[#FCE7F3] px-3 py-1 rounded-full border border-pink-200">
          Interactive Candle Game 🕯️
        </span>
        <h3 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047] mt-2">
          {birthdayConfig.cakeGame.wishPrompt}
        </h3>
        <p className="text-xs sm:text-sm text-[#8E6E83] mt-1">
          Candles bachi hain: <span className="font-bold text-[#E879A9]">{litCount} / {candleCount}</span>
        </p>
      </div>

      {/* Secret Birthday Wish Input (Client-Side Only) */}
      {!allExtinguished && !wishLocked && (
        <div className="max-w-md mx-auto mb-8 bg-[#FFF9F2] p-4 rounded-2xl border border-pink-100 shadow-xs">
          <label htmlFor="wish-input" className="block text-xs font-semibold text-[#553047] mb-2 text-left flex items-center justify-between">
            <span>✨ Secret Birthday Wish (Optional):</span>
            <span className="text-[10px] text-[#8E6E83]">Sirf tere browser mein rahega</span>
          </label>
          <div className="flex gap-2">
            <input
              id="wish-input"
              type="text"
              value={userWish}
              onChange={(e) => setUserWish(e.target.value)}
              placeholder={birthdayConfig.cakeGame.wishPlaceholder}
              className="flex-1 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-[#F8C8DC] bg-white focus:outline-none focus:ring-2 focus:ring-[#E879A9] text-[#553047]"
            />
            <button
              onClick={() => setWishLocked(true)}
              type="button"
              className="px-4 py-2 rounded-xl bg-[#E879A9] text-white text-xs font-bold hover:bg-[#C94E7F] transition-all shadow-xs"
            >
              Lock Wish 🔒
            </button>
          </div>
        </div>
      )}

      {wishLocked && userWish && !allExtinguished && (
        <div className="max-w-md mx-auto mb-6 py-2 px-4 rounded-xl bg-pink-50 border border-pink-200 text-xs text-[#553047] flex items-center justify-between">
          <span className="italic">"Wish locked in the universe! ✨"</span>
          <span className="text-[10px] text-[#E879A9] font-bold">Now blow the candles! 💨</span>
        </div>
      )}

      {/* SVG CAKE DISPLAY */}
      <div className="relative max-w-sm sm:max-w-md mx-auto my-6 select-none">
        <svg
          viewBox="0 0 400 320"
          className="w-full h-auto drop-shadow-md overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cake Stand Bottom */}
          <ellipse cx="200" cy="300" rx="140" ry="12" fill="#E9DDFB" />
          <path d="M185 285 L215 285 L208 300 L192 300 Z" fill="#D8C7F0" />
          <ellipse cx="200" cy="285" rx="150" ry="14" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="3" />

          {/* Bottom Cake Layer (Cream & Peach) */}
          <path d="M70 210 Q200 230 330 210 L330 270 Q200 290 70 270 Z" fill="#FFF9F2" stroke="#FFDCC8" strokeWidth="2" />
          {/* Frosting Drips on Bottom Layer */}
          <path
            d="M70 210 Q85 230 100 218 Q115 232 135 220 Q155 235 180 220 Q200 235 225 218 Q250 235 275 220 Q305 235 330 210 L330 205 Q200 225 70 205 Z"
            fill="#F8C8DC"
          />

          {/* Top Cake Layer (Pink & Strawberry Frosting) */}
          <path d="M100 150 Q200 170 300 150 L300 210 Q200 230 100 210 Z" fill="#FCE7F3" stroke="#F8C8DC" strokeWidth="2" />
          <ellipse cx="200" cy="150" rx="100" ry="20" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="2" />

          {/* Frosting Swirls & Sprinkles on Top Layer */}
          <circle cx="130" cy="150" r="3" fill="#E879A9" />
          <circle cx="160" cy="155" r="2.5" fill="#FFB703" />
          <circle cx="190" cy="148" r="3" fill="#C084FC" />
          <circle cx="230" cy="153" r="2.5" fill="#E879A9" />
          <circle cx="260" cy="149" r="3" fill="#FFB703" />
          <circle cx="145" cy="175" r="2" fill="#E879A9" />
          <circle cx="210" cy="180" r="2.5" fill="#FFB703" />
          <circle cx="255" cy="175" r="2" fill="#C084FC" />

          {/* Decorative Strawberries / Cherries on Top */}
          <circle cx="115" cy="145" r="8" fill="#E879A9" />
          <circle cx="155" cy="142" r="8" fill="#E879A9" />
          <circle cx="200" cy="140" r="8" fill="#E879A9" />
          <circle cx="245" cy="142" r="8" fill="#E879A9" />
          <circle cx="285" cy="145" r="8" fill="#E879A9" />

          {/* CANDLES */}
          {[
            { id: 0, x: 130, y: 110, color: '#E9DDFB' },
            { id: 1, x: 165, y: 104, color: '#FFDCC8' },
            { id: 2, x: 200, y: 100, color: '#F8C8DC' },
            { id: 3, x: 235, y: 104, color: '#E9DDFB' },
            { id: 4, x: 270, y: 110, color: '#FFDCC8' },
          ].map((candle) => {
            const isLit = candlesLit[candle.id];

            return (
              <g
                key={candle.id}
                onClick={() => extinguishCandle(candle.id)}
                className="cursor-pointer transition-transform hover:scale-110"
              >
                {/* Candle Stick */}
                <rect
                  x={candle.x - 4}
                  y={candle.y}
                  width="8"
                  height="34"
                  rx="3"
                  fill={candle.color}
                  stroke="#553047"
                  strokeWidth="0.8"
                />
                {/* Spiral stripe */}
                <line
                  x1={candle.x - 3}
                  y1={candle.y + 8}
                  x2={candle.x + 3}
                  y2={candle.y + 14}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <line
                  x1={candle.x - 3}
                  y1={candle.y + 20}
                  x2={candle.x + 3}
                  y2={candle.y + 26}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

                {/* Wick */}
                <line
                  x1={candle.x}
                  y1={candle.y}
                  x2={candle.x}
                  y2={candle.y - 7}
                  stroke="#553047"
                  strokeWidth="1.5"
                />

                {/* FLAME (When Lit) */}
                {isLit ? (
                  <g className="animate-flame" style={{ transformOrigin: `${candle.x}px ${candle.y - 7}px` }}>
                    {/* Flame Outer Glow */}
                    <circle cx={candle.x} cy={candle.y - 14} r="12" fill="#FFB703" opacity="0.25" />
                    {/* Flame Teardrop */}
                    <path
                      d={`M${candle.x} ${candle.y - 24} C${candle.x - 6} ${candle.y - 16} ${candle.x - 5} ${candle.y - 7} ${candle.x} ${candle.y - 7} C${candle.x + 5} ${candle.y - 7} ${candle.x + 6} ${candle.y - 16} ${candle.x} ${candle.y - 24} Z`}
                      fill="#FF9EAA"
                    />
                    <path
                      d={`M${candle.x} ${candle.y - 21} C${candle.x - 3.5} ${candle.y - 15} ${candle.x - 3} ${candle.y - 7} ${candle.x} ${candle.y - 7} C${candle.x + 3} ${candle.y - 7} ${candle.x + 3.5} ${candle.y - 15} ${candle.x} ${candle.y - 21} Z`}
                      fill="#FFD166"
                    />
                    <ellipse cx={candle.x} cy={candle.y - 10} rx="2" ry="3" fill="#FFFFFF" />
                  </g>
                ) : (
                  /* Smoke Puff when extinguished */
                  <g className="animate-smoke" style={{ transformOrigin: `${candle.x}px ${candle.y - 8}px` }}>
                    <path
                      d={`M${candle.x} ${candle.y - 10} Q${candle.x - 5} ${candle.y - 18} ${candle.x + 2} ${candle.y - 26} Q${candle.x + 8} ${candle.y - 34} ${candle.x} ${candle.y - 42}`}
                      stroke="#8E6E83"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="2 2"
                      opacity="0.6"
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        <p className="text-[11px] text-[#8E6E83] mt-2 italic">
          💡 Tip: Click/tap any individual candle flame directly to blow it out!
        </p>
      </div>

      {/* CONTROLS (Blow Mic & Tap Blow) */}
      {!allExtinguished ? (
        <div className="space-y-4 max-w-md mx-auto">
          {/* Method A: Microphone Blow */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {!isMicListening ? (
              <button
                onClick={startMicrophone}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-[#FFF9F2] text-[#553047] font-bold text-xs sm:text-sm border-2 border-[#F8C8DC] hover:border-[#E879A9] shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Mic className="w-4 h-4 text-[#E879A9]" />
                <span>{birthdayConfig.cakeGame.micButtonText}</span>
              </button>
            ) : (
              <button
                onClick={stopMicrophone}
                type="button"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs sm:text-sm border border-red-200 shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <MicOff className="w-4 h-4" />
                <span>Stop Listening 🛑</span>
              </button>
            )}

            {/* Method B: Tap to Blow Button (Always Works!) */}
            <button
              onClick={() => extinguishCandle()}
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-200 hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Wind className="w-4 h-4" />
              <span>{birthdayConfig.cakeGame.tapButtonText}</span>
            </button>
          </div>

          {/* Mic Active Live Indicator */}
          {isMicListening && (
            <div className="p-3 bg-pink-50/80 rounded-2xl border border-pink-200 animate-in fade-in">
              <p className="text-xs font-semibold text-[#553047] mb-1.5 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E879A9] animate-spin" />
                <span>{birthdayConfig.cakeGame.micActiveNotice}</span>
              </p>
              {/* Sound level meter */}
              <div className="w-full bg-white h-2.5 rounded-full overflow-hidden border border-pink-200">
                <div
                  className="bg-gradient-to-r from-[#FFDCC8] via-[#F8C8DC] to-[#E879A9] h-full transition-all duration-75"
                  style={{ width: `${micVolume}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Mic error / fallback message */}
          {micError && (
            <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
              {micError}
            </p>
          )}
        </div>
      ) : (
        /* CANDLES EXTINGUISHED CELEBRATION */
        <div className="space-y-6 max-w-xl mx-auto py-4 animate-in zoom-in-95 duration-500">
          <div className="inline-flex p-3 rounded-full bg-green-100 text-green-600 mb-1">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="font-serif-title text-3xl font-extrabold text-[#553047] mb-2">
              {birthdayConfig.cakeGame.extinguishedTitle}
            </h3>
            <p className="text-base text-[#8E6E83] leading-relaxed">
              {birthdayConfig.cakeGame.extinguishedSubtitle}
            </p>
          </div>

          {!showFinalMessage ? (
            <div className="pt-2">
              <button
                onClick={() => {
                  setShowFinalMessage(true);
                  triggerBirthdayConfetti(0.4);
                }}
                type="button"
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-extrabold text-base shadow-lg shadow-pink-300 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 mx-auto"
              >
                <span>{birthdayConfig.cakeGame.celebrateButtonText}</span>
                <Heart className="w-4 h-4 fill-white" />
              </button>
            </div>
          ) : (
            /* REVEALED FINAL CAKE MESSAGE */
            <div className="mt-4 p-6 sm:p-8 bg-[#FFF9F2] rounded-3xl border-2 border-[#F8C8DC] text-left shadow-lg relative animate-in fade-in duration-500">
              <div className="washi-tape washi-tape-peach"></div>

              <div className="flex items-center gap-2 mb-4 text-[#E879A9]">
                <Heart className="w-5 h-5 fill-[#E879A9]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Official Birthday Message
                </span>
              </div>

              <div className="text-sm sm:text-base text-[#553047] leading-relaxed whitespace-pre-line font-medium mb-6">
                {birthdayConfig.cakeGame.finalCakeMessage}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-pink-200">
                <span className="handwritten text-2xl text-[#E879A9] font-bold">
                  Forever Bestie 🎀
                </span>

                <button
                  onClick={handleReset}
                  type="button"
                  className="px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-[#553047] text-xs font-bold border border-pink-200 flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Relight Candles 🕯️</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
