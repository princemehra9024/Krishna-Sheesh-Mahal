/**
 * Synthesizes organic, realistic paper fluttering and rustling sounds
 * using the Web Audio API without needing external MP3 audio files.
 */
class PaperAudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Check localStorage for saved sound preference if available
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("ksm_menu_sound_muted");
        if (saved !== null) {
          this.isMuted = saved === "true";
        }
      } catch {
        // Fallback silently if storage unavailable
      }
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem("ksm_menu_sound_muted", String(this.isMuted));
    } catch {
      // Ignored
    }
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    try {
      localStorage.setItem("ksm_menu_sound_muted", String(this.isMuted));
    } catch {
      // Ignored
    }
  }

  /**
   * Generates a realistic paper curl & turn rustle sound.
   */
  public playPageTurn() {
    if (this.isMuted) return;

    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Subtle randomized flutter duration between 180ms - 260ms
      const duration = 0.2 + Math.random() * 0.07;

      // 1. Paper Friction Texture (Pinkish noise)
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pinkish noise generator for authentic fibrous paper friction
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        const pink = b0 + b1 + b2 + white * 0.5362;
        // Natural exponential decay as the curl settles
        const decay = Math.pow(1 - i / bufferSize, 1.4);
        data[i] = pink * 0.18 * decay;
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter to isolate dry paper parchment resonance (around 2600 - 3400 Hz)
      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = "bandpass";
      bandpass.frequency.setValueAtTime(2600 + Math.random() * 800, now);
      bandpass.Q.setValueAtTime(1.8, now);

      // Sweeping lowpass filter to mimic paper moving across air
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(5000, now);
      lowpass.frequency.exponentialRampToValueAtTime(1100, now + duration);

      // Gain Envelope: quick soft attack, natural smooth release
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.linearRampToValueAtTime(0.35, now + 0.025);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noiseSource.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + duration);

      // 2. Subtle low frequency paper flex "whoosh/flutter"
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(110 + Math.random() * 30, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.14);

      oscGain.gain.setValueAtTime(0.08, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch {
      // Browser autoplay policy might restrict until user interacts
    }
  }

  /**
   * Soft chime or click sound when item added to dining tray
   */
  public playItemSelect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Ignored
    }
  }
}

export const paperAudio = new PaperAudioEngine();
