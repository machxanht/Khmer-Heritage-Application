/**
 * Audio & Speech Synthesis Utility for Khmer Heritage
 * Provides audio playback for Khmer script, pronunciation practice, and instrument tones.
 */

// Safe browser speech synthesis for Khmer (km-KH)
export function speakKhmer(text: string, rate = 0.85) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    fallbackToneChirp();
    return;
  }

  window.speechSynthesis.cancel(); // Stop prior speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  // Try to find a Khmer voice, or fallback to standard
  const voices = window.speechSynthesis.getVoices();
  const khmerVoice = voices.find((v) => v.lang.includes("km") || v.lang.includes("KH"));
  if (khmerVoice) {
    utterance.voice = khmerVoice;
    utterance.lang = khmerVoice.lang;
  } else {
    utterance.lang = "km-KH";
  }

  utterance.onerror = () => {
    // If browser lacks Khmer TTS engine, generate phonetic tone chirp
    fallbackToneChirp();
  };

  window.speechSynthesis.speak(utterance);
}

// Web Audio API fallback harmonic tone synthesizer for syllable resonance
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function fallbackToneChirp(baseFreq = 340, duration = 0.3) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.15, now + duration * 0.4);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + duration);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.2, now + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.05);
}

export function playPronunciationRegister(series: 1 | 2, baseFreq = 300) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Series 1 (A-Series / High register, clear, bright)
  // Series 2 (O-Series / Low register, deep, breathy)
  const freq = series === 1 ? baseFreq * 1.25 : baseFreq * 0.85;
  osc.type = series === 1 ? "triangle" : "sine";
  osc.frequency.setValueAtTime(freq, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.25, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.45);
}

export function playRegisterTone(series: 1 | 2, baseFreq = 300) {
  playPronunciationRegister(series, baseFreq);
}

export function speakKhmerWithFallback(text: string, rate = 0.85) {
  speakKhmer(text, rate);
}

