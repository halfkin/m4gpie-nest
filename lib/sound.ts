// ─── Sound Engine ─────────────────────────────────────────
// Web Audio API synthesized tones — no audio files needed

class SoundEngine {
    private ctx: AudioContext | null = null;

    private init(): AudioContext {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        }
        return this.ctx;
    }

    private tone(type: OscillatorType, freq: number, duration: number, volume = 0.1) {
        try {
            const c = this.init();
            const o = c.createOscillator();
            const g = c.createGain();
            o.type = type;
            o.frequency.value = freq;
            g.gain.setValueAtTime(volume, c.currentTime);
            g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
            o.connect(g);
            g.connect(c.destination);
            o.start();
            o.stop(c.currentTime + duration);
        } catch {
            // Audio not available — fail silently
        }
    }

    click() {
        this.tone("sine", 1400, 0.04, 0.05);
    }

    open() {
        this.tone("sine", 523, 0.08, 0.07);
        setTimeout(() => this.tone("sine", 659, 0.08, 0.06), 50);
        setTimeout(() => this.tone("sine", 880, 0.1, 0.04), 100);
    }

    close() {
        this.tone("sine", 880, 0.05, 0.05);
        setTimeout(() => this.tone("sine", 440, 0.12, 0.04), 40);
    }

    boot() {
        [330, 440, 554, 660, 880].forEach((f, i) =>
            setTimeout(() => this.tone("triangle", f, 0.18, 0.06), i * 100)
        );
    }

    tap() {
        this.tone("triangle", 1000, 0.02, 0.03);
    }

    key() {
        this.tone("square", 200 + Math.random() * 600, 0.02, 0.01);
    }
}

export const Snd = new SoundEngine();
