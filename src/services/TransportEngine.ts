import * as Tone from 'tone';

class TransportEngine {
  private synth: Tone.PolySynth | null = null;
  private pattern: Tone.Part | null = null;
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    await Tone.start();
    this.synth = new Tone.PolySynth(Tone.Synth).toDestination();
    this.isInitialized = true;
  }

  async play(notes: Array<{ time: number; pitch: string; duration: number; velocity: number }>) {
    await this.init();
    this.stop();

    if (!this.synth) return;

    this.pattern = new Tone.Part((time, note: any) => {
      this.synth?.triggerAttackRelease(note.pitch, note.duration, time, note.velocity);
    }, notes.map(n => [n.time, n]));

    this.pattern.start(0);
    Tone.Transport.start();
  }

  stop() {
    if (this.pattern) {
      this.pattern.stop();
      this.pattern.dispose();
      this.pattern = null;
    }
    Tone.Transport.stop();
    Tone.Transport.cancel();
  }

  setBPM(bpm: number) {
    Tone.Transport.bpm.value = bpm;
  }

  getBPM(): number {
    return Tone.Transport.bpm.value;
  }

  isPlaying(): boolean {
    return Tone.Transport.state === 'started';
  }
}

export const transportEngine = new TransportEngine();
