import { transportEngine } from './TransportEngine';
import { Pattern } from '../types';

class PlayExportController {
  private onPlayStateChange?: (isPlaying: boolean) => void;

  setPlayStateChangeListener(callback: (isPlaying: boolean) => void) {
    this.onPlayStateChange = callback;
  }

  async play(pattern: Pattern) {
    await transportEngine.play(pattern.notes);
    this.onPlayStateChange?.(true);
  }

  stop() {
    transportEngine.stop();
    this.onPlayStateChange?.(false);
  }

  stopAll() {
    this.stop();
  }

  isPlaying(): boolean {
    return transportEngine.isPlaying();
  }

  export(pattern: Pattern, format: 'midi' | 'json' = 'json'): string {
    if (format === 'json') {
      return JSON.stringify(pattern, null, 2);
    }
    return 'MIDI export not implemented';
  }
}

export const playExportController = new PlayExportController();
