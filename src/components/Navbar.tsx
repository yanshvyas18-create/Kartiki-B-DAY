import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Image, Gamepad2, Sparkles, Mail, Gift, Menu, X, Heart } from 'lucide-react';
import { MusicPlayer } from './MusicPlayer';
import { birthdayConfig } from '../config/birthdayConfig';
import { CatPawIcon } from './CatStickers';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: Home },
  { name: 'Memories', path: '/memories', icon: Image },
  { name: 'Fun Zone', path: '/fun-zone', icon: Gamepad2, tag: '4 Games' },
  { name: 'Little Things', path: '/little-things', icon: Sparkles },
  { name: 'Letter', path: '/letter', icon: Mail, tag: 'Emotional' },
  { name: 'Surprise', path: '/surprise', icon: Gift, tag: 'Final 🎁' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Title */}
          <NavLink
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F8C8DC] to-[#FFDCC8] flex items-center justify-center shadow-xs border border-white">
              <span className="text-lg">🎀</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-title font-bold text-base sm:text-lg text-[#553047] leading-tight flex items-center gap-1.5">
                {birthdayConfig.personalization.recipientName}'s Universe
                <CatPawIcon className="w-3 h-3 text-[#E879A9]" />
                <Heart className="w-3.5 h-3.5 text-[#E879A9] fill-[#E879A9] inline-block animate-pulse" />
              </span>
              <span className="text-[11px] text-[#8E6E83] font-medium tracking-wide">
                Special Birthday Edition
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links (6 Routes) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: active }) => `
                    relative px-3.5 py-2 rounded-full text-xs lg:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5
                    ${
                      active
                        ? 'bg-[#E879A9] text-white shadow-sm shadow-pink-200'
                        : 'text-[#553047] hover:bg-[#FCE7F3]/70 hover:text-[#C94E7F]'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.tag && !isActive && (
                    <span className="text-[9px] px-1.5 py-0.2 bg-[#F8C8DC] text-[#553047] rounded-full font-bold">
                      {item.tag}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#C94E7F] rounded-full"></span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Controls: Music Player & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <MusicPlayer />

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2 rounded-xl text-[#553047] hover:bg-[#FCE7F3] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#F8C8DC]/60 bg-[#FFF9F2]/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) => `
                    flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all
                    ${
                      isActive
                        ? 'bg-[#E879A9] text-white shadow-sm'
                        : 'text-[#553047] hover:bg-[#FCE7F3] active:bg-[#F8C8DC]'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-white/40">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  {item.tag && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/30 text-inherit font-bold">
                      {item.tag}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between text-xs text-[#8E6E83] px-2">
            <span>Made with 💗 by Bestie</span>
            <span>Happy Birthday Kartiki! 🎂</span>
          </div>
        </div>
      )}
    </header>
  );
};
