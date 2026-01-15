import { UserPreferences } from '../types';

class UserPrefsStore {
  private readonly STORAGE_KEY = 'user-preferences';
  
  private defaultPreferences: UserPreferences = {
    density: 0.5,
    octave: 4,
    bpm: 120,
    quantize: '8n'
  };

  getPreferences(): UserPreferences {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return { ...this.defaultPreferences, ...JSON.parse(stored) };
      } catch (e) {
        console.error('Failed to parse user preferences', e);
      }
    }
    return { ...this.defaultPreferences };
  }

  setPreferences(prefs: Partial<UserPreferences>) {
    const current = this.getPreferences();
    const updated = { ...current, ...prefs };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updated));
  }

  getDensity(): number {
    return this.getPreferences().density;
  }

  setDensity(density: number) {
    this.setPreferences({ density });
  }

  getOctave(): number {
    return this.getPreferences().octave;
  }

  setOctave(octave: number) {
    this.setPreferences({ octave });
  }

  getBPM(): number {
    return this.getPreferences().bpm;
  }

  setBPM(bpm: number) {
    this.setPreferences({ bpm });
  }

  getQuantize(): string {
    return this.getPreferences().quantize;
  }

  setQuantize(quantize: string) {
    this.setPreferences({ quantize });
  }
}

export const userPrefsStore = new UserPrefsStore();
