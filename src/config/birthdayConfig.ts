export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  description?: string;
  altText: string;
  tag?: string;
  rotation?: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  date?: string;
  description: string;
  iconName: string;
  tag: string;
  photoUrl?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctOptionIndex: number; // For score/feedback
  feedback: string;
}

export interface PersonalityQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    vibe: 'drama' | 'sunshine' | 'chaos' | 'overthinker' | 'main_character';
  }[];
}

export interface PersonalityResult {
  title: string;
  badge: string;
  quote: string;
  description: string;
  color: string;
}

export interface SecretMessage {
  id: number;
  label: string;
  preview: string;
  content: string;
  stampIcon: string;
}

export interface WishCard {
  id: number;
  category: 'friendship' | 'success' | 'happiness' | 'funny';
  title: string;
  message: string;
  emoji: string;
}

export interface BirthdayConfig {
  personalization: {
    recipientName: string;
    recipientNickname: string;
    creatorName: string;
    birthdayDate: string; // ISO format: YYYY-MM-DDTHH:mm:ss
    websiteTitle: string;
    mainTagline: string;
    secondaryTagline: string;
  };
  welcomeScreen: {
    title: string;
    subtitle: string;
    buttonText: string;
    skipText: string;
  };
  hero: {
    headline: string;
    subtitle: string;
    badgeText: string;
    primaryButtonText: string;
    secondaryButtonText: string;
    featuredPhotoUrl: string;
  };
  countdown: {
    targetDate: string;
    preBirthdayNotice: string;
    celebrationHeadline: string;
    celebrationSubtitle: string;
    blowCandlesButton: string;
    celebrationManualTrigger: string;
  };
  cakeGame: {
    candleCount: number;
    wishPrompt: string;
    wishPlaceholder: string;
    micButtonText: string;
    tapButtonText: string;
    micActiveNotice: string;
    micPermissionError: string;
    extinguishedTitle: string;
    extinguishedSubtitle: string;
    celebrateButtonText: string;
    finalCakeMessage: string;
  };
  gallery: {
    heading: string;
    subtitle: string;
    items: GalleryItem[];
  };
  timeline: {
    heading: string;
    subtitle: string;
    items: TimelineItem[];
  };
  funZone: {
    heading: string;
    subtitle: string;
    quiz: {
      title: string;
      instructions: string;
      questions: QuizQuestion[];
    };
    catchCake: {
      title: string;
      instructions: string;
      durationSeconds: number;
      scoreThresholds: {
        low: number;
        medium: number;
      };
      messages: {
        low: string;
        medium: string;
        high: string;
      };
    };
    memoryMatch: {
      title: string;
      instructions: string;
    };
    personality: {
      title: string;
      instructions: string;
      questions: PersonalityQuestion[];
      results: Record<string, PersonalityResult>;
    };
  };
  littleThings: {
    heading: string;
    funnyHeading: string;
    funnyButtonText: string;
    funnyCompliments: string[];
    sweetHeading: string;
    sweetCompliments: string[];
    secretMessagesHeading: string;
    secretMessagesSubtitle: string;
    secretMessages: SecretMessage[];
    wishWallHeading: string;
    wishWallSubtitle: string;
    wishes: WishCard[];
    easterEgg: {
      clickCountNeeded: number;
      triggerLabel: string;
      secretMessage: string;
    };
  };
  letter: {
    heading: string;
    intro: string;
    envelopeLabel: string;
    openPrompt: string;
    content: string[];
    signature: string;
    continueButtonText: string;
  };
  finalSurprise: {
    heading: string;
    subtitle: string;
    boxButtonText: string;
    revealedTitle: string;
    message: string[];
    signature: string;
    backHomeButtonText: string;
    shareButtonText: string;
    featuredPhotoUrl?: string;
  };
  music: {
    defaultEnabled: boolean;
    audioUrl: string;
    trackTitle: string;
  };
  theme: {
    enableFloatingHearts: boolean;
    confettiColors: string[];
  };
}

export const birthdayConfig: BirthdayConfig = {
  personalization: {
    recipientName: "Kartiki",
    recipientNickname: "Kartiki",
    creatorName: "Bestie",
    birthdayDate: "2026-11-01T00:00:00",
    websiteTitle: "Kartiki's Little Birthday Universe 💗",
    mainTagline: "Ek normal si duniya mein, ek thodi si extraordinary ladki ke naam. 🎀",
    secondaryTagline: "Warning: Is website ko dekhne ke baad smile control karna mushkil hai. 😂💗",
  },
  welcomeScreen: {
    title: "Pspsps... Kartikiiii 👀💗",
    subtitle: "Tere liye kuch hai. Haan haan, iss baar sirf WhatsApp wala Happy Birthday nahi hai. 😂",
    buttonText: "Open Your Surprise 🎁",
    skipText: "Seedha website pe chalo →",
  },
  hero: {
    headline: "HAPPIEST BIRTHDAY, KARTIKI! 🎂💗",
    subtitle: "Ek aur saal older, thodi aur wiser... wisdom ka proof abhi pending hai. 😂",
    badgeText: "MADE WITH LOVE BY YOUR BESTIE",
    primaryButtonText: "Explore Your Birthday World ✨",
    secondaryButtonText: "See Our Memories 📸",
    featuredPhotoUrl: "/images/friend/friend-portrait.jpg",
  },
  countdown: {
    targetDate: "2026-11-01T00:00:00",
    preBirthdayNotice: "Kartiki's special day is getting closer... 🎀",
    celebrationHeadline: "HAPPIEST BIRTHDAY, KARTIKI! 🎂💗",
    celebrationSubtitle: "Countdown khatam! Ab birthday girl apni candles blow karegi. Make a wish, madam! ✨",
    blowCandlesButton: "Let's Blow the Candles! 🕯️",
    celebrationManualTrigger: "Want to celebrate right now? Click here to test candle blowing! ✨",
  },
  cakeGame: {
    candleCount: 5,
    wishPrompt: "Close your eyes, Kartiki... wish maang le! ✨",
    wishPlaceholder: "Teri secret birthday wish yahan likh sakti hai (client-only, nowhere saved)...",
    micButtonText: "Blow Into Your Mic 🎤",
    tapButtonText: "Tap to Blow the Candles 💨",
    micActiveNotice: "Listening for your breath! Phook maar mic pe زور se... 💨",
    micPermissionError: "Mic access nahi mila ya unsupported hai. Don't worry, Tap to Blow button use karo! ✨",
    extinguishedTitle: "YOU DID IT, KARTIKI! 🎉💗",
    extinguishedSubtitle: "Saari candles bujh gayi! Ab teri saari wishes slowly-slowly reality banein. 🫶",
    celebrateButtonText: "Celebrate My Birthday! 🎂",
    finalCakeMessage: `Happy Birthday, Kartiki! 💗

Ab ek saal aur iconic banne ka time aa gaya hai. 😂

Teri life happiness, good health, success, lots of love aur unlimited cake se bhari rahe.

Aur haan, birthday cake mein Bestie ka imaginary share mat bhoolna! 🎂🤌

Lots of love,
Bestie 🎀`,
  },
  gallery: {
    heading: "Camera Roll Se Kuch Masterpieces 📸",
    subtitle: "Some cute memories, some questionable decisions, aur kuch photos jo delete hi rehni chahiye thi. 😂",
    items: [
      {
        id: "mem-1",
        url: "/images/memories/memory-01.jpg",
        caption: "Certified cutie alert 🎀",
        date: "Golden Hour Glow",
        description: "Jab Kartiki ne bola 'ek natural candid photo kheech na please' aur ye masterpiece nikla.",
        altText: "Kartiki looking graceful and happy in golden hour",
        tag: "Iconic",
        rotation: "-2deg",
      },
      {
        id: "mem-2",
        url: "/images/memories/memory-02.jpg",
        caption: "Main character energy, obviously ✨",
        date: "Vibe Check: 100/10",
        description: "Bina kisi reason ke 100% Bollywood main character feel aur top tier styling.",
        altText: "Kartiki with effortless main character energy",
        tag: "Vibe",
        rotation: "2.5deg",
      },
      {
        id: "mem-3",
        url: "/images/memories/funny-moment-01.jpg",
        caption: "Proof that normal rehna is not our thing 😂",
        date: "Pure Unfiltered Chaos",
        description: "Vo moment jab dono ki hasi public place pe control se bahar ho gayi thi.",
        altText: "A funny and joyful laughing moment",
        tag: "Chaos",
        rotation: "-1.5deg",
      },
      {
        id: "mem-4",
        url: "/images/memories/birthday-memory-01.jpg",
        caption: "Ek photo, hazaar expressions 🤌",
        date: "Drama Headquarters",
        description: "Kartiki making 10 expressions in 2 seconds flat, and somehow all look cute.",
        altText: "Expressive and playful photo moment",
        tag: "Drama",
        rotation: "1.8deg",
      },
      {
        id: "mem-5",
        url: "/images/memories/memory-05.jpg",
        caption: "Too cute to handle 💗",
        date: "Sweetest Smile",
        description: "Smile aisi jo kisi ka bhi kharab din 2 second mein accha bana sakti hai.",
        altText: "Kartiki with a bright radiant smile",
        tag: "Sunshine",
        rotation: "-2.8deg",
      },
      {
        id: "mem-6",
        url: "/images/memories/memory-06.jpg",
        caption: "Memories worth keeping forever 🫶",
        date: "Core Memory Unlocked",
        description: "Best memories are the spontaneous, unplanned ones with the best people.",
        altText: "Heartwarming celebration and memorable moment",
        tag: "Forever",
        rotation: "2deg",
      },
    ],
  },
  timeline: {
    heading: "Little Moments, Big Memories 🫶",
    subtitle: "Har memory ki apni vibe hoti hai. Kuch pe hasi aati hai, kuch pe smile, aur kuch pe bas 'yaar, kya din the' wali feeling. 💗",
    items: [
      {
        id: "time-1",
        title: "The Iconic First Chapter 🌸",
        date: "Back When It Started",
        description: "Pehle normal jaan-pehchan, fir random talks, aur kab hum roz baat karne lage pata hi nahi chala!",
        iconName: "Sparkles",
        tag: "Origins",
      },
      {
        id: "time-2",
        title: "Late Night Rants & Tea Sessions ☕",
        date: "3:00 AM Chronicles",
        description: "Duniya bhar ki gossips, random life problems aur 'ab main so rahi hoon' keh kar aur ek ghanta jagna. 😂",
        iconName: "Coffee",
        tag: "Gossip",
      },
      {
        id: "time-3",
        title: "Food Adventures & Cravings 🍕",
        date: "Always Hungry Dept",
        description: "Dieting ka plan Monday ko banta tha aur Tuesday ko momos/pizza dekh ke break ho jaata tha. Fully worth it!",
        iconName: "Utensils",
        tag: "Foodies",
      },
      {
        id: "time-4",
        title: "Unconditional Hype Squad 👑",
        date: "Forever & Always",
        description: "Har outfit picture ko 100/10 bolna, har life win pe cheer karna aur har low moment pe backup banna.",
        iconName: "HeartHandshake",
        tag: "Bond",
      },
    ],
  },
  funZone: {
    heading: "Welcome to Kartiki's Fun Zone 🤡",
    subtitle: "Yahan intelligence, patience aur cake-catching skills test honge. Good luck, madam! 😂",
    quiz: {
      title: "How Well Do You Know Yourself? 🧠",
      instructions: "5 sawal, 100% honesty. Dekhte hain tu khud ko kitna sahi samajhti hai! 😂",
      questions: [
        {
          id: 1,
          question: "Kartiki ka ideal free day kaisa hoga?",
          options: [
            "Sleeping peacefully 😴",
            "Ghoomna-phirna ✨",
            "Food + series 🍕",
            "Sab kuch, depending on mood 😂",
          ],
          correctOptionIndex: 3,
          feedback: "Obviously mood swings ke according plan banta hai! Perfect answer 🤌",
        },
        {
          id: 2,
          question: "Kartiki ki birthday priority kya honi chahiye?",
          options: [
            "Cake 🎂",
            "Gifts 🎁",
            "Photos 📸",
            "Full VIP treatment 👑",
          ],
          correctOptionIndex: 3,
          feedback: "Ek din ke liye Queen banne ka haq sirf tera hai! 👑",
        },
        {
          id: 3,
          question: "Kartiki ki vibe kya hai?",
          options: [
            "Main character ✨",
            "Comedy department 🤡",
            "Secretly emotional 💗",
            "Full package 😂",
          ],
          correctOptionIndex: 3,
          feedback: "Poori ki poori multi-talented combo pack! 😂",
        },
        {
          id: 4,
          question: "Kartiki ka birthday slogan kya hona chahiye?",
          options: [
            "No drama today",
            "Cake first, questions later",
            "Main hoon na, party karo",
            "It's my day, deal with it 👑",
          ],
          correctOptionIndex: 3,
          feedback: "100% valid! Aaj kisi ki sunne ki bilkul zaroorat nahi hai. ✨",
        },
        {
          id: 5,
          question: "Aaj Kartiki ko sabse zyada kya milna chahiye?",
          options: [
            "Happiness 🫶",
            "Unlimited cake 🎂",
            "Lots of love 💗",
            "All of the above ✨",
          ],
          correctOptionIndex: 3,
          feedback: "Sab kuch aur usse bhi zyada! You deserve every bit of it 💗",
        },
      ],
    },
    catchCake: {
      title: "Kartiki's Cake Rescue Mission 🎂",
      instructions: "Birthday cakes ko catch kar! Cake waste hua toh birthday committee disappointed hogi. 😂 (Use Arrow keys, A/D, or on-screen touch buttons)",
      durationSeconds: 30,
      scoreThresholds: {
        low: 10,
        medium: 25,
      },
      messages: {
        low: "Cake bhi bachana tha, madam! 😂",
        medium: "Not bad, birthday star! 🎀",
        high: "Cake-catching legend unlocked. 👑",
      },
    },
    memoryMatch: {
      title: "Memory Match: Birthday Edition 🧠💗",
      instructions: "Cards match kar aur prove kar ki tera focus sirf cake pe nahi hai. 😂",
    },
    personality: {
      title: "Kartiki Ki Official Vibe Report 🤡",
      instructions: "Kuch quick scenario questions ke answers de aur apna official birthday personality diagnosis jaan!",
      questions: [
        {
          id: 1,
          question: "Subah achanak aankh khulti hai toh pehla thought kya hota hai?",
          options: [
            { text: "5 minute aur so leti hoon warna migraine ho jayega.", vibe: "drama" },
            { text: "Aaj ka din mast banana hai, positive vibes only!", vibe: "sunshine" },
            { text: "Phone kahan hai mera? Instagram notifications check!", vibe: "chaos" },
            { text: "Kya maine kal raat kuch aisi baat boldi jo nahi bolni chahiye thi?", vibe: "overthinker" },
          ],
        },
        {
          id: 2,
          question: "Kisi restaurant mein menu dekh kar order decide karne mein kitna time lagta hai?",
          options: [
            { text: "Waiters 3 baar aake ja chuke hote hain, fir bhi confused.", vibe: "overthinker" },
            { text: "Jo photo mein sabse aesthetic dikhega wahi order!", vibe: "main_character" },
            { text: "Jo sab order kar rahe hain wahi khilado, bas bhook lagi hai.", vibe: "chaos" },
            { text: "Dessert pehle decide hoga, khana baad mein.", vibe: "sunshine" },
          ],
        },
        {
          id: 3,
          question: "Jab Bestie koi funny gossip batati hai toh tera reaction:",
          options: [
            { text: "WHAT?! Hath pakad ke poori kahani detail mein puchti hai.", vibe: "drama" },
            { text: "Haste-haste pet dukhne lagta hai, breathing stops.", vibe: "chaos" },
            { text: "Main pehle se janti thi! Meri sixth sense hamesha sahi hoti hai.", vibe: "main_character" },
            { text: "Dono side ka point of view deeply analyse karti hai.", vibe: "overthinker" },
          ],
        },
        {
          id: 4,
          question: "Birthday outfit finalize karne ka process:",
          options: [
            { text: "Ek mahine pehle se Pinterest boards aur 50 screenshots ready.", vibe: "main_character" },
            { text: "10 kapde try karke bolna 'mere paas kuch pehanne ko nahi hai'.", vibe: "drama" },
            { text: "Jo comfortable ho aur jisme smile acchi aaye wahi best hai.", vibe: "sunshine" },
            { text: "Aakhri 2 ghante mein achanak out of nowhere idea aana.", vibe: "chaos" },
          ],
        },
      ],
      results: {
        drama: {
          title: "Drama Department Head 🎭👑",
          badge: "Queen of Reactions",
          quote: "Mera reaction thoda sa dramatic tha, but necessary tha!",
          description: "Teri baaton mein emotion hai, expressions mein cinema hai, aur life mein full entertainment! Tere bina koi bhi conversation boring lagti hai.",
          color: "#E879A9",
        },
        sunshine: {
          title: "Human Sunshine ☀️🌸",
          badge: "Official Glow Bringer",
          quote: "Smile free hai, toh khul ke banto!",
          description: "Jahan tu hoti hai wahan warmth hoti hai. Tera nature sabko comfortable feel karwata hai aur teri presence kisi ke bhi kharab mood ko cure kar sakti hai.",
          color: "#F6D365",
        },
        chaos: {
          title: "Certified Chaos Queen 🤡⚡",
          badge: "Unpredictable Cutie",
          quote: "Normal rehna toh boring logon ka kaam hai!",
          description: "Kab kya bolde, kab achanak zor se has de, koi predict nahi kar sakta. Teri spontaneous vibe hi teri sabse badi superpower hai!",
          color: "#FF9EAA",
        },
        overthinker: {
          title: "Professional Overthinker 🧠✨",
          badge: "Deep Thinker & Soft Heart",
          quote: "Usne 'okay' bola ya 'okay...' bola? Kuch toh baat hai!",
          description: "Tu har chhoti baat ki gehraai mein jaati hai kyunki tu genuinely care karti hai. Tera dil super pure aur thoughtful hai.",
          color: "#C084FC",
        },
        main_character: {
          title: "Main Character Forever 🎬✨",
          badge: "Spotlight magnet",
          quote: "Life is a movie, aur soundtrack meri choice ka chalega!",
          description: "Confidence, charm, style aur wo natural spark jo sabka dhyan kheench leta hai. You were truly born to shine bright!",
          color: "#FF8FAB",
        },
      },
    },
  },
  littleThings: {
    heading: "Little Things About Kartiki 🎀",
    funnyHeading: "Reasons Why Kartiki Is Iconic 👑",
    funnyButtonText: "Ek Aur Sach Bata 😂",
    funnyCompliments: [
      "Tu cute hai, but tera drama level premium subscription wala hai. 😂",
      "Teri vibe alag hai. Logic kabhi-kabhi unavailable rehta hai, but vibe full marks. 🤌",
      "Tu ek walking plot twist hai, and honestly, boring life se toh better hi hai. 😭",
      "Main character energy? Madam, tu toh poori series hai. 🎬",
      "Tere jaise dost milte nahi... aur mil bhi gaye toh handle karna padta hai. 😂",
      "Cuteness unlimited, nakhre unlimited, patience ka test unlimited. 💗",
      "Teri smile 10/10. Teri bakchodi ka rating system abhi invent nahi hua. 🤡",
    ],
    sweetHeading: "Wholesome & True 🫶",
    sweetCompliments: [
      "Tu apne logon ke liye genuinely special hai. 🫶",
      "I hope life gives you a million reasons to smile.",
      "Tu jaisi hai, waise hi amazing rehna. 💗",
      "You deserve happiness that feels as lovely as you make others feel.",
      "Tere jaisa supportive aur real friend milna is a rare blessing. ✨",
      "Teri kindness aur warm nature kisi ka bhi din roshan kar sakti hai.",
    ],
    secretMessagesHeading: "Little Notes, Just for You 💌",
    secretMessagesSubtitle: "Click on any envelope to open Bestie's private mini-note! Open them one by one. 🎀",
    secretMessages: [
      {
        id: 1,
        label: "Note #1",
        preview: "Read when you doubt yourself...",
        content: "Reminder: Tu apne aap ko jitna credit deti hai, usse zyada deserve karti hai. 🫶 You are stronger and capable than you think!",
        stampIcon: "Heart",
      },
      {
        id: 2,
        label: "Note #2",
        preview: "A birthday prayer for you...",
        content: "May your bad days be fewer, your good days be many, and your cake slices always be extra. 🎂 Always cheering for you!",
        stampIcon: "Sparkles",
      },
      {
        id: 3,
        label: "Note #3",
        preview: "About living life lightly...",
        content: "Life ko thoda seriously lena, but khud ko kabhi itna seriously mat lena ki hasi hi bhool jaaye. 💗 Keep that cute laughter alive!",
        stampIcon: "Smile",
      },
      {
        id: 4,
        label: "Note #4",
        preview: "About your dreams...",
        content: "Tere dreams important hain. Don't rush, keep going, one step at a time. ✨ Universe is writing a beautiful story for you.",
        stampIcon: "Star",
      },
      {
        id: 5,
        label: "Note #5",
        preview: "Strict birthday protocol...",
        content: "Secret birthday rule: Aaj guilt-free cake allowed hai. Calories don't count on your birthday. Kal ka kal dekhenge! 😂🍰",
        stampIcon: "Gift",
      },
    ],
    wishWallHeading: "Kartiki's Birthday Wish Wall 🌸",
    wishWallSubtitle: "Special birthday intentions and wishes crafted for your special day.",
    wishes: [
      {
        id: 1,
        category: "happiness",
        title: "Endless Smiles",
        message: "Tere chehre ki smile kabhi fade na ho, aur har din ek nayi khushi lekar aaye.",
        emoji: "☀️",
      },
      {
        id: 2,
        category: "friendship",
        title: "Bestie Bond",
        message: "Chahe kitne bhi saal beet jayein, humari bakchodi aur support system hamesha top tier rahega!",
        emoji: "🎀",
      },
      {
        id: 3,
        category: "success",
        title: "Big Dreams & Wins",
        message: "Tu jo bhi goal decide kare, usme success tere kadam choome. Sky is not the limit for you!",
        emoji: "🚀",
      },
      {
        id: 4,
        category: "funny",
        title: "Unlimited Cake Quota",
        message: "Wishing you a lifetime supply of tasty food, zero weight gain and free shopping vouchers!",
        emoji: "🎂",
      },
    ],
    easterEgg: {
      clickCountNeeded: 5,
      triggerLabel: "Secret Bestie Seal 🎀",
      secretMessage: "Hahaha tune 5 baar click kiya! 😂 You unlocked the Top Secret Easter Egg: Kartiki, tu sach mein ek number ki drama queen hai, lekin Bestie ki sabse favourite drama queen hai! Love you loads! 💗✨",
    },
  },
  letter: {
    heading: "Okay, Ab Thoda Emotional Ho Jaate Hain... 💌",
    intro: "Abhi tak hasi-mazaak hua. Ab 2 minute ke liye serious ho ja, please. 😭💗",
    envelopeLabel: "For Kartiki's Eyes Only",
    openPrompt: "Click to open Bestie's letter 💌",
    content: [
      "Dear Kartiki,",
      "Happiest Birthday, Kartikiiii! 🎂💗",
      "Sabse pehle, I hope tera aane wala saal happiness, good health, success, peace aur bahut saari beautiful memories se bhara ho.",
      "Tu apni life mein jo bhi achieve karna chahti hai, I genuinely hope tu uske aur kareeb jaaye. Tere paas smile karne ke bahut saare reasons hon, tere dreams slowly-slowly reality banein, aur life tujhe woh moments de jo tu hamesha yaad rakhe.",
      "Aur haan, birthday hai toh aaj apne saare nakhre officially allowed hain. Cake extra kha, photos unlimited le, aur ek din ke liye duniya ki tension side mein rakh. 😂🎂",
      "Thank you for being someone worth celebrating. I hope tujhe hamesha aise log milen jo teri happiness mein genuinely khush hon, teri respect karein, aur tujhe yaad dilayein ki tu kitni special hai.",
      "Life mein chahe kitne bhi changes aayein, I hope tera confidence, teri smile aur teri khud ki identity hamesha strong rahe.",
      "Once again, happiest birthday, Kartiki! Keep smiling, keep growing, keep being your own kind of amazing.",
    ],
    signature: "Lots of love,\nYour Bestie 💗🎀",
    continueButtonText: "Now, See Your Final Surprise 🎁 →",
  },
  finalSurprise: {
    heading: "Okay Kartiki, Last Surprise... 🎁",
    subtitle: "Ab iske baad aur kuch nahi hai... probably. 👀",
    boxButtonText: "Open Your Final Gift 💗",
    revealedTitle: "A Gift From The Heart 🎀",
    message: [
      "Kartiki, this little corner of the internet was made just for you. 💗",
      "Isme thoda sa humour hai, thodi si cuteness, thoda sa chaos aur bahut saari good wishes.",
      "I hope tera birthday utna hi beautiful ho jitni happiness tu deserve karti hai.",
      "Keep smiling, keep dreaming, aur please apne birthday cake mein Bestie ka imaginary share mat bhoolna. 😂🎂",
      "Happy Birthday once again, Kartiki!",
    ],
    signature: "With lots of love,\nBestie 💗",
    backHomeButtonText: "← Back to Home World",
    shareButtonText: "Share This Special Link 🎀",
    featuredPhotoUrl: "/images/friend/friend-portrait.jpg",
  },
  music: {
    defaultEnabled: false,
    audioUrl: "/audio/birthday-tune.mp3",
    trackTitle: "Soft Birthday Melody 🎵",
  },
  theme: {
    enableFloatingHearts: true,
    confettiColors: ["#F8C8DC", "#E879A9", "#FFDCC8", "#E9DDFB", "#FFF9F2", "#FFB703"],
  },
};
