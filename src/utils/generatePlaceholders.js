// Helper script to generate cute pastel placeholders for Kartiki's photo gallery
import fs from 'fs';
import path from 'path';

const baseDir = path.resolve(process.cwd(), 'public/images');

const placeholders = [
  {
    dir: 'friend',
    name: 'friend-portrait.jpg',
    title: 'Kartiki ✨',
    subtitle: 'Birthday Star 🎀',
    bg: '#FCE7F3',
    accent: '#E879A9',
    icon: '👑'
  },
  {
    dir: 'memories',
    name: 'memory-01.jpg',
    title: 'Golden Hour',
    subtitle: 'Certified Cutie 🎀',
    bg: '#FFF9F2',
    accent: '#E879A9',
    icon: '✨'
  },
  {
    dir: 'memories',
    name: 'memory-02.jpg',
    title: 'Main Character',
    subtitle: '100% Bollywood Vibe',
    bg: '#E9DDFB',
    accent: '#9D4EDD',
    icon: '🎬'
  },
  {
    dir: 'memories',
    name: 'funny-moment-01.jpg',
    title: 'Pure Chaos 😂',
    subtitle: 'Unfiltered Laughter',
    bg: '#FFDCC8',
    accent: '#FF758F',
    icon: '🤡'
  },
  {
    dir: 'memories',
    name: 'birthday-memory-01.jpg',
    title: 'Drama Mode ON',
    subtitle: '10 Expressions in 2s',
    bg: '#F8C8DC',
    accent: '#D81159',
    icon: '🤌'
  },
  {
    dir: 'memories',
    name: 'memory-05.jpg',
    title: 'Sweetest Smile',
    subtitle: 'Too Cute To Handle 💗',
    bg: '#FFF0F5',
    accent: '#E879A9',
    icon: '🌸'
  },
  {
    dir: 'memories',
    name: 'memory-06.jpg',
    title: 'Core Memories',
    subtitle: 'Bestie Forever 🫶',
    bg: '#E0F2FE',
    accent: '#0284C7',
    icon: '💖'
  }
];

function generateSvg(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="grad-${p.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${p.bg}"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <pattern id="dots-${p.name}" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="${p.accent}" fill-opacity="0.25"/>
    </pattern>
  </defs>
  <rect width="600" height="600" fill="url(#grad-${p.name})"/>
  <rect width="600" height="600" fill="url(#dots-${p.name})"/>
  
  <!-- Frame border -->
  <rect x="25" y="25" width="550" height="550" rx="20" fill="none" stroke="${p.accent}" stroke-width="2" stroke-dasharray="8 6" opacity="0.6"/>

  <!-- Center Decorative Circle -->
  <circle cx="300" cy="260" r="110" fill="#FFFFFF" filter="drop-shadow(0 8px 16px rgba(85,48,71,0.1))"/>
  <circle cx="300" cy="260" r="100" fill="${p.bg}" stroke="${p.accent}" stroke-width="3"/>
  <text x="300" y="285" font-size="80" text-anchor="middle">${p.icon}</text>

  <!-- Titles -->
  <text x="300" y="420" font-family="'Playfair Display', Georgia, serif" font-size="34" font-weight="bold" fill="#553047" text-anchor="middle">${p.title}</text>
  <text x="300" y="460" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="600" fill="${p.accent}" text-anchor="middle">${p.subtitle}</text>
  <text x="300" y="500" font-family="'Caveat', cursive" font-size="22" fill="#8E6E83" text-anchor="middle">[Drop your real photo here in public/images/]</text>

  <!-- Sparkles -->
  <circle cx="120" cy="120" r="4" fill="${p.accent}"/>
  <circle cx="480" cy="140" r="6" fill="${p.accent}"/>
  <circle cx="160" cy="460" r="5" fill="${p.accent}"/>
  <circle cx="460" cy="480" r="4" fill="${p.accent}"/>
</svg>`;
}

for (const p of placeholders) {
  const targetDir = path.join(baseDir, p.dir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const filePath = path.join(targetDir, p.name);
  fs.writeFileSync(filePath, generateSvg(p));
}

console.log('Generated placeholder photos successfully!');
