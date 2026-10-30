// dist/quest/sound.mjs
// Audio synthesis and WebAudio sound effects for JH Quest

let ctx = null;
let muted = false;
try {
  muted = globalThis.localStorage?.getItem('zhixing_quest_muted') === 'true';
} catch {}

function audioCtx() {
  if (!ctx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) ctx = new AudioContext();
  }
  return ctx;
}

export function isMuted() {
  return muted;
}

export function toggleMute() {
  muted = !muted;
  try {
    globalThis.localStorage?.setItem('zhixing_quest_muted', String(muted));
  } catch {}
  if (muted) stopSpeaking();
  return muted;
}

export function playTone(type) {
  if (muted) return;
  try {
    const c = audioCtx();
    if (!c) return;
    if (c.state === 'suspended') c.resume();

    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);

    const now = c.currentTime;

    if (type === 'correct') {
      // Pleasant bright ding
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15); // G5
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'wrong') {
      // Gentle low double-thud
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(160, now + 0.25);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'combo') {
      // Ascending triumphant chime
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
      osc.frequency.setValueAtTime(1046.5, now + 0.16); // C6
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'level') {
      // Fanfare chord
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.3);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  } catch (e) {
    // Graceful fallback if audio is blocked
  }
}

let speechRun = 0;
let speechRate = 1;
try { speechRate = Number(globalThis.localStorage?.getItem('jh-speech-rate')) || 1; } catch {}
export function getSpeechRate() { return speechRate; }
export function setSpeechRate(rate) {
  speechRate = [0.75, 1, 1.25].includes(Number(rate)) ? Number(rate) : 1;
  try { globalThis.localStorage?.setItem('jh-speech-rate', String(speechRate)); } catch {}
  stopSpeaking();
}
export function canSpeak() {
  return typeof window !== 'undefined' && !!window.speechSynthesis && typeof SpeechSynthesisUtterance !== 'undefined';
}
export function speechChunks(text) {
  return (String(text).match(/[^。！？!?\n]+[。！？!?\n]?|[。！？!?\n]/g) || [])
    .flatMap(s => s.match(/[\s\S]{1,180}/gu) || []);
}
export function speak(text, { lang, rate = speechRate, onError } = {}) {
  if (!canSpeak()) { onError?.('這個瀏覽器不支援語音朗讀，請閱讀畫面文字。'); return false; }
  try {
    stopSpeaking();
    const run = speechRun;
    const chunks = speechChunks(text);
    const next = () => {
      if (run !== speechRun || !chunks.length) return;
      const chunk = chunks.shift();
      const u = new SpeechSynthesisUtterance(chunk);
      u.lang = lang || (/[\u3400-\u9fff]/u.test(chunk) ? 'zh-TW' : 'en-US');
      u.rate = rate;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang === u.lang) || voices.find(v => v.lang.startsWith(u.lang.split('-')[0]));
      if (voice) u.voice = voice;
      u.onend = next;
      u.onerror = e => { if (run === speechRun && !['canceled', 'interrupted'].includes(e.error)) onError?.('朗讀無法播放，請再試一次或閱讀文字。'); };
      window.speechSynthesis.speak(u);
    };
    next();
    return true;
  } catch (e) { onError?.('朗讀無法播放，請閱讀畫面文字。'); return false; }
}

export function stopSpeaking() {
  speechRun++;
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}
