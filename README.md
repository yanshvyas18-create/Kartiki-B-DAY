# Kartiki's Little Birthday Universe 💗🎀

> *"Ek normal si duniya mein, ek thodi si extraordinary ladki ke naam. 🎀"*  
> *"Warning: Is website ko dekhne ke baad smile control karna mushkil hai. 😂💗"*

A complete, responsive, interactive, and lovingly handcrafted birthday surprise website dedicated to **Kartiki**, crafted with affection, funny teasing, and friendship by her **Bestie**.

---

## ✨ Features & Structure (Strict Six-Page Architecture)

1. **Page 1: Home & Birthday Countdown (`/`)**
   - 💌 **Animated Welcome Envelope**: "Pspsps... Kartikiiii 👀💗" with celebration confetti and skip option.
   - 👑 **Birthday Hero**: Featured Polaroid scrapbook card with washi tape and cute stickers.
   - ⏳ **Live Countdown**: Accurately counts down days, hours, minutes, and seconds till **1 November 2026**. Includes a *"Celebrate Now"* testing switch.
   - 🎂 **Interactive Candle-Blowing Cake**:
     - SVG & CSS multi-layered pastel birthday cake with glowing flames.
     - Optional client-side secret wish input (never uploaded, strictly private).
     - **Method A (Microphone)**: Blow air into your device mic! Analyzed in real time using the Web Audio API with a live sound meter.
     - **Method B (Tap to Blow)**: Works universally without mic permissions. Click or tap to extinguish flames with smoke puff animations.
     - Tap individual candles directly.
     - Triggers celebratory confetti and unlocks Bestie's official birthday message!

2. **Page 2: Memories & Photo Gallery (`/memories`)**
   - 📸 **Polaroid Scrapbook Gallery**: Authentic Polaroid frames with tilt angles, washi tape, and cute captions.
   - 🔍 **Interactive Fullscreen Lightbox**: Arrow navigation (←/→), keyboard Escape support, and zoom view.
   - 🫶 **Memory Timeline ("Timeline of Us")**: Milestones, late-night tea rants, food cravings, and unconditional hype squad memories.

3. **Page 3: Fun Zone (`/fun-zone`)** (All 4 games on a single route)
   - 🧠 **Game 1: Birthday Quiz ("How Well Do You Know Yourself?")**: 5 multiple-choice questions with playful feedback and scoring.
   - 🎂 **Game 2: Catch The Cake ("Kartiki's Cake Rescue Mission")**: 30-second arcade with falling cakes, cupcakes, and hearts. Supports keyboard (Arrow / A/D keys) and on-screen touch buttons for mobile. Persists high scores in `localStorage`.
   - 🎴 **Game 3: Memory Match ("Memory Match: Birthday Edition")**: 12 flip cards with moves tracker, timer, match counter, and confetti victory.
   - 👑 **Game 4: Vibe Report ("Kartiki Ki Official Vibe Report")**: Fun diagnosis calculating whether Kartiki is *Drama Department Head*, *Human Sunshine*, *Certified Chaos Queen*, *Professional Overthinker*, or *Main Character Forever*. Includes Web Share API and clipboard copy fallback.

4. **Page 4: Little Things About Kartiki (`/little-things`)**
   - 😂 **Compliment Generator**: Switch between *Funny Teasing* ("Tu cute hai but tera drama level premium subscription wala hai") and *Wholesome* with anti-repetition protection.
   - 💌 **Secret Message Envelopes**: 5 individually clickable envelopes with wax stamps that open and fold back.
   - 🌸 **Birthday Wish Wall**: Intentions for happiness, friendship, and unlimited cake.
   - 🤫 **Hidden Easter Egg**: Click the "Secret Bestie Seal" 5 times to unlock a secret message!

5. **Page 5: Heartfelt Birthday Letter (`/letter`)**
   - 📜 **Emotional Letter from Bestie**: An animated sealed envelope opening into an elegant paper card with handwritten typography and Bestie's signature.
   - 🎵 **Background Music Toggle**: Ambient music box chime synth built-in, with instant support for custom MP3 tracks.

6. **Page 6: Final Surprise (`/surprise`)**
   - 🎁 **Interactive Gift Box**: Click to unwrap the 3D-styled lid with confetti and reveal the final touching message, featured photo, and share button.

---

## 🛠️ Technology Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4** + Custom Scrapbook Design System (`src/styles/theme.css`)
- **React Router DOM v7** (Strict 6 routes + redirect fallback)
- **Canvas Confetti**
- **Lucide React** (Aesthetic icons)
- **Web Audio API** (Microphone blow detection & music box synth chime fallback)
- **LocalStorage** (Arcade high scores & memory match best moves)

---

## 🚀 Running Locally on Windows

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or newer. Node v24 is already tested and works smoothly).

### 2. Installation
Open PowerShell or Command Prompt in the project folder:
```powershell
cd C:\Users\USERR\.gemini\antigravity\scratch\kartiki-birthday-universe
npm install
```

### 3. Start Development Server
```powershell
npm run dev
```
Open your browser at `http://localhost:5173` to explore the website.

### 4. Build for Production
```powershell
npm run build
```
The optimized static build will be generated in the `dist/` directory.

---

## 🎨 How to Personalize (Central Configuration)

All text, dates, questions, options, messages, and photos are controlled centrally in:
👉 `src/config/birthdayConfig.ts`

### 1. Change Personal Details:
```ts
personalization: {
  recipientName: "Kartiki",
  recipientNickname: "Kartiki",
  creatorName: "Bestie",
  birthdayDate: "2026-11-01T00:00:00", // Change birthday date/year here
  websiteTitle: "Kartiki's Little Birthday Universe 💗",
  ...
}
```

### 2. Real Photos of Kartiki:
The 10 real photographs of Kartiki are located in:
👉 `public/images/kartiki/`
- `kartiki-01-outdoor-white-dress.jpg`: Angel in white sharara with mehndi
- `kartiki-02-sunlit-selfie.jpg`: Sunlit golden hour glow with floral embroidery
- `kartiki-03-mirror-selfie.jpg`: The iconic mirror selfie fit check
- `kartiki-04-closeup-white-top.jpg`: The 10/10 million-dollar smile (Hero portrait & gallery)
- `kartiki-05-navy-star-outfit.jpg`: Starry night cozy cardigan outfit
- `kartiki-06-with-white-kitten.jpg`: Cat Mom holding her fluffy white Persian kitten
- `kartiki-07-black-and-red-traditional.jpg`: Desi royalty in velvet & red lehenga
- `kartiki-08-white-and-blue-outfit.jpg`: Royal blue skirt & satin shirt celebration
- `kartiki-09-pink-traditional-outfit.jpg`: Pretty in pink traditional chikankari (Final Surprise & gallery)
- `kartiki-10-with-kitten-selfie.jpg`: Kitten cuddle selfie cuteness overload

All 10 photos are integrated across the **Hero Polaroid**, **Scrapbook Gallery (all 10 photos)**, **Timeline of Us**, and the **Final Surprise Gift Reveal**!

### 3. Cute Kitten & Paw Stickers:
- Subtle pastel cat stickers, sleeping kittens, peeking kittens, and paw prints are placed throughout the scrapbook, celebrating Kartiki's love for cats and kittens without obstructing buttons or text!

### 4. Adding Background Music:
Place any `.mp3` audio file at:
`public/audio/birthday-tune.mp3`

*(Note: If no audio file is provided, the website automatically plays a soothing, gentle music box chime melody using the browser's Web Audio API synthesizer!)*

---

## 🌐 Free Deployment (Get a Public Link for Kartiki)

### Option A: Deploy on Vercel (Recommended)
1. Push your repository to GitHub or install the Vercel CLI (`npm install -g vercel`).
2. Run `vercel` in the project root, or connect your GitHub repo on [vercel.com](https://vercel.com).
3. Framework Preset: **Vite**
4. Root Directory: `./`
5. Click **Deploy**!
*(SPA route rewrites are already pre-configured in `vercel.json`)*.

### Option B: Deploy on Netlify
1. Drag and drop the `dist` folder directly into [app.netlify.com/drop](https://app.netlify.com/drop).
*(SPA route redirects are already pre-configured in `public/_redirects`)*.

---

## 🔒 Privacy & Accessibility Notes

- **Microphone**: Only requested when the user clicks *"Blow Into Your Mic"*. No audio is ever recorded or uploaded.
- **Birthday Wish**: Kept in temporary client state; never saved to any database.
- **Public URL**: Remember that any photos included in a public deployment will be accessible to anyone with the link. Keep private photos safe or deploy on a protected domain if preferred.

---

Made with lots of love, teasing, and smiles by **Bestie** for **Kartiki** 🎀💗
