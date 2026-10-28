import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [useSynth, setUseSynth] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthIntervalRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play a soft cute music box chime note
  const playCuteNote = (freq: number, duration: number = 0.8) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft music box timbre (sine + slight triangle warmth)
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext unavailable
    }
  };

  // Cute pentatonic music box melody loop
  const startSynthMelody = () => {
    const melody = [
      523.25, // C5
      587.33, // D5
      659.25, // E5
      783.99, // G5
      880.00, // A5
      1046.50, // C6
      880.00,
      783.99,
      659.25,
      523.25,
      659.25,
      783.99,
    ];
    let noteIndex = 0;

    // Immediately play first note
    playCuteNote(melody[0], 0.9);

    synthIntervalRef.current = window.setInterval(() => {
      noteIndex = (noteIndex + 1) % melody.length;
      playCuteNote(melody[noteIndex], 0.9);
    }, 450);
  };

  const stopSynthMelody = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      // Pause
      if (audioRef.current && !useSynth) {
        audioRef.current.pause();
      }
      stopSynthMelody();
      setIsPlaying(false);
    } else {
      // Play
      if (!useSynth && audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Fallback to synth if mp3 not found or blocked
          setUseSynth(true);
          startSynthMelody();
          setIsPlaying(true);
        });
      } else {
        startSynthMelody();
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSynthMelody();
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="relative inline-flex items-center">
      <audio
        ref={audioRef}
        src={birthdayConfig.music.audioUrl}
        loop
        preload="none"
        onError={() => {
          setUseSynth(true);
        }}
      />
      <button
        onClick={toggleMusic}
        type="button"
        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm border ${
          isPlaying
            ? 'bg-[#E879A9] text-white border-[#E879A9] shadow-pink-200'
            : 'bg-white/80 hover:bg-white text-[#553047] border-[#F8C8DC] hover:border-[#E879A9]'
        }`}
        title={isPlaying ? 'Pause Music' : 'Play Birthday Music'}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
      >
        {isPlaying ? (
          <>
            <Volume2 className="w-3.5 h-3.5 animate-pulse text-white" />
            <span className="hidden sm:inline">Music ON</span>
            <span className="flex gap-0.5 items-end h-3">
              <span className="w-0.5 h-3 bg-white animate-bounce rounded-full" style={{ animationDelay: '0ms' }}></span>
              <span className="w-0.5 h-2 bg-white animate-bounce rounded-full" style={{ animationDelay: '150ms' }}></span>
              <span className="w-0.5 h-3.5 bg-white animate-bounce rounded-full" style={{ animationDelay: '300ms' }}></span>
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-3.5 h-3.5 text-[#8E6E83]" />
            <span className="hidden sm:inline text-[#553047]">Music</span>
            <Music className="w-3 h-3 text-[#E879A9] opacity-70" />
          </>
        )}
      </button>

      {isPlaying && useSynth && (
        <span className="absolute -bottom-5 right-0 text-[10px] text-[#8E6E83] whitespace-nowrap bg-white/90 px-1.5 py-0.5 rounded shadow-xs flex items-center gap-1 border border-pink-100">
          <Sparkles className="w-2.5 h-2.5 text-pink-400" /> Chime Synth Mode
        </span>
      )}
    </div>
  );
};
