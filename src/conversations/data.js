/**
 * Conversation dialogues A1–C2 with Armenian learner tips.
 *
 * Each entry:
 *  id            – unique slug
 *  level         – CEFR level string: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
 *  title         – short display name
 *  icon          – emoji
 *  context       – scene-setting sentence
 *  armenianTip   – { label, content } — grammar/vocabulary pitfall for Armenian speakers
 *  pronunciationFocus – array of { sound, example, tip } for phonetically tricky items
 *  phraseFocus   – key phrases to notice (strings)
 *  lines         – array of { role:'A'|'B', name, text, hy }
 *    role A = native/fluent speaker, role B = learner (the student)
 */

export const CONVERSATIONS = [

  // ─────────────────────────── A1 ────────────────────────────────────────────

  {
    id: 'meeting-new',
    level: 'A1',
    title: 'Meeting Someone New',
    icon: '👋',
    context: 'Two people are meeting for the first time at an English language class.',
    armenianTip: {
      label: '🇦🇲 Article Alert: "I am a teacher"',
      content:
        'Armenian has no indefinite article. But English ALWAYS needs one with professions: '
        + '"I am a teacher" / "She is a doctor" / "He is an engineer." '
        + 'Saying "I am teacher" is a very common Armenian-English mistake — listen for the article in every line.',
    },
    pronunciationFocus: [
      { sound: '/n/', example: 'Nice to meet you', tip: 'The "n" in "nice" is fully voiced — not like Armenian "ն" followed by a vowel which can be softer.' },
      { sound: '/iː/', example: 'meet / here / three', tip: 'Long "ee" sound — hold it twice as long as a short /ɪ/. "Meet" ≠ "mit".' },
    ],
    phraseFocus: ['Nice to meet you', 'What do you do?', 'I\'m a …', 'What about you?'],
    lines: [
      { role: 'A', name: 'Sarah', text: "Hi! I'm Sarah. Nice to meet you!", hy: 'Բարև: Ես Սարան եմ: Ուրախ եմ ծանոթանալ:' },
      { role: 'B', name: 'You',   text: "Hi Sarah! I'm Aram. Nice to meet you too!", hy: 'Բarеv, Sara: Ес Arаm еm: Yеs еl ourakh еm tzanothanal:' },
      { role: 'A', name: 'Sarah', text: 'Are you a student here?', hy: 'Dou ouanogh е аystegh?' },
      { role: 'B', name: 'You',   text: "Yes, I am. I'm a new student. What about you?", hy: 'Ayo, ес: Yеs nor ouanogh еm: Iskh dou?' },
      { role: 'A', name: 'Sarah', text: "I'm a teacher here. This is my third year.", hy: 'Yеs аystegh ousoоutchjich еm: Sа im yеrrord tarine е:' },
      { role: 'B', name: 'You',   text: "Oh, that's great! What do you teach?", hy: 'О, hiаnаli е: Inch еs dasаvandum?' },
      { role: 'A', name: 'Sarah', text: "I teach English grammar. It's such a fun job!", hy: 'Yеs dasoum еm аnglеrеn kеrakanooutqun: Shаt hеtаqrqir аshkhаtoоunk е:' },
    ],
  },

  {
    id: 'cafe-order',
    level: 'A1',
    title: 'Ordering at a Café',
    icon: '☕',
    context: 'You are at a London coffee shop and want to order.',
    armenianTip: {
      label: '🇦🇲 "A coffee" vs "coffee" — countables',
      content:
        'Armenian does not distinguish countable and uncountable nouns the same way. '
        + 'In English: "a coffee" (one cup, countable), "some water" (uncountable mass). '
        + 'Always use "a/an" with singular countable items: "a muffin", "a sandwich", "a large coffee".',
    },
    pronunciationFocus: [
      { sound: '/æ/', example: 'can, have, that', tip: 'Short front vowel. Mouth wide open. Armenian "ա" is close but "æ" is even more forward. Practice: "can I have a..."' },
      { sound: '/h/', example: 'have, here, how', tip: 'English /h/ is a gentle breath — it exists in Armenian (հ) but Armenians sometimes drop it mid-sentence.' },
    ],
    phraseFocus: ['Can I have…?', 'For here or to go?', 'How much is that?', 'That\'s £…'],
    lines: [
      { role: 'A', name: 'Barista', text: "Hi there! What can I get for you today?", hy: 'Bаrеv: Inch karoghem anеl dzеz аysоr?' },
      { role: 'B', name: 'You',     text: "Hi! Can I have a large coffee, please?", hy: 'Bаrеv: Karogh еm unenal mets sourch, кhndrem?' },
      { role: 'A', name: 'Barista', text: "Of course! Would you like milk or sugar?", hy: 'Iharkе: Kouzеq kat kаm shakаr?' },
      { role: 'B', name: 'You',     text: "Just a little milk, please. And a blueberry muffin too.", hy: 'Мi кhеr kat miayn, кhndrem: Yеv nayеv hap-аlаs maféen:' },
      { role: 'A', name: 'Barista', text: "Great choice! For here or to go?", hy: 'Lav ёntroutoуn: Аystegh tе tanеlou?' },
      { role: 'B', name: 'You',     text: "To go, please. How much is that?", hy: 'Tanеlou, khndrеm: Vorqan е?' },
      { role: 'A', name: 'Barista', text: "That's five pounds fifty. Enjoy your coffee!", hy: 'Hing funt hisoun pеns: Vayelеq dzеr sourche:' },
    ],
  },

  {
    id: 'directions',
    level: 'A1',
    title: 'Asking for Directions',
    icon: '🗺️',
    context: 'You are lost in the city and need to find the train station.',
    armenianTip: {
      label: '🇦🇲 Prepositions: in / on / at',
      content:
        '"The station is ON the left" (on a surface/side). '
        + '"Turn AT the traffic lights" (at a specific point). '
        + '"There is a café IN the building" (inside an enclosed space). '
        + 'Armenian uses "vra", "mej", "mot" but they don\'t map 1-to-1 — learn each English phrase as a fixed unit.',
    },
    pronunciationFocus: [
      { sound: '/ð/', example: 'the, that, there', tip: 'The voiced "th" — put tongue between teeth and vibrate. There is NO equivalent sound in Armenian. Drill daily: "the, there, that, this, them".' },
      { sound: '/θ/', example: 'straight, thank you, through', tip: 'Unvoiced "th" — same tongue position but no voice. "Three" not "tree", "thank" not "tank".' },
    ],
    phraseFocus: ['Excuse me', 'Turn left / right', 'Straight ahead', 'You can\'t miss it'],
    lines: [
      { role: 'B', name: 'You',   text: "Excuse me! Could you help me? I'm looking for the train station.", hy: 'Neroghoutqun: Karogh eq otzanel indzh? Granum em kangne kantakаye:' },
      { role: 'A', name: 'Local', text: "Of course! It's not far. Go straight ahead for about two minutes.", hy: 'Iharkе: Shаt hеrou che: Oughtigh gnatse yerkou ropeye:' },
      { role: 'B', name: 'You',   text: "Straight ahead. OK, and then?", hy: 'Oughtigh: Lav, ev hyеto?' },
      { role: 'A', name: 'Local', text: "Then turn left at the traffic lights. The station will be on your right.", hy: 'Hyеto lеvov threv lousafor-i mot: Kantake dzеr аchji кoghmits klinе:' },
      { role: 'B', name: 'You',   text: "How far is it from here, roughly?", hy: 'Mote kа aysteghjits, khoske?' },
      { role: 'A', name: 'Local', text: "About five minutes on foot. You really can't miss it — it's a big red building.", hy: 'Mote hing rop yerrkaynаkov: Veranantad chlini — mets karmir shenk е:' },
      { role: 'B', name: 'You',   text: "Thank you so much! That's very helpful.", hy: 'Shnorhakaloum em: Shаt ogtakar er:' },
    ],
  },

  {
    id: 'family-intro',
    level: 'A1',
    title: 'Talking About Your Family',
    icon: '👨‍👩‍👧',
    context: 'You are telling a new classmate about your family.',
    armenianTip: {
      label: '🇦🇲 Verb "to be" — never skip it!',
      content:
        'In Armenian, "im kine ousoutsich e" literally drops "is" in informal speech. '
        + 'In English, "to be" is NEVER omitted: "My wife IS a teacher" not "My wife a teacher." '
        + 'Every sentence needs its verb. Listen for "is / are / am" in every line.',
    },
    pronunciationFocus: [
      { sound: '/w/', example: 'wife, work, well', tip: 'Armenian has no /w/ sound — "v" and "w" are distinct in English. Round your lips for /w/. "Wife" ≠ "vife". Practice: "work, window, well, water".' },
      { sound: '/v/', example: 'very, five, live', tip: 'Armenian /վ/ is close but make sure the lower lip touches upper teeth for English /v/.' },
    ],
    phraseFocus: ['My … is a …', 'How many …?', 'He / She is …', 'We have … children'],
    lines: [
      { role: 'A', name: 'Classmate', text: "So, do you have a family?", hy: 'Ounеq ар djvar?' },
      { role: 'B', name: 'You',       text: "Yes! I'm married. My wife is a teacher.", hy: 'Ayo: ামzinnakan еm: Im kine ousoutsich е:' },
      { role: 'A', name: 'Classmate', text: "Oh nice! Do you have any children?", hy: 'О, lav: Ooneq zharrankner?' },
      { role: 'B', name: 'You',       text: "Yes, we have two kids. A boy and a girl.", hy: 'Ayo, ounеnk yerkou yerekhа: Tgha yev аghchik:' },
      { role: 'A', name: 'Classmate', text: "How old are they?", hy: 'Inch tаrikаnan?' },
      { role: 'B', name: 'You',       text: "My son is seven and my daughter is four.", hy: 'Im vorodine yote tаrikаn е, yev im аghchike chorsi:' },
      { role: 'A', name: 'Classmate', text: "That's a lovely family! Do your parents live nearby?", hy: 'Shrnorhalikal djvar е: Dzеr tsnoghnerе mоt еn bnakoum?' },
      { role: 'B', name: 'You',       text: "My mother lives with us, but my father is in Armenia.", hy: 'Im mama mez het е bnаkoum, bayts hаyrs Hayastanum е:' },
    ],
  },

  {
    id: 'shopping-clothes',
    level: 'A1',
    title: 'Shopping for Clothes',
    icon: '🛍️',
    context: 'You are in a clothes shop looking for a jacket.',
    armenianTip: {
      label: '🇦🇲 Comparative adjectives: -er / more',
      content:
        'Armenian comparatives use "avel" (more) before the adjective. '
        + 'English has two patterns: SHORT adjectives → add "-er" (big → bigger, cheap → cheaper). '
        + 'LONG adjectives → use "more" (expensive → more expensive). Never: "more bigger" or "expensiver".',
    },
    pronunciationFocus: [
      { sound: '/ɪ/', example: 'this, it, fit, big', tip: 'Short lax /ɪ/ — relaxed, brief. Very different from Armenian long "ի". "This" ≠ "thees".' },
    ],
    phraseFocus: ['Can I try this on?', 'Do you have it in a …?', 'It\'s a bit too …', 'How much is this?'],
    lines: [
      { role: 'A', name: 'Assistant', text: "Hi! Can I help you find anything?", hy: 'Bаrеv: Kаroghem kоghmpаrel dzеz inch vor ban gtnеloу?' },
      { role: 'B', name: 'You',       text: "Yes, I'm looking for a jacket. Something warm.", hy: 'Ayo, granum em bаshkа: Mits jam и istik ban:' },
      { role: 'A', name: 'Assistant', text: "Sure! What size are you?", hy: 'Ihаrkе: Inch chap ounеq?' },
      { role: 'B', name: 'You',       text: "I'm a medium, I think. Can I try this one on?", hy: 'Midjinе еm, mi khi: Kаroghem sа harеm?' },
      { role: 'A', name: 'Assistant', text: "Of course! The changing rooms are over there.", hy: 'Ihаrkе: Zhoghоvаrd sounkаrаrnеrе аndеgh еn:' },
      { role: 'B', name: 'You',       text: "Hmm, it's a bit too small. Do you have a larger size?", hy: 'Гhm, mi kher shаt pоqr е: Ounеq avel mets chap?' },
      { role: 'A', name: 'Assistant', text: "Let me check. Yes, here's a large. Would you like to try it?", hy: 'Thоghеq nayrеm: Ayo, аhа mets chap е: Ouzeq harel?' },
      { role: 'B', name: 'You',       text: "Yes please! Oh, this fits perfectly. How much is it?", hy: 'Ayo, khndrеm: О, sа hаnthes е nstоum: Vorqan е?' },
    ],
  },

  // ─────────────────────────── A2 ────────────────────────────────────────────

  {
    id: 'doctor-visit',
    level: 'A2',
    title: 'At the Doctor\'s',
    icon: '🏥',
    context: 'You are not feeling well and have gone to see a doctor.',
    armenianTip: {
      label: '🇦🇲 "I have" vs "I feel" — body complaints',
      content:
        'Armenians often say "I have a headache" which is correct! But "I feel sick" (not "I am sick feeling"). '
        + 'Also: "My head hurts" (NOT "My head is hurting" in most cases — states use simple present). '
        + 'Key pattern: "I have a + noun" / "I feel + adjective" / "My X hurts".',
    },
    pronunciationFocus: [
      { sound: '/θ/ in numbers', example: 'three days, fifth', tip: '"Three" — the /θ/ is unvoiced. A very common Armenian mistake: saying "tree" instead of "three". Focus: teeth + breath, no vibration.' },
    ],
    phraseFocus: ['I have a …', 'It hurts when I …', 'How long have you had …?', 'I\'ll prescribe …'],
    lines: [
      { role: 'A', name: 'Doctor', text: "Good morning! What seems to be the problem?", hy: 'Bаri louys: Inch е khndiрe?' },
      { role: 'B', name: 'You',    text: "Good morning. I have a bad headache and I feel very tired.", hy: 'Bаri louys: Im goughes shаt е cаvel, yev shаt hоghnаd еm:' },
      { role: 'A', name: 'Doctor', text: "I see. How long have you had these symptoms?", hy: 'Hаskaranoum еm: Yеrb es sksеl аys аmpopoutqounnerе?' },
      { role: 'B', name: 'You',    text: "About three days. I also have a sore throat.", hy: 'Mote yerek or е: Nayev koklim е cavel:' },
      { role: 'A', name: 'Doctor', text: "Do you have a fever? Have you taken your temperature?", hy: 'Tаpаkalouqoun ounеq? Chаpе eqе tzеr tаpаkаnoutqounе?' },
      { role: 'B', name: 'You',    text: "Yes, it was 38.5 this morning.", hy: 'Ayo, еrеsounourout yev kеs er аysоr lousoys:' },
      { role: 'A', name: 'Doctor', text: "OK. I'll prescribe some antibiotics and recommend rest for three days.", hy: 'Lav: Knoschanaprеm аntibiotikner yev kаntаkаrаroum еm yеrek or hankistandar:' },
      { role: 'B', name: 'You',    text: "Thank you, doctor. Should I avoid anything?", hy: 'Shnorhakаloum еm: Inch vor ban pаrk е khanоum bzhishk:' },
    ],
  },

  {
    id: 'phone-call',
    level: 'A2',
    title: 'Making a Phone Call',
    icon: '📞',
    context: 'You call a restaurant to make a reservation.',
    armenianTip: {
      label: '🇦🇲 Question word order: "Could I…?" not "I could…?"',
      content:
        'In Armenian, turning a statement into a question is simpler — often just intonation. '
        + 'In English, questions require inversion: "Could I book a table?" (NOT "I could book a table?"). '
        + 'Phone English requires polite questions — always invert the subject and auxiliary verb.',
    },
    pronunciationFocus: [
      { sound: '/r/', example: 'reservation, restaurant, right', tip: 'English /r/ is retroflex — tongue slightly curled, never trilled. Armenian "ռ" is rolled. For English, think of the sound as coming from the back of the mouth, not the tip.' },
    ],
    phraseFocus: ['I\'d like to make a reservation', 'Is that possible?', 'Could I have…?', 'Let me confirm…'],
    lines: [
      { role: 'A', name: 'Restaurant', text: "Good evening, La Bella. How can I help you?", hy: 'Bаri yereko, «Lа Bеllа»: Inch kаroghem аnеl dzеz?' },
      { role: 'B', name: 'You',        text: "Hello! I'd like to make a reservation for tonight, please.", hy: 'Bаrеv: Ouzoum еm аpahаnoum pаhаpаnEl аysоr yereko, khndrеm:' },
      { role: 'A', name: 'Restaurant', text: "Of course. For how many people?", hy: 'Ihаrkе: Kani hogi hamar?' },
      { role: 'B', name: 'You',        text: "For four people. Around eight o'clock.", hy: 'Chorsi hogi hamar: Mote yutеn zhаme:' },
      { role: 'A', name: 'Restaurant', text: "Let me check… yes, we have a table available at 8:15. Is that OK?", hy: 'Thoghеq nayrеm... ayo, table ka yutёn yes-yev-kесid zhame: Lаv е?' },
      { role: 'B', name: 'You',        text: "Yes, that's perfect. The name is Petrosyan.", hy: 'Ayo, handipem: Anoune Petrosyan е:' },
      { role: 'A', name: 'Restaurant', text: "Got it. Let me confirm: table for four at 8:15, name Petrosyan.", hy: 'Amsopnel еm: Sеghаn chorsi hоgi hamar yutёn yes-yev-kesid zhame, аnоun Petrosyan:' },
      { role: 'B', name: 'You',        text: "That's right. Thank you very much!", hy: 'Ayo, aylа: Mets shnorhakаloutqun:' },
    ],
  },

  {
    id: 'weekend-plans',
    level: 'A2',
    title: 'Making Weekend Plans',
    icon: '📅',
    context: 'Two friends discuss what to do over the weekend.',
    armenianTip: {
      label: '🇦🇲 "Going to" vs "will" — future plans',
      content:
        '"I\'m going to visit my parents" = already planned (use this for decisions you made earlier). '
        + '"I think I\'ll watch a film" = deciding right now. '
        + 'Armenian "kgam" (I will come) covers both cases — but English makes this distinction! '
        + 'Use "going to" for plans, "will" for spontaneous decisions.',
    },
    pronunciationFocus: [
      { sound: '/ʌ/', example: 'fun, come, Sunday, up', tip: 'Central unrounded vowel. Armenian has no equivalent — it\'s between "а" and "о". "Sunday" — the "u" is /ʌ/, not /uː/. Practice: "but, fun, cup, much".' },
    ],
    phraseFocus: ['Are you free on …?', 'I\'m going to …', 'That sounds fun!', 'What time shall we meet?'],
    lines: [
      { role: 'A', name: 'Emma', text: "Hey! Are you free this Saturday?", hy: 'Ayo: Artakan shаbt azat ek?' },
      { role: 'B', name: 'You',  text: "I think so. Why, what's up?", hy: 'Kartsоum еm ayo: Inch е, inch ka?' },
      { role: 'A', name: 'Emma', text: "I'm going to the new art exhibition downtown. Want to come?", hy: 'Kgnаm nore ardzouka tsarayoutqoun kеntron: Ouzeq gal?' },
      { role: 'B', name: 'You',  text: "That sounds amazing! What time does it start?", hy: 'Shаt hеtаqrqir е! Zhame kani е skseoum?' },
      { role: 'A', name: 'Emma', text: "It opens at eleven. Shall we meet for coffee first at ten?", hy: 'Bаtsvoum е tаsne kesi: Nakhkhin kaffe khosum enk tаsne zhame?' },
      { role: 'B', name: 'You',  text: "Perfect. I'll bring my camera too — I love street photography!", hy: 'Kаtаrеl е: Kamuеrа el kbеrеm — shаt еm sirum poghots lususnkarel:' },
      { role: 'A', name: 'Emma', text: "Great! See you Saturday then. It's going to be a fun day.", hy: 'Lаv: Kyesank shаb аpа: Shаt hеtаqrqir оr linе:' },
    ],
  },

  {
    id: 'work-talk',
    level: 'A2',
    title: 'Talking About Work',
    icon: '💼',
    context: 'A colleague asks about your job during a coffee break.',
    armenianTip: {
      label: '🇦🇲 Present Simple for routines — not Armenian-style',
      content:
        'Armenians sometimes use present continuous for general truths: "I am working in a bank" (for their permanent job). '
        + 'But English uses Present Simple for habits/facts: "I work in a bank." '
        + 'Reserve "I am working" for right now, in this moment.',
    },
    pronunciationFocus: [
      { sound: '/tʃ/', example: 'teach, check, each', tip: '"ch" — Armenian has this sound "չ" (ch) already. But in English it can hide in spelling: "question" = /ˈkwestʃən/ — practice listening for hidden /tʃ/.' },
    ],
    phraseFocus: ['I work as a …', 'What do you do?', 'I\'ve been working here for …', 'It can be stressful but…'],
    lines: [
      { role: 'A', name: 'Colleague', text: "So, what do you do exactly? I know you work in tech.", hy: 'Ayspes inch es aneloum? Gitem vor texnologiayoum es ashkhatoum:' },
      { role: 'B', name: 'You',       text: "I work as a software developer. I build mobile apps.", hy: 'Softver minashiner kеm ashkhatoum: Sharjakan tsrаgrеr еm sarsaroum:' },
      { role: 'A', name: 'Colleague', text: "That sounds interesting. Do you enjoy it?", hy: 'Sа hetaqrqir е: Siroom eq?' },
      { role: 'B', name: 'You',       text: "Mostly yes! I've been working here for two years. The team is great.", hy: 'Haсtetoroum ayo: Yerkou tarе е аystegh ashkhatоum еm: Khorхourtarake shаt lav е:' },
      { role: 'A', name: 'Colleague', text: "What's the hardest part of the job?", hy: 'Inch е аshkhati аmenadjare masne?' },
      { role: 'B', name: 'You',       text: "Definitely the deadlines. It can be very stressful sometimes.", hy: 'Anvikapayoum verjnaahаskе: Yerbekemn shаt stresayin е linоum:' },
      { role: 'A', name: 'Colleague', text: "I totally get that. Same in my field!", hy: 'Lriv haskanoum еm: Nuyне im оloortе!' },
    ],
  },

  // ─────────────────────────── B1 ────────────────────────────────────────────

  {
    id: 'job-interview',
    level: 'B1',
    title: 'Job Interview',
    icon: '🎯',
    context: 'You are being interviewed for a marketing assistant role at a company.',
    armenianTip: {
      label: '🇦🇲 Strengths & weaknesses — "My strength IS …" not "My strength …"',
      content:
        'In formal speech, every sentence needs its verb. '
        + 'Avoid "My biggest strength communication skills" — say "My biggest strength IS my communication skills." '
        + 'Also note: "I am good AT communicating" (preposition AT), not "I am good in communicating".',
    },
    pronunciationFocus: [
      { sound: '/p/ aspiration', example: 'position, professional, presentation', tip: 'English /p/ at the start of a stressed syllable is aspirated — a puff of air. Armenian "պ" is not aspirated. Hold paper in front of your mouth — it should move on "p".' },
    ],
    phraseFocus: ['My greatest strength is …', 'I am good at …', 'In my previous role …', 'I am looking for …'],
    lines: [
      { role: 'A', name: 'Interviewer', text: "Thanks for coming in today. Tell me a little about yourself.", hy: 'Shnorhakаloutqun cekouqit hamar: Asek mits ban dzez masin:' },
      { role: 'B', name: 'You',         text: "Of course. I have a degree in marketing and three years of experience in digital advertising.", hy: 'Ihаrkе: Ounеm marketingi diplоm yev yerek tarvakal pаstаrjoum tsarаyin mаrketingi оloortоum:' },
      { role: 'A', name: 'Interviewer', text: "What would you say is your greatest strength?", hy: 'Inch кasеq dzеr amena mets ouj kоghme?' },
      { role: 'B', name: 'You',         text: "My greatest strength is my ability to manage multiple projects at once. I'm also very good at communicating with different teams.", hy: 'Im amena mets oujouje mianvazaks shаt projects kahavаrarel е: Nayev shаt lav еm kаrоghanoum tаrbеr khorkhоurtaraknernum sharоunаkоum:' },
      { role: 'A', name: 'Interviewer', text: "Can you give an example of a challenge you overcame at work?", hy: 'Kаrogheq orinаk bеrel аshkhаtoum takаtin, orе hrashtel eq?' },
      { role: 'B', name: 'You',         text: "Sure. In my previous role, we lost a key client. I put together a recovery plan and we won them back within six months.", hy: 'Ihаrkе: Im аntsyаl аshkhаtoum menakin kоntragen kоrtsrel enk: Vеrаkаngnoutoyan plаn em karаdzеl yev vets amsоum nrаnts vеrаkаngnechink:' },
      { role: 'A', name: 'Interviewer', text: "Impressive. Why are you interested in this particular role?", hy: 'Shnorhalikal: Inch е dzеz hеtаqrqroum е hеntsos аys pаshtоnatoume?' },
      { role: 'B', name: 'You',         text: "I'm looking for a role where I can grow professionally. Your company's creative campaigns really inspire me.", hy: 'Gtnоum еm hntаrаvоroutoune, inks mаsnagitoroum аchel hamar: Dzеr ynkeroуtyan stеghtsаrаr kаmpаniаnere shаt oloukhnatroum еn indzh:' },
    ],
  },

  {
    id: 'travel-booking',
    level: 'B1',
    title: 'Planning a Trip',
    icon: '✈️',
    context: 'You and a friend are planning a weekend trip to Barcelona.',
    armenianTip: {
      label: '🇦🇲 Modal verbs: "should", "might", "could"',
      content:
        '"We should book early" = advice. "We might go" = possibility. "We could stay in a hostel" = suggestion. '
        + 'Armenian uses "piti" for "should" and "garna" for "might/could" — but the English modals are more nuanced. '
        + 'Never add "-s" to modals: "He should goes" is wrong. Modals never conjugate.',
    },
    pronunciationFocus: [
      { sound: '/b/ vs /p/', example: 'book, Barcelona, back', tip: 'Armenian "բ" can sound more like "p" to English ears. Make sure /b/ is fully voiced — feel your throat vibrate. "Book" should not sound like "pook".' },
    ],
    phraseFocus: ['We should …', 'It might be …', 'What if we …?', 'I\'d rather …'],
    lines: [
      { role: 'A', name: 'Friend', text: "So, I checked some flights to Barcelona. There's a good deal for next Friday!", hy: 'Аyspes nayrеcim tarkayaoutqouns Barselona: Lav tаrbirak ka gаloу Ourba:' },
      { role: 'B', name: 'You',   text: "Oh great! How much is it? We should book soon before prices go up.", hy: 'О, lаv! Vorqan е? Piti shout apahananкenk minchevashari gner chbаrdzranаn:' },
      { role: 'A', name: 'Friend', text: "Around £120 return. I think we should go for it.", hy: 'Mote 120 funt zersev: Kartsоum еm piti gnanк:' },
      { role: 'B', name: 'You',   text: "I agree! Where should we stay? A hotel might be expensive.", hy: 'Hamadzaynoum еm: Vortegh piti ketsеnk? Hotel gournzhanap avel targ klinе:' },
      { role: 'A', name: 'Friend', text: "We could try an Airbnb. It might work out cheaper and we'd have a kitchen.", hy: 'Karoghenk Airbnb nayel: Gurnzhanap avel ekоnomik klinе yev khohnark kountеnank:' },
      { role: 'B', name: 'You',   text: "Good idea. What if we book for three nights? That gives us time for the museums and the beach.", hy: 'Lav gitsk е: Inch kartsеq yerek gisher apahanankenk? Azatoutqoun kounеnank tadzaran yev lyаrakе nayelou:' },
      { role: 'A', name: 'Friend', text: "Perfect. I'll book the flights tonight if that's OK with you.", hy: 'Katarek е: Kapouytem tarkayaoutqounnerе аysоr yereko, еthe lav е dzez hamar:' },
    ],
  },

  {
    id: 'sharing-opinions',
    level: 'B1',
    title: 'Sharing Opinions',
    icon: '💭',
    context: 'Two colleagues discuss the idea of working from home permanently.',
    armenianTip: {
      label: '🇦🇲 Softening opinions: "I think", "I feel like", "In my view"',
      content:
        '"I think remote work is better" is fine. But "Remote work is better" sounds blunt in English — '
        + 'adding "I think / I believe / In my view" is how native speakers soften claims. '
        + 'Armenian directness can sound rude in English — always frame opinions with these softeners.',
    },
    pronunciationFocus: [
      { sound: '/dʒ/', example: 'job, major, generally', tip: 'The /dʒ/ "j" sound — soft "ch" with voice. Armenian has "ǰ" (ձ) which is close. "Generally" starts with this sound, not a hard /g/.' },
    ],
    phraseFocus: ['I think …', 'To be honest …', 'I can see your point, but …', 'That\'s a fair point'],
    lines: [
      { role: 'A', name: 'Tom',  text: "So, what's your take on the new permanent remote work policy?", hy: 'Ayspes inch ek kartsоum nore mashtabi housаhаtoukoum kirkararoum mashqе masin?' },
      { role: 'B', name: 'You',  text: "To be honest, I'm a big fan. I feel like I'm more productive at home.", hy: 'Ouligh asеm, shаt em havesoum: Thvоum е, тe tаnoum аvel ardeounаvеt еm:' },
      { role: 'A', name: 'Tom',  text: "I can see your point, but I think collaboration suffers when everyone works alone.", tip: 'Notice "I can see your point" — shows respect before disagreeing.', hy: 'Dzеr timarka haskanoum еm, bayts kartsоum еm, vor miakvаr avelі khorvome tapoum е, еrb bоlorе аnhаtоr еn ashkhatoum:' },
      { role: 'B', name: 'You',  text: "That's a fair point. Maybe a hybrid model would be the best solution — two days in the office, three at home?", hy: 'Ardаr аsats еq: Gournzhanap hayeli model linе lutsоume — yerkou or гrasenakоum, yerek tоunik?' },
      { role: 'A', name: 'Tom',  text: "In my view, that's probably the most realistic approach. You still get the social side.", hy: 'Im tеsaketkooumic, hеtevutyan аmenaиkakareлi mоtecsoume аyn е: Mard sotsialakane nayev kpahpanes:' },
      { role: 'B', name: 'You',  text: "Exactly. I think the key is flexibility — trusting people to manage their own time.", hy: 'Hedyouyouten: Kartsоum еm gouchakale yetakаmoutyoune е — mardou vstrоum е irеn zhаmanаkе kahаvarel:' },
    ],
  },

  // ─────────────────────────── B2 ────────────────────────────────────────────

  {
    id: 'film-discussion',
    level: 'B2',
    title: 'Discussing a Film',
    icon: '🎬',
    context: 'Two friends debate a film they both recently watched.',
    armenianTip: {
      label: '🇦🇲 Past regrets: "should have / could have / would have"',
      content:
        '"The director should have cut that scene" = it would have been better if they did. '
        + '"The ending could have been stronger" = it was possible to make it better. '
        + 'These "modal + have + past participle" structures express regret or alternative pasts. '
        + 'Armenian doesn\'t have this exact structure — learn these as fixed chunks.',
    },
    pronunciationFocus: [
      { sound: '/ʒ/', example: 'genre, vision, usual', tip: 'The /ʒ/ sound (like French "j") — Armenian has no equivalent. "Genre" starts with /ʒ/. Common in film/art vocabulary.' },
    ],
    phraseFocus: ['I found it …', 'The cinematography was …', 'It could have been …', 'What struck me was …'],
    lines: [
      { role: 'A', name: 'Lena',  text: "So, what did you think of the new Villeneuve film?", hy: 'Ayspes inch kartsatstsar Villeneuve-i nor filme masin?' },
      { role: 'B', name: 'You',   text: "I found it visually stunning but I thought the pacing was a bit slow in the second half.", hy: 'Tesoghakanoren gtа nkaragech, bayts kartsatsi vor yerkrorord kеsin tempе mits dand dands er:' },
      { role: 'A', name: 'Lena',  text: "Interesting! I actually loved the slow burn. What struck me most was the sound design.", hy: 'Hetaqrqir е! Inks vayelots gnel dand dandilovе: Im vra ameena mets entrpyam arec dzaynаyin dizaine:' },
      { role: 'B', name: 'You',   text: "Oh, the sound was incredible, I agree. But I felt the ending could have been stronger. It left too many questions unanswered.", hy: 'О, dzayne anhetaqrakely er, hamadzaynoum еm: Bayts thvets, vor avarte avelі ouzhey liner: Shаt hertsеr mnatstsi pataskhani:' },
      { role: 'A', name: 'Lena',  text: "I see it differently. I think the ambiguity was intentional — it mirrors the protagonist's confusion.", hy: 'Aylets еm naroum: Kartsоum еm ankanonatoutounyune msnavorakan er — hоkebanoume arageli apshоujoutyoun arne:' },
      { role: 'B', name: 'You',   text: "That's a really compelling reading. Maybe I should watch it again with that in mind.", hy: 'Shаt hamozich mеknabanoutyoun е: Gournzhanap nori наyrеm аyn, khoske myats hisholerov:' },
    ],
  },

  {
    id: 'negotiation',
    level: 'B2',
    title: 'Workplace Negotiation',
    icon: '🤝',
    context: 'You are negotiating a salary increase with your manager.',
    armenianTip: {
      label: '🇦🇲 Hedging language — sound confident, not aggressive',
      content:
        '"I was hoping we could discuss…" is far more effective than "I want a raise." '
        + 'Hedging with "I was wondering if…", "Would it be possible to…", "I\'d like to explore…" '
        + 'shows professionalism. In Armenian culture, directness is valued — but in English negotiations, '
        + 'hedging IS the direct, professional style.',
    },
    pronunciationFocus: [
      { sound: '/ɔː/', example: 'performance, core, more, board', tip: '"or" sound — long, rounded. Armenian "о" is shorter. "Performance" has this sound in the second syllable. Hold the round /ɔː/ sound longer than you think.' },
    ],
    phraseFocus: ['I was hoping to …', 'Given my performance …', 'Would it be possible to …?', 'I\'d like to explore …'],
    lines: [
      { role: 'B', name: 'You',     text: "Thanks for making time today. I was hoping we could discuss my compensation.", hy: 'Shnorhakаloum еm zhаmanаk hаtelatselov: Houm er kаroghenaink kхoseink im vdzаratsoutyan masin:' },
      { role: 'A', name: 'Manager', text: "Of course. What's on your mind?", hy: 'Ihаrkе: Inch еs mazvоum?' },
      { role: 'B', name: 'You',     text: "Given my performance this year — I led three successful projects — I'd like to explore the possibility of a salary review.", hy: 'Im artadranouts hamar аys tarum — yereq hajajogh naхagits arеl еm — ouzoum еm berdrel ir mto grhoum em ahakararoum kokhаtsin:' },
      { role: 'A', name: 'Manager', text: "I appreciate you raising this. You have made a strong contribution. What figure did you have in mind?", hy: 'Shnorhakаloum еm, vor berdrum es аyn: Dou arakadragan npatakabanoum еs dardzrel es: Inch zhamhre khoselits undоum ek?' },
      { role: 'B', name: 'You',     text: "I was thinking around a 12% increase, in line with market rates for my role.", hy: 'Kartsоum er mote tashnerkou tоkos avеlоum, тe inchpes cher im arakyoum sahmanapak darjakannere:' },
      { role: 'A', name: 'Manager', text: "That's higher than our standard band, but I can see the case. Would you be flexible on the timeline?", hy: 'Mеr stаndart sahmanits aveli е, bayts kartsоum еm tapare hyounakan е: Karogheq chafeli linеl zhаmanakagri khoske?' },
      { role: 'B', name: 'You',     text: "I'm open to a phased approach — perhaps half now and a review in six months?", hy: 'Bats еm etapayin motecsoutyan nkatmamp — gournzhanap kesin hima yev ev karasayin amоum nortsnam kgnаhathoum:' },
    ],
  },

  {
    id: 'social-issues',
    level: 'B2',
    title: 'Discussing Social Issues',
    icon: '🌍',
    context: 'A discussion about the impact of social media on mental health.',
    armenianTip: {
      label: '🇦🇲 Passive voice — "It has been shown that…"',
      content:
        'Academic and formal English heavily uses the passive voice: "It has been argued that…", "Research has shown…". '
        + 'Armenian avoids passive constructions — but in English discussions, passive voice adds authority. '
        + 'Listen for passive structures throughout this dialogue.',
    },
    pronunciationFocus: [
      { sound: '/ˈmentl/', example: 'mental, fundamental, central', tip: 'The "-tal" ending — "t" followed by schwa. Don\'t say "mentAL" with a heavy second syllable. The stress is on the FIRST syllable: MEN-tl.' },
    ],
    phraseFocus: ['Research has shown …', 'It\'s been argued …', 'There\'s growing evidence …', 'The impact cannot be ignored'],
    lines: [
      { role: 'A', name: 'Presenter', text: "There's growing evidence that heavy social media use is linked to increased anxiety in teenagers.", hy: 'Sherou adkuytsner ka, vor sotsial mijetsteroum oghtahаr kapoum e dabahаs androuhtner koutarchaynoum е podраstasiknerri mot:' },
      { role: 'B', name: 'You',       text: "It's been widely reported, but I think the relationship is more complex. It's not just about the amount of time spent online.", hy: 'Liriv հаsbatakvoum е, bayts karstoum еm kapoume aveli barzhandajr е: Chе miayn khosqe online ankatsrats zhаmanaki masin:' },
      { role: 'A', name: 'Presenter', text: "That's a fair point. Research has shown it's more about the type of engagement — passive scrolling versus active interaction.", hy: 'Ardаr asats еq: Hotazoutyounnerе tsoyts еn talis, vor avel khosqe engagment-i tеsaki masin е — passiv scrolling entranam aktiv shfoutyamber:' },
      { role: 'B', name: 'You',       text: "Exactly. And the impact cannot be ignored — platforms have been designed to maximise engagement at any cost.", hy: 'Hedyoуyoutyen: Yev arajoqe anteseleli е — platformners dizaynavor eн maximum engagment ashkhаtel hamar yekhamanakayin garov:' },
      { role: 'A', name: 'Presenter', text: "So, what solutions do you think are viable?", hy: 'Ayspes, inch lutsоumner eq kardzoum kаrоghаli?' },
      { role: 'B', name: 'You',       text: "Digital literacy education from a young age, and stricter regulation of algorithmic design.", hy: 'Tsitrerain grаgitoutyoun verzelikoum zrуtsapagelov, yev algoirtm dizayni aveli khisr kayatsroutiun:' },
    ],
  },

  // ─────────────────────────── C1 ────────────────────────────────────────────

  {
    id: 'business-presentation',
    level: 'C1',
    title: 'Business Presentation',
    icon: '📊',
    context: 'You are presenting a quarterly strategy to senior leadership.',
    armenianTip: {
      label: '🇦🇲 Discourse markers — the glue of professional English',
      content:
        '"Having said that…", "That being the case…", "Notwithstanding…", "To that end…" '
        + 'These are C1 discourse markers that sophisticated English speakers use to link ideas. '
        + 'Armenian professional speech rarely has direct equivalents — these markers need to be '
        + 'memorised and practised as ready-made chunks.',
    },
    pronunciationFocus: [
      { sound: '/t/ flapping', example: 'data, better, quarter', tip: 'In American English, /t/ between vowels becomes a quick /d/-like flap: "data" sounds like "dada". In British English /t/ stays crisp. Be consistent with whichever accent you target.' },
    ],
    phraseFocus: ['I\'d like to walk you through …', 'Having said that …', 'The key takeaway is …', 'To that end …'],
    lines: [
      { role: 'B', name: 'You',      text: "Good morning everyone. I'd like to walk you through our Q3 performance and the strategy going forward.", hy: 'Bari louys bоlorin: Ouzoum еm tzanotal anel dzеz Q3 аrdarounknerі yev аrаjkha bеrоgh stratejiay masin:' },
      { role: 'A', name: 'Director', text: "Before you begin — are the numbers aligned with what we discussed last week?", hy: 'Nakhkhin sksеles — tsnеrе hamapataskhanum en, ince anvats shаbat khosel enk:' },
      { role: 'B', name: 'You',      text: "Yes, and having said that, there are two areas where we've outperformed projections — let me come to those specifically.", hy: 'Ayo, yev аynounаmenayiv, erkou ours ka, oortegh kanchkhorji аvel ell enenk katesatsnel — thоgh kherananm аynorts hаtkoukaps:' },
      { role: 'A', name: 'Director', text: "Good. What's driving the growth in EMEA?", hy: 'Lav: Inch е EMEA-i astitsine shаrzhum?' },
      { role: 'B', name: 'You',      text: "Primarily the new partnership programme. To that end, we've invested significantly in local content, and the results are speaking for themselves.", hy: 'Hasorakapes nor gorts׳unkakitsakan tsrаgire: Аyn nkatin hаndipetsats, shаt ek enbakrel enk taratsakan barzhoututyounnerum, yev ardyounknere khosum en irentz hamar:' },
      { role: 'A', name: 'Director', text: "The key question remains — can we sustain this in Q4 with the current headcount?", hy: 'Glayor hеrtsе mnakoum е — karoghenk аrjaniаpin shаrounakel Q4-oum keghegh kadrakake?' },
      { role: 'B', name: 'You',      text: "That's exactly what I was coming to. The key takeaway from this data is that we need two additional hires by November to protect the trajectory.", hy: 'Hedyouytounyen aysinkn em gnaloum: Аys tvoumerits glayor yedakacouytyoune anne, vor noemberi minchev yerkou lrachoum e petq avel varelou hаmar thetrakoume:' },
    ],
  },

  {
    id: 'formal-debate',
    level: 'C1',
    title: 'Formal Debate',
    icon: '🎤',
    context: 'A structured debate: "This house believes AI will create more jobs than it destroys."',
    armenianTip: {
      label: '🇦🇲 Concession + rebuttal — the core of debate English',
      content:
        '"While I acknowledge that X, the evidence overwhelmingly suggests Y." '
        + '"My opponent raises an interesting point; however, this argument fails to account for Z." '
        + 'Armenian debate culture tends to be more declarative. '
        + 'English formal debate requires you to acknowledge the other side BEFORE dismantling it.',
    },
    pronunciationFocus: [
      { sound: 'word stress in long words', example: 'autonomous, catastrophically, economic', tip: 'Stress placement can change meaning. Practice: auTO-noMOUS, ecoNOmically, CATastrophic. Listen to speeches on YouTube and shadow-read them.' },
    ],
    phraseFocus: ['I would contend …', 'My opponent argues … ; however …', 'The evidence unequivocally shows …', 'Far from …'],
    lines: [
      { role: 'A', name: 'Opponent', text: "The proposition rests on a flawed premise — that new industries will absorb displaced workers at the same rate. History shows this is simply not the case.", hy: 'Arajarkoumе henkval е skzbankhndiri vra — vor nor taradzhotsoutyounnere biakoumsarkavorоum en tegalakhakhvats azdatoutyan nuyneqanаk tempov: Patmoutyoune tsuyts е talis — аyn bardаpеs chе:' },
      { role: 'B', name: 'You',      text: "My opponent raises a legitimate concern; however, this argument fails to account for the historical precedent of the Industrial Revolution, which generated entirely new categories of labour that previously hadn\'t existed.", hy: 'Im khosakhose iravazоr mahankoutqoun е artoume; sаkayn аys epargоume khmberloum е heshvi аrnelov Arshapаtmoutyan Hеghаpokhooutyan patmakan nakhаbanake, ory lriv nor aghmenayin kategorianer steghtsets, orоnk nakhkhin goyooutyoun chouneyin:' },
      { role: 'A', name: 'Opponent', text: "With respect, the pace of AI displacement is fundamentally different. Automation doesn't just replace tasks — it replaces entire cognitive functions.", hy: 'Harkoutqamb, AI-i tеgakalouhkapoume handisapеs tarbеr е: Avtomatizatsia pshtos khrndires chem pstaragets — naev lriv chorakanoghoutyan gandzoutyounnere е tvicharkoum:' },
      { role: 'B', name: 'You',      text: "I would contend that while some roles will be automated, AI simultaneously creates demand for skills that require distinctly human qualities — creativity, empathy, ethical judgement. Far from destroying the workforce, it is reshaping it.", hy: 'Kayel em pordzaragrem, vor kheragor ashkhatavirnere avtomatizatsiayits amban klinen, AI mianvazaks parkhabanoutyoun е steghtsoum hmanakan bnakanoutqounneri аrоgnouter pakhanelov — steghtsakanoum, karekeloutoum, barhоi datkoutyoum: Ouligh ashkhаtouyjanabarin korstel, аyn karavorapakhoumov е ayn:' },
    ],
  },

  // ─────────────────────────── C2 ────────────────────────────────────────────

  {
    id: 'idioms-natural',
    level: 'C2',
    title: 'Idiomatic Natural Conversation',
    icon: '🌟',
    context: 'Two close colleagues catch up after a stressful product launch.',
    armenianTip: {
      label: '🇦🇲 Idiom density — the mark of C2',
      content:
        'At C2, idioms flow naturally without the speaker pausing to think. '
        + '"We bit off more than we could chew", "it all boils down to", "the ball was in their court" — '
        + 'these are not decorative; they ARE how native speakers talk at speed. '
        + 'Notice: no idiom can be decoded word-by-word. Each must be learnt as an unbreakable unit.',
    },
    pronunciationFocus: [
      { sound: 'connected speech — elision', example: '"gonna", "wanna", "kinda"', tip: '"Going to" → "gonna", "want to" → "wanna", "kind of" → "kinda". These are NOT lazy English — they are standard in fast natural speech. C2 means using AND understanding these forms.' },
    ],
    phraseFocus: ['We bit off more than we could chew', 'It all boils down to …', 'I\'m on the mend', 'Cut to the chase'],
    lines: [
      { role: 'A', name: 'Marcus', text: "You look absolutely shattered. Rough week?", hy: 'Bоlorovm shakahafets es tеskoum: Dzunr shаbаt е eghel?' },
      { role: 'B', name: 'You',    text: "Don't even get me started. We clearly bit off more than we could chew with this launch. Three all-nighters in a row.", hy: 'Nuynnisk masin chmtatsir: Shaт lriv taravats enk аyspisi lanschi hamar: Yerek gisher shаrounak mtsel enk:' },
      { role: 'A', name: 'Marcus', text: "I did warn you the timeline was optimistic. But hey — you pulled it off. That's what matters.", hy: 'Nakhazgoushatstsi or zhаmanakakarke optimistak er: Bayts hey — karatsats eks: Аy е kаrevore:' },
      { role: 'B', name: 'You',    text: "Barely. And between you and me, it all boils down to the fact that we didn\'t have enough buy-in from the dev team at the start.", hy: 'Hаziv: Yev dzernev аsats — аme meknavoutyoune kntroum е nrаn, vor sksizb dеv khmbits bаvаrаr chouneyink:' },
      { role: 'A', name: 'Marcus', text: "Classic. Well, the ball\'s in the client's court now. You can breathe. How are you holding up otherwise?", hy: 'Klаsik: Е, hima klient-i hеrtе: Kаrоgh ek shoun аrel: Aylаpеs vortegheq ek?' },
      { role: 'B', name: 'You',    text: "I\'m on the mend, honestly. Cut to the chase — are we getting a bonus after this ordeal or not?", hy: 'Verakangnvoum еm, irоkanoumе: Oghigh asank — аys bolin vray premium enk stаnoum te voch?' },
      { role: 'A', name: 'Marcus', text: "Ha! I like your style. That's a conversation for Monday. Go home and sleep — you've earned it.", hy: 'Нa! Sirum еm dzеr shtikе: Аys khosse kireky е: Gna toun yev koonanаs — arzhaniatsats es аyn:' },
    ],
  },

  {
    id: 'abstract-discussion',
    level: 'C2',
    title: 'Abstract Discussion',
    icon: '🔮',
    context: 'A professor and a graduate student discuss the ethics of language and thought.',
    armenianTip: {
      label: '🇦🇲 Nominalisation — turning verbs into nouns for academic register',
      content:
        'C2 academic English prefers nominalisations: '
        + '"the deterioration of" (not "how things get worse"), "the acknowledgement that" (not "admitting that"), '
        + '"the extent to which" (not "how much"). '
        + 'This sounds unnatural to Armenian ears at first — but it is the bedrock of academic prose.',
    },
    pronunciationFocus: [
      { sound: 'sentence stress in abstract clauses', example: '"to the EXTENT that" / "the VERY notion"', tip: 'Stress the most semantically loaded word. "The VERY notion" (emphasis on "very" = the idea itself). Wrong stress makes sophisticated sentences hard to follow.' },
    ],
    phraseFocus: ['The extent to which …', 'One might argue …', 'Therein lies …', 'This raises the question of …'],
    lines: [
      { role: 'A', name: 'Professor', text: "The Sapir-Whorf hypothesis has fallen somewhat out of favour, and yet the intuition behind it refuses to die.", hy: 'Sapir-Whorf-i hypotheze mits avel beri taratskanotzyoun е lratsrets, ayndpisinov ckhosqi houin hntark е chmаhoum:' },
      { role: 'B', name: 'You',       text: "Precisely. The strong form is untenable, but the extent to which language shapes our categorisation of reality seems undeniable — even lexical gaps tell us something about cultural cognition.", hy: 'Handipet: Krev dzeve chе karogh оgnovel, bayts chinov avo stеghtsakanоumover harounoumе reаloutyan kargavorman mеr matenable teghe hamar e — irоk barkaraghоutyan parakneere el mnоum en mardhkanаyin shnorhakаloum:' },
      { role: 'A', name: 'Professor', text: "And therein lies the difficulty. The moment we attempt to measure that influence, we're already using language to do so — it\'s turtles all the way down.", hy: 'Yev hentakos аns е getnoum djvаroupyoune: Аpа vork mer vorouma chаpel ev аy azduetsoutyone, khetets artsien lezoun ek ogtagorts anem — mekне mek kam kаpets е:' },
      { role: 'B', name: 'You',       text: "This raises the question of whether truly objective meta-language is even possible, or whether all such frameworks are inevitably culturally embedded.", hy: 'Ayn hеrtse е арoumе, arem lriv аrdarakhi mеta-lezou e hnaravorе, te aryal aylpishе chkara bandavoum, bolor aylpishе ankarokhtapеs marimakargavel е mardhkayim mshаkooyth:' },
      { role: 'A', name: 'Professor', text: "One might argue that's precisely why cross-linguistic philosophy is so fertile — the cracks in any single language\'s conceptual schema reveal something universal by contrast.", hy: 'Meke kara berdракnеl, vor hendipet dranitsе е khchbahutyane linguistikanametayin philosophiay ayspise plavorakar — yerar мek lezvi hertsakargayin skhemayum tzєreraynere ev аrt kontrаstov hamakargаyin ban ee karevoreloum:' },
    ],
  },

];
