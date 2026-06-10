/**
 * Gamification utilities: streak, XP (computed from actual progress),
 * CEFR level label, and daily rotating phrase.
 */

import { loadSet } from './storage.js';

// ─── Streak ───────────────────────────────────────────────────────────────────

const STREAK_KEY = 'en_app_streak';
const LAST_VISIT_KEY = 'en_app_last_visit';

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Call once on page load. Updates the streak counter and returns current streak.
 * @returns {number}
 */
export function updateAndGetStreak() {
  const today = todayStr();
  const last = localStorage.getItem(LAST_VISIT_KEY);
  let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);

  if (last === today) return streak;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yest = yesterday.toISOString().slice(0, 10);

  streak = last === yest ? streak + 1 : 1;
  localStorage.setItem(STREAK_KEY, String(streak));
  localStorage.setItem(LAST_VISIT_KEY, today);
  return streak;
}

export function getStreak() {
  return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
}

// ─── XP (derived from real progress) ─────────────────────────────────────────

const XP_WEIGHTS = {
  rules: 3,
  mega: 2,
  phrasal: 2,
  top500: 1,
  irregular: 2,
  sentences: 2,
  conversations: 5,
};

/** Compute XP dynamically from all learned sets. No staleness risk. */
export function computeXP() {
  return Object.entries(XP_WEIGHTS).reduce((total, [section, weight]) => {
    return total + loadSet(section).size * weight;
  }, 0);
}

// ─── CEFR-mapped level ────────────────────────────────────────────────────────

const LEVELS = [
  {
    label: 'A1 Beginner',
    min: 0,
    next: 50,
  },
  {
    label: 'A1+ Starter',
    min: 50,
    next: 120,
  },
  {
    label: 'A2 Elementary',
    min: 120,
    next: 250,
  },
  {
    label: 'A2+ Pre-Intermediate',
    min: 250,
    next: 450,
  },
  {
    label: 'B1 Intermediate',
    min: 450,
    next: 750,
  },
  {
    label: 'B1+ Upper-Int.',
    min: 750,
    next: 1100,
  },
  {
    label: 'B2 Upper-Intermediate',
    min: 1100,
    next: 1600,
  },
  {
    label: 'B2+ Advanced',
    min: 1600,
    next: 2200,
  },
  {
    label: 'C1 Advanced',
    min: 2200,
    next: 3000,
  },
  {
    label: 'C2 Proficient',
    min: 3000,
    next: 3000,
  },
];

/**
 * @param {number} xp
 * @returns {{ label: string, min: number, next: number, pct: number }}
 */
export function getCEFRLevel(xp) {
  const lv = [...LEVELS].reverse().find((l) => xp >= l.min) || LEVELS[0];
  const range = lv.next - lv.min || 1;
  const pct = Math.min(100, Math.round(((xp - lv.min) / range) * 100));
  return {
    ...lv,
    xp,
    pct,
  };
}

// ─── Daily phrase ─────────────────────────────────────────────────────────────

export const DAILY_PHRASES = [
  {
    en: "What's up?",
    hy: 'Ի՞նչ կա, ի՞նչ չկա:',
    level: 'A2',
    tip: 'Casual greeting — more relaxed than "How are you?". Reply: "Not much!" or "Just chilling!"',
    armenianNote: 'Armenians often say "How?" literally — but "What\'s up?" is purely idiomatic.',
  },
  {
    en: 'I\'m a bit under the weather today.',
    hy: 'Ես այսօր մի փոքր անբավ եմ:',
    level: 'B1',
    tip: '"Under the weather" = feeling slightly ill. Very common British & American English.',
    armenianNote: 'Notice the article "a bit" — Armenian doesn\'t require this filler but English does for softening.',
  },
  {
    en: 'Could you do me a favour?',
    hy: 'Կ٨կparsed eqs inidzh muh vochtar anel?',
    level: 'A2',
    tip: 'A polite way to ask for help. British spelling: "favour"; American: "favor".',
    armenianNote: '"Do me a favour" — note the article "a". Never say "Do me favour."',
  },
  {
    en: "It's on the tip of my tongue.",
    hy: 'Դա իմ լezvы ծայrin e:',
    level: 'B2',
    tip: 'Use this when you almost remember a word but can\'t quite say it.',
    armenianNote: 'This idiom works identically in Armenian! "Lеzvi tsayrіn em" — a rare direct match.',
  },
  {
    en: 'Let\'s touch base later.',
    hy: 'Kkay mij ev kap pahenk:',
    level: 'C1',
    tip: 'Business idiom — "to touch base" = to make brief contact to check in.',
    armenianNote: 'Armenian business culture often says "կapaktsnenk" but "touch base" is the English equivalent.',
  },
  {
    en: "I'm all ears.",
    hy: 'Ամem dum em:',
    level: 'B1',
    tip: 'Means "I\'m listening completely / tell me everything." Great for showing engagement.',
    armenianNote: 'Note: "I\'m all ears" not "I am listening" — idioms can\'t be translated literally.',
  },
  {
    en: 'How do you spell that?',
    hy: 'Aysm inchpecs e kgrvum?',
    level: 'A1',
    tip: 'Essential survival phrase. Use it anytime you don\'t know how a word is written.',
    armenianNote: 'Don\'t say "How write it?" — use "How do you spell...?" with the full question structure.',
  },
  {
    en: "I didn't catch that. Could you repeat, please?",
    hy: 'Ches lsel: Kkay krakneln, khndrem?',
    level: 'A1',
    tip: '"I didn\'t catch that" is softer than "I didn\'t understand" — implies it\'s about hearing, not intelligence.',
    armenianNote: 'Use "Could you" not "Can you" in formal contexts — "Could" is more polite.',
  },
  {
    en: 'Bear with me for a moment.',
    hy: 'Dime varig hambervatsel indzh het:',
    level: 'B2',
    tip: '"Bear with me" = please be patient with me. Common in presentations and phone calls.',
    armenianNote: 'Armenians tend to say "Yerek vayrkyan" (one moment) — "Bear with me" sounds much more professional.',
  },
  {
    en: "It's not rocket science.",
    hy: 'Ays parzel ch\' e:',
    level: 'B2',
    tip: 'Means something is not complicated. Sarcastic tone if said slowly.',
    armenianNote: 'The closest Armenian equivalent is "ays bzhshkutyan ch\' e" but "rocket science" is the English standard.',
  },
  {
    en: 'He has a point.',
    hy: 'Irеn imasal bar ка:',
    level: 'B1',
    tip: 'Means someone made a valid argument. "She has a point" — notice the article "a".',
    armenianNote: 'Article alert: "has A point" — never "has point". Armenians frequently drop this "a".',
  },
  {
    en: "I've been meaning to ask you something.",
    hy: 'Yerkar zhamanakits im uzum er kets mi ban harc tayl:',
    level: 'B1',
    tip: '"Been meaning to" = intended to, but haven\'t done it yet. Shows it was on your mind.',
    armenianNote: 'This uses Present Perfect Continuous — a tense Armenian doesn\'t have directly.',
  },
  {
    en: 'The ball is in your court.',
    hy: 'Hima dzer sharzhe:',
    level: 'C1',
    tip: 'From tennis — it\'s your turn to act or make a decision.',
    armenianNote: 'Sport idioms are very common in English. Learn them in context, not word by word.',
  },
  {
    en: 'I\'m swamped at the moment.',
    hy: 'Ayst pake shad ashkhatum em:',
    level: 'B2',
    tip: '"Swamped" = very busy, overwhelmed with work. More vivid than "I\'m busy".',
    armenianNote: 'Armenians often say "shad ashkhatum em" (very busy) — "swamped" adds emotional intensity.',
  },
  {
    en: 'That rings a bell.',
    hy: 'Ays kich tanich e indzh hamar:',
    level: 'B2',
    tip: 'Means something vaguely reminds you of something you know.',
    armenianNote: 'Don\'t say "this calls my bell" — it\'s "rings A bell" with the article.',
  },
  {
    en: 'Can I pick your brain for a minute?',
    hy: 'Kkay mu vayrkyan khanutsel dzez kizh harc tayl?',
    level: 'C1',
    tip: 'Means "may I ask for your expert opinion/advice?" Very common in professional settings.',
    armenianNote: '"Pick your brain" — don\'t try to translate this literally. Learn it as a fixed chunk.',
  },
  {
    en: "I'm on the fence about it.",
    hy: 'Yet voroshum em ays masin:',
    level: 'B2',
    tip: 'Means you haven\'t made a decision yet / you\'re undecided.',
    armenianNote: '"On the fence" has no Armenian idiom equivalent — translate the meaning, not the words.',
  },
  {
    en: 'It went in one ear and out the other.',
    hy: 'Mi levazum mntsets, mekin lavazun yrets:',
    level: 'B2',
    tip: 'Means information wasn\'t absorbed or remembered at all.',
    armenianNote: 'Armenian has a similar phrase! "Мi akhov mtes, mekin akhov yrets" — a nice connection to make.',
  },
  {
    en: "I'll get back to you on that.",
    hy: 'Aysor vershaberi dzez kayel em:',
    level: 'B1',
    tip: 'Professional way to say "I need time to answer, I\'ll respond later."',
    armenianNote: 'Very important in business English. Never say "I will answer to you later" — say "get back to you".',
  },
  {
    en: 'She gave a compelling argument.',
    hy: 'Na shad hamozich pastarkelutyun bere:',
    level: 'C1',
    tip: '"Compelling" = very convincing, interesting. Elevated academic/professional vocab.',
    armenianNote: 'Note the article "a compelling argument" — not "compelling argument". The "a" is essential.',
  },
  {
    en: "Don't beat around the bush.",
    hy: 'Mer baner mи asek ughigh:',
    level: 'B2',
    tip: 'Means: stop avoiding the main point and say what you really mean.',
    armenianNote: 'Armenian idiom: "Patmutyun mi sареk" (don\'t tell a story) is similar in meaning.',
  },
  {
    en: 'She speaks fluent English.',
    hy: 'Na xosum e angleren herrum:',
    level: 'A2',
    tip: 'Notice the word order: speaks + fluent + language. NOT "She fluent English speaks."',
    armenianNote: 'Armenian SOV word order often causes Armenians to put the verb last — English is SVO: Subject-Verb-Object.',
  },
  {
    en: 'I was wondering if you could help me.',
    hy: 'Mer mтаtsum ei, ari el karoch es indzh odzanel:',
    level: 'B1',
    tip: '"I was wondering if..." is the most polite way to make a request. Much softer than "Can you help me?"',
    armenianNote: 'The past continuous "was wondering" makes requests softer — a critical politeness tool in English.',
  },
  {
    en: "That's easier said than done.",
    hy: 'Asel asvel e, bayts anelov dur ch\'e:',
    level: 'B1',
    tip: 'Use this when someone suggests something simple but the reality is more difficult.',
    armenianNote: 'Armenian has "Ashkharhum dzer qayleri vray char en" but "easier said than done" is THE idiom to know.',
  },
  {
    en: "I can't make heads or tails of this.",
    hy: 'Vers chers voch mek ban haskanum em:',
    level: 'C1',
    tip: 'Means you can\'t understand or make sense of something at all.',
    armenianNote: 'This expression is 100% idiomatic — impossible to guess from individual words. Learn as a unit.',
  },
  {
    en: 'We\'re in the same boat.',
    hy: 'Menk nuyн vichakum enk:',
    level: 'B1',
    tip: 'Means two or more people are in the same difficult situation.',
    armenianNote: 'Armenian equivalent: "Нuyн kachumne enk" (we\'re in the same cart) — boat vs cart, same concept!',
  },
  {
    en: 'On second thought, let\'s go for it.',
    hy: 'Verakardzelov, arеnk ays gdrenk:',
    level: 'B2',
    tip: '"On second thought" = after reconsidering. Shows you changed your mind.',
    armenianNote: '"Second thought" uses the ordinal — "second", not "two". Ordinals in English are a common Armenian learner error.',
  },
  {
    en: "You've got a lot on your plate.",
    hy: 'Qez shad ban ka anelov:',
    level: 'B1',
    tip: 'Means someone has many responsibilities or tasks right now.',
    armenianNote: 'Plate = food metaphor for workload. Very visual idiom — great for A2+ learners to memorise.',
  },
  {
    en: "I'll take it with a grain of salt.",
    hy: 'Ays chi havatam lriv:',
    level: 'C1',
    tip: 'Means you\'re sceptical about some information and won\'t fully believe it.',
    armenianNote: 'One of the most useful C1 idioms for scepticism. Armenian has no direct equivalent.',
  },
  {
    en: 'Let\'s call it a day.',
    hy: 'Avartachenk aydorhva hamar:',
    level: 'A2',
    tip: 'Means: let\'s stop working / finish for today. Perfect phrase to end a meeting or class.',
    armenianNote: '"Call it a day" — notice the article "a day". Essential phrase for any workplace situation.',
  },
];

/**
 * Returns today's rotating daily phrase (cycles by day of year).
 * @returns {typeof DAILY_PHRASES[0]}
 */
export function getDailyPhrase() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = new Date() - start;
  const dayOfYear = Math.floor(diff / 86400000);
  return DAILY_PHRASES[dayOfYear % DAILY_PHRASES.length];
}
