import confetti from 'canvas-confetti';
import { birthdayConfig } from '../config/birthdayConfig';

export const triggerBirthdayConfetti = (originY = 0.6) => {
  const colors = birthdayConfig.theme.confettiColors;

  // Center burst
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: originY },
    colors: colors,
    ticks: 200,
    shapes: ['circle', 'square'],
    scalar: 1.2,
  });

  // Left & right cannons for grand celebration
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: originY },
      colors: colors,
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: originY },
      colors: colors,
    });
  }, 250);
};

export const triggerStarConfetti = () => {
  confetti({
    particleCount: 40,
    spread: 360,
    ticks: 150,
    gravity: 0.8,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#FFE66D', '#FF6B6B', '#4ECDC4', '#E879A9', '#F8C8DC'],
    shapes: ['star'],
    scalar: 1.4,
  });
};
