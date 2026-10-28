import React from 'react';

// Cute mini pastel paw print
export const CatPawIcon: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-4 h-4',
  color = '#E879A9',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill={color}
    className={`${className} inline-block select-none`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main pad */}
    <ellipse cx="12" cy="15.5" rx="5" ry="4" />
    {/* Toe pads */}
    <ellipse cx="6.5" cy="9.5" rx="2" ry="2.6" transform="rotate(-18 6.5 9.5)" />
    <ellipse cx="10" cy="7.2" rx="2.1" ry="2.8" transform="rotate(-6 10 7.2)" />
    <ellipse cx="14" cy="7.2" rx="2.1" ry="2.8" transform="rotate(6 14 7.2)" />
    <ellipse cx="17.5" cy="9.5" rx="2" ry="2.6" transform="rotate(18 17.5 9.5)" />
  </svg>
);

// Peeking kitten with paws holding a card top
export const PeekingKittenSticker: React.FC<{ className?: string }> = ({
  className = 'w-16 h-12',
}) => (
  <svg
    viewBox="0 0 80 50"
    className={`${className} select-none filter drop-shadow-xs`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Ears */}
    <polygon points="18,30 24,6 36,22" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="2.5" />
    <polygon points="22,26 25,12 33,22" fill="#FCE7F3" />
    <polygon points="62,30 56,6 44,22" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="2.5" />
    <polygon points="58,26 55,12 47,22" fill="#FCE7F3" />

    {/* Head */}
    <path
      d="M16 48 C16 26, 64 26, 64 48"
      fill="#FFFFFF"
      stroke="#F8C8DC"
      strokeWidth="2.5"
    />

    {/* Eyes */}
    <ellipse cx="29" cy="35" rx="2.5" ry="3.5" fill="#553047" />
    <circle cx="30" cy="34" r="1" fill="#FFFFFF" />
    <ellipse cx="51" cy="35" rx="2.5" ry="3.5" fill="#553047" />
    <circle cx="52" cy="34" r="1" fill="#FFFFFF" />

    {/* Blush */}
    <circle cx="23" cy="39" r="3" fill="#FFDCC8" opacity="0.8" />
    <circle cx="57" cy="39" r="3" fill="#FFDCC8" opacity="0.8" />

    {/* Nose & mouth */}
    <polygon points="40,38 38,36 42,36" fill="#E879A9" />
    <path d="M37 41 Q40 43 43 41" stroke="#E879A9" strokeWidth="1.2" strokeLinecap="round" />

    {/* Whiskers */}
    <line x1="17" y1="36" x2="25" y2="37" stroke="#E879A9" strokeWidth="1" strokeLinecap="round" />
    <line x1="17" y1="40" x2="25" y2="40" stroke="#E879A9" strokeWidth="1" strokeLinecap="round" />
    <line x1="63" y1="36" x2="55" y2="37" stroke="#E879A9" strokeWidth="1" strokeLinecap="round" />
    <line x1="63" y1="40" x2="55" y2="40" stroke="#E879A9" strokeWidth="1" strokeLinecap="round" />

    {/* Cute little paws gripping edge */}
    <ellipse cx="25" cy="48" rx="5" ry="4" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="2" />
    <ellipse cx="55" cy="48" rx="5" ry="4" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="2" />
  </svg>
);

// Cute sleeping kitten sticker
export const SleepingKittenSticker: React.FC<{ className?: string }> = ({
  className = 'w-14 h-10',
}) => (
  <svg
    viewBox="0 0 60 40"
    className={`${className} select-none filter drop-shadow-xs`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Curled Body */}
    <ellipse cx="32" cy="24" rx="22" ry="14" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="2" />
    {/* Tail */}
    <path
      d="M10 26 C8 16, 16 12, 18 16"
      stroke="#F8C8DC"
      strokeWidth="3.5"
      strokeLinecap="round"
      fill="none"
    />
    {/* Head */}
    <circle cx="42" cy="18" r="11" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="2" />
    {/* Ears */}
    <polygon points="36,10 40,4 43,10" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="1.5" />
    <polygon points="38,9 40,6 42,9" fill="#FCE7F3" />
    <polygon points="45,9 49,4 51,10" fill="#FFFFFF" stroke="#F8C8DC" strokeWidth="1.5" />
    <polygon points="46,9 49,6 50,9" fill="#FCE7F3" />

    {/* Sleeping Eyes (curved lines) */}
    <path d="M38 18 Q40 20 42 18" stroke="#553047" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M45 18 Q47 20 49 18" stroke="#553047" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Cute nose */}
    <circle cx="44" cy="21" r="1" fill="#E879A9" />
    {/* Zzz sparkles */}
    <text x="49" y="8" font-family="'Caveat', cursive" font-size="9" fill="#E879A9" font-weight="bold">z</text>
    <text x="54" y="5" font-family="'Caveat', cursive" font-size="7" fill="#E879A9" font-weight="bold">z</text>
  </svg>
);

// Cute Kitten with Bow badge
export const KittenBadgeSticker: React.FC<{ className?: string; text?: string }> = ({
  className = 'w-auto h-auto',
  text = 'Cat Mom 🐾',
}) => (
  <span
    className={`${className} inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9F2] border border-[#F8C8DC] text-[#553047] text-[11px] font-bold shadow-xs select-none`}
  >
    <span className="text-sm">🐱</span>
    <span>{text}</span>
    <CatPawIcon className="w-3 h-3 text-[#E879A9]" />
  </span>
);

// Trail of subtle paw prints
export const PawTrail: React.FC<{ className?: string }> = ({
  className = 'flex gap-3 items-center',
}) => (
  <div className={`${className} pointer-events-none select-none opacity-40`}>
    <CatPawIcon className="w-3.5 h-3.5 text-[#F8C8DC] transform -rotate-12" />
    <CatPawIcon className="w-3 h-3 text-[#FFDCC8] transform rotate-15" />
    <CatPawIcon className="w-3.5 h-3.5 text-[#E9DDFB] transform -rotate-6" />
    <CatPawIcon className="w-3 h-3 text-[#F8C8DC] transform rotate-20" />
  </div>
);
