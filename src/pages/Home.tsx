import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { WelcomeModal } from '../components/WelcomeModal';
import { BirthdayHero } from '../components/BirthdayHero';
import { Countdown } from '../components/Countdown';
import { BirthdayCake } from '../components/BirthdayCake';

export const Home: React.FC = () => {
  const [showCake, setShowCake] = useState(false);
  const cakeSectionRef = useRef<HTMLDivElement | null>(null);

  const handleStartCakeCelebration = () => {
    setShowCake(true);
    setTimeout(() => {
      cakeSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleExploreClick = () => {
    document.getElementById('countdown-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen">
      {/* Welcome Screen Envelope Modal */}
      <WelcomeModal onOpen={() => {}} />

      {/* Hero Section */}
      <BirthdayHero onExploreClick={handleExploreClick} />

      {/* Countdown Section */}
      <Countdown
        onStartCakeCelebration={handleStartCakeCelebration}
        isCakeOpen={showCake}
      />

      {/* Interactive Birthday Cake Section */}
      {showCake && (
        <div ref={cakeSectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 scroll-mt-24">
          <BirthdayCake />
        </div>
      )}

      {/* Page Navigation Teasers Grid (Explore the other 5 pages) */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E879A9] bg-[#FCE7F3] px-3.5 py-1 rounded-full border border-pink-200">
            More Surprises Await
          </span>
          <h2 className="font-serif-title text-2xl sm:text-3xl font-extrabold text-[#553047] mt-2">
            Continue Kartiki's Birthday Journey ✨
          </h2>
          <p className="text-xs sm:text-sm text-[#8E6E83] mt-1">
            Ek page pe maza khatam thodi hota hai! Check out what else is waiting:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Teaser 1: Memories */}
          <Link
            to="/memories"
            className="group paper-card p-6 border border-[#F8C8DC] hover:border-[#E879A9] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FCE7F3] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                📸
              </div>
              <h3 className="font-serif-title text-lg font-bold text-[#553047] group-hover:text-[#E879A9] transition-colors">
                Photo Gallery & Memories
              </h3>
              <p className="text-xs text-[#8E6E83] mt-2 leading-relaxed">
                Polaroids, hilarious candid shots aur friendship memory timeline.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center text-xs font-bold text-[#E879A9]">
              <span>See Photos →</span>
            </div>
          </Link>

          {/* Teaser 2: Fun Zone */}
          <Link
            to="/fun-zone"
            className="group paper-card p-6 border border-[#F8C8DC] hover:border-[#E879A9] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E9DDFB] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                🎮
              </div>
              <h3 className="font-serif-title text-lg font-bold text-[#553047] group-hover:text-[#E879A9] transition-colors">
                The Fun Zone (4 Games!)
              </h3>
              <p className="text-xs text-[#8E6E83] mt-2 leading-relaxed">
                Catch the Cake arcade, Quiz, Memory Match cards, aur Vibe diagnosis.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center text-xs font-bold text-[#E879A9]">
              <span>Play Games →</span>
            </div>
          </Link>

          {/* Teaser 3: Little Things */}
          <Link
            to="/little-things"
            className="group paper-card p-6 border border-[#F8C8DC] hover:border-[#E879A9] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FFDCC8] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                💌
              </div>
              <h3 className="font-serif-title text-lg font-bold text-[#553047] group-hover:text-[#E879A9] transition-colors">
                Little Things & Secret Notes
              </h3>
              <p className="text-xs text-[#8E6E83] mt-2 leading-relaxed">
                Funny roasts, wholesome compliments, secret envelopes, aur hidden easter egg!
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center text-xs font-bold text-[#E879A9]">
              <span>Read Notes →</span>
            </div>
          </Link>

          {/* Teaser 4: Letter */}
          <Link
            to="/letter"
            className="group paper-card p-6 border border-[#F8C8DC] hover:border-[#E879A9] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#F8C8DC] flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
                📜
              </div>
              <h3 className="font-serif-title text-lg font-bold text-[#553047] group-hover:text-[#E879A9] transition-colors">
                Bestie's Emotional Letter
              </h3>
              <p className="text-xs text-[#8E6E83] mt-2 leading-relaxed">
                Ab 2 minute ke liye serious: heartfelt letter written exclusively for Kartiki.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center text-xs font-bold text-[#E879A9]">
              <span>Open Letter →</span>
            </div>
          </Link>

          {/* Teaser 5: Surprise */}
          <Link
            to="/surprise"
            className="group paper-card p-6 border-2 border-[#E879A9] bg-gradient-to-br from-white to-[#FCE7F3] hover:border-[#C94E7F] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between sm:col-span-2 lg:col-span-2"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E879A9] text-white flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform shadow-xs">
                🎁
              </div>
              <h3 className="font-serif-title text-lg font-bold text-[#553047] group-hover:text-[#E879A9] transition-colors">
                The Final Birthday Gift Box 🎀
              </h3>
              <p className="text-xs text-[#8E6E83] mt-2 leading-relaxed">
                The grand finale surprise! Interactive unwrap box, confetti, and Bestie's final message.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-pink-200 flex items-center justify-between text-xs font-bold text-[#E879A9]">
              <span>Unwrap Final Gift →</span>
              <span className="text-[10px] bg-[#E879A9] text-white px-2 py-0.5 rounded-full">Don't Miss It!</span>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
