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

export function speak(text, { lang = 'zh-TW', rate = 1 } = {}) {
  if (muted || typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text).slice(0, 300));
    u.lang = lang;
    u.rate = rate;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }
}
