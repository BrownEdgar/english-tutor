const pendingVoiceCbs = [];

function flushVoiceCbs() {
  while (pendingVoiceCbs.length) {
    const fn = pendingVoiceCbs.shift();
    try {
      fn();
    } catch (e) {
      console.warn(e);
    }
  }
}

function ensureVoices(cb) {
  const synth = window.speechSynthesis;
  if (!synth) {
    cb();
    return;
  }
  if (synth.getVoices().length) {
    cb();
    return;
  }
  pendingVoiceCbs.push(cb);
  if (pendingVoiceCbs.length === 1) {
    synth.addEventListener(
      'voiceschanged',
      function onV() {
        synth.removeEventListener('voiceschanged', onV);
        flushVoiceCbs();
      },
      { once: true }
    );
  }
}

function pickClearEnVoice() {
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return null;
  const en = voices.filter(
    (v) => v.lang && v.lang.toLowerCase().startsWith('en')
  );
  const preferred = [
    (v) => /google us english/i.test(v.name),
    (v) => /samantha/i.test(v.name),
    (v) => /google uk english female/i.test(v.name),
    (v) => /google uk english male/i.test(v.name),
    (v) => /google/i.test(v.name),
    (v) => /alex/i.test(v.name),
  ];
  for (const match of preferred) {
    const found = en.find(match);
    if (found) return found;
  }
  return en[0] || null;
}

export function speakCard(w) {
  if (!window.speechSynthesis) return;
  const text = (w.en || '').trim() + '. ' + (w.ex || '').trim();
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  ensureVoices(() => {
    const v = pickClearEnVoice();
    if (v) utter.voice = v;
    utter.rate = 0.92;
    utter.pitch = 0.95;
    window.speechSynthesis.speak(utter);
  });
}
