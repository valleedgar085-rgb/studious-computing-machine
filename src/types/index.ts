export interface Pattern {
  id: string;
  notes: Note[];
  duration: number;
}

export interface Note {
  pitch: string;
  time: number;
  duration: number;
  velocity: number;
}

export interface Template {
  id: string;
  name: string;
  scope: 'chords' | 'melody' | 'bassline';
  pattern: Pattern;
  density?: number;
  octave?: number;
  bpm?: number;
  quantize?: string;
  isFavorite: boolean;
  lastUsed?: number;
  createdAt: number;
  updatedAt: number;
}

export interface UserPreferences {
  density: number;
  octave: number;
  bpm: number;
  quantize: string;
}

export type TemplateScope = 'chords' | 'melody' | 'bassline';
