import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Cake, Brain, Sparkles, ArrowRight, Gamepad2 } from 'lucide-react';
import { birthdayConfig } from '../config/birthdayConfig';
import { BirthdayQuiz } from '../components/games/BirthdayQuiz';
import { CatchTheCake } from '../components/games/CatchTheCake';
import { MemoryMatch } from '../components/games/MemoryMatch';
import { PersonalityGame } from '../components/games/PersonalityGame';

type GameTab = 'quiz' | 'catchCake' | 'memory' | 'personality';

export const FunZone: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GameTab>('quiz');

  const tabs = [
    { id: 'quiz' as GameTab, label: 'Birthday Quiz', emoji: '🧠', icon: HelpCircle },
    { id: 'catchCake' as GameTab, label: 'Catch The Cake', emoji: '🎂', icon: Cake },
    { id: 'memory' as GameTab, label: 'Memory Match', emoji: '🎴', icon: Brain },
    { id: 'personality' as GameTab, label: 'Vibe Report', emoji: '👑', icon: Sparkles },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Fun Zone Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#E9DDFB] border border-purple-200 text-[#553047] text-xs font-bold uppercase tracking-wider mb-3">
          <Gamepad2 className="w-3.5 h-3.5 text-[#E879A9]" />
          <span>Arcade & Mini-Games</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-5xl font-extrabold text-[#553047] leading-tight">
          {birthdayConfig.funZone.heading}
        </h1>
        <p className="text-sm sm:text-base text-[#8E6E83] mt-3 leading-relaxed">
          {birthdayConfig.funZone.subtitle}
        </p>
      </div>

      {/* 4-Tab Switcher Pill Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 shadow-xs ${
                isActive
                  ? 'bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white shadow-md shadow-pink-200 scale-105'
                  : 'bg-white hover:bg-[#FFF9F2] text-[#553047] border border-[#F8C8DC] hover:border-[#E879A9]'
              }`}
            >
              <span className="text-base">{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Game Render (Conditional on single route /fun-zone) */}
      <div className="transition-all duration-300">
        {activeTab === 'quiz' && <BirthdayQuiz />}
        {activeTab === 'catchCake' && <CatchTheCake />}
        {activeTab === 'memory' && <MemoryMatch />}
        {activeTab === 'personality' && <PersonalityGame />}
      </div>

      {/* Bottom CTA to Page 4 */}
      <div className="mt-16 text-center">
        <Link
          to="/little-things"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E879A9] to-[#C94E7F] text-white font-bold text-sm sm:text-base shadow-lg shadow-pink-200 hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
        >
          <Sparkles className="w-5 h-5" />
          <span>Next: Little Things & Secret Notes 💌</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
