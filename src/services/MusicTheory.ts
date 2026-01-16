/**
 * Music Theory Library
 * Provides comprehensive chord and scale theory for pattern generation
 */

export type ChordType = 
  | 'major' 
  | 'minor' 
  | 'diminished' 
  | 'augmented' 
  | 'major7' 
  | 'minor7' 
  | 'dominant7'
  | 'sus2'
  | 'sus4';

export type ProgressionStyle = 
  | 'classical' 
  | 'jazz' 
  | 'pop' 
  | 'blues';

export interface ChordDefinition {
  root: string;
  intervals: number[];
  type: ChordType;
}

export interface ChordProgression {
  chords: ChordDefinition[];
  name: string;
}

class MusicTheoryService {
  private readonly notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Thresholds for complexity and tension adjustments
  private readonly SIMPLE_THRESHOLD = 0.3;
  private readonly COMPLEX_THRESHOLD = 0.7;
  private readonly CONSONANT_THRESHOLD = 0.3;
  private readonly DISSONANT_THRESHOLD = 0.7;
  
  // Chord interval patterns (in semitones from root)
  private readonly chordIntervals: Record<ChordType, number[]> = {
    major: [0, 4, 7],
    minor: [0, 3, 7],
    diminished: [0, 3, 6],
    augmented: [0, 4, 8],
    major7: [0, 4, 7, 11],
    minor7: [0, 3, 7, 10],
    dominant7: [0, 4, 7, 10],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7]
  };

  // Common chord progressions by style
  private readonly progressions: Record<ProgressionStyle, string[][]> = {
    classical: [
      ['C', 'F', 'G', 'C'],
      ['C', 'Am', 'F', 'G'],
      ['C', 'G', 'Am', 'F']
    ],
    jazz: [
      ['Cmaj7', 'Am7', 'Dm7', 'G7'],
      ['Cmaj7', 'Dm7', 'Em7', 'Fmaj7'],
      ['Cm7', 'Fm7', 'Bb7', 'Ebmaj7']
    ],
    pop: [
      ['C', 'G', 'Am', 'F'],
      ['C', 'Am', 'Dm', 'G'],
      ['C', 'F', 'Am', 'G']
    ],
    blues: [
      ['C7', 'C7', 'C7', 'C7'],
      ['F7', 'F7', 'C7', 'C7'],
      ['G7', 'F7', 'C7', 'G7']
    ]
  };

  /**
   * Build a chord from a root note and chord type
   */
  buildChord(root: string, type: ChordType, octave: number): string[] {
    const intervals = this.chordIntervals[type];
    const rootIndex = this.notes.indexOf(root);
    
    if (rootIndex === -1) {
      console.warn(`Invalid root note: ${root}`);
      return [];
    }

    return intervals.map((interval) => {
      const noteIndex = (rootIndex + interval) % 12;
      const octaveOffset = Math.floor((rootIndex + interval) / 12);
      return this.notes[noteIndex] + (octave + octaveOffset);
    });
  }

  /**
   * Parse a chord symbol (e.g., "Cmaj7", "Am", "G7") into root and type
   */
  parseChordSymbol(symbol: string): { root: string; type: ChordType } {
    // Handle flat/sharp notation
    let root = symbol.match(/^[A-G][#b]?/)?.[0] || 'C';
    
    // Normalize flats to sharps
    const flatToSharp: Record<string, string> = {
      'Db': 'C#',
      'Eb': 'D#',
      'Gb': 'F#',
      'Ab': 'G#',
      'Bb': 'A#'
    };
    
    if (root.includes('b')) {
      root = flatToSharp[root] || root;
    }
    
    const suffix = symbol.slice(symbol.match(/^[A-G][#b]?/)?.[0].length || 0).toLowerCase();

    let type: ChordType = 'major';
    
    if (suffix.includes('maj7')) type = 'major7';
    else if (suffix.includes('m7') || suffix.includes('min7')) type = 'minor7';
    else if (suffix === '7') type = 'dominant7';
    else if (suffix.includes('dim')) type = 'diminished';
    else if (suffix.includes('aug')) type = 'augmented';
    else if (suffix.includes('sus2')) type = 'sus2';
    else if (suffix.includes('sus4')) type = 'sus4';
    else if (suffix === 'm' || suffix === 'min') type = 'minor';

    return { root, type };
  }

  /**
   * Get a chord progression for a given style
   */
  getProgression(style: ProgressionStyle, key: string = 'C'): ChordProgression {
    const progressionTemplates = this.progressions[style];
    const template = progressionTemplates[Math.floor(Math.random() * progressionTemplates.length)];
    
    // Transpose progression to the desired key
    const keyIndex = this.notes.indexOf(key);
    const transposedChords = template.map(chordSymbol => {
      const { root, type } = this.parseChordSymbol(chordSymbol);
      const rootIndex = this.notes.indexOf(root);
      
      // If root not found, try to use it as-is
      if (rootIndex === -1) {
        console.warn(`Could not find root note: ${root} from symbol: ${chordSymbol}`);
        return {
          root: 'C',
          intervals: this.chordIntervals[type],
          type
        };
      }
      
      const transposedIndex = (rootIndex + keyIndex) % 12;
      const transposedRoot = this.notes[transposedIndex];
      
      return {
        root: transposedRoot,
        intervals: this.chordIntervals[type],
        type
      };
    });

    return {
      chords: transposedChords,
      name: `${style} progression in ${key}`
    };
  }

  /**
   * Get a random chord of a specific type
   */
  getRandomChord(type: ChordType): ChordDefinition {
    const root = this.notes[Math.floor(Math.random() * this.notes.length)];
    return {
      root,
      intervals: this.chordIntervals[type],
      type
    };
  }

  /**
   * Mix complexity: blend between simple and complex voicings
   * @param complexity 0 = simple triads, 1 = complex extended chords
   */
  adjustComplexity(type: ChordType, complexity: number): ChordType {
    if (complexity < this.SIMPLE_THRESHOLD) {
      // Simple triads
      if (type === 'major7') return 'major';
      if (type === 'minor7') return 'minor';
      if (type === 'dominant7') return 'major';
    } else if (complexity > this.COMPLEX_THRESHOLD) {
      // Complex chords
      if (type === 'major') return 'major7';
      if (type === 'minor') return 'minor7';
    }
    return type;
  }

  /**
   * Adjust tension: blend between consonant and dissonant harmonies
   * @param tension 0 = consonant, 1 = dissonant
   */
  adjustTension(baseType: ChordType, tension: number): ChordType {
    if (tension < this.CONSONANT_THRESHOLD) {
      // Consonant - prefer major/minor
      return baseType === 'minor' ? 'minor' : 'major';
    } else if (tension > this.DISSONANT_THRESHOLD) {
      // Dissonant - prefer diminished, augmented, or 7ths based on base type
      if (baseType === 'minor' || baseType === 'minor7') return 'diminished';
      if (baseType === 'major' || baseType === 'major7') return 'augmented';
      return 'dominant7';
    }
    return baseType;
  }
}

export const musicTheory = new MusicTheoryService();
