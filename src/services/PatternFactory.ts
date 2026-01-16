import { Pattern, Note } from '../types';
import { musicTheory, ChordType, ProgressionStyle } from './MusicTheory';

export interface ChordPatternOptions {
  density: number;
  octave: number;
  chordType?: ChordType;
  progressionStyle?: ProgressionStyle;
  complexity?: number;
  tension?: number;
}

class PatternFactory {
  generateChordPattern(
    density: number, 
    octave: number,
    _chordType: ChordType = 'major',
    progressionStyle: ProgressionStyle = 'pop',
    complexity: number = 0.5,
    tension: number = 0.5
  ): Pattern {
    const notes: Note[] = [];
    
    // Get progression based on style
    const progression = musicTheory.getProgression(progressionStyle, 'C');
    
    const noteCount = Math.floor(density * 8);
    for (let i = 0; i < noteCount; i++) {
      const progressionIndex = i % progression.chords.length;
      let chordDef = progression.chords[progressionIndex];
      
      // Apply complexity adjustment
      let adjustedType = musicTheory.adjustComplexity(chordDef.type, complexity);
      
      // Apply tension adjustment
      adjustedType = musicTheory.adjustTension(adjustedType, tension);
      
      // Build the chord with adjusted type
      const chord = musicTheory.buildChord(chordDef.root, adjustedType, octave);
      const time = i * 0.5;
      
      chord.forEach(pitch => {
        notes.push({
          pitch,
          time,
          duration: 0.4,
          velocity: 0.6 + Math.random() * 0.2
        });
      });
    }

    return {
      id: `chord-${Date.now()}`,
      notes,
      duration: noteCount * 0.5
    };
  }

  generateMelodyPattern(density: number, octave: number): Pattern {
    const notes: Note[] = [];
    const scale = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    
    const noteCount = Math.floor(density * 16);
    for (let i = 0; i < noteCount; i++) {
      const pitch = scale[Math.floor(Math.random() * scale.length)] + octave;
      notes.push({
        pitch,
        time: i * 0.25,
        duration: 0.2,
        velocity: 0.6 + Math.random() * 0.2
      });
    }

    return {
      id: `melody-${Date.now()}`,
      notes,
      duration: noteCount * 0.25
    };
  }

  generateBasslinePattern(density: number, octave: number): Pattern {
    const notes: Note[] = [];
    const bassNotes = ['C', 'F', 'G', 'A'];
    
    const noteCount = Math.floor(density * 8);
    for (let i = 0; i < noteCount; i++) {
      const pitch = bassNotes[i % bassNotes.length] + octave;
      notes.push({
        pitch,
        time: i * 0.5,
        duration: 0.4,
        velocity: 0.8
      });
    }

    return {
      id: `bass-${Date.now()}`,
      notes,
      duration: noteCount * 0.5
    };
  }
}

export const patternFactory = new PatternFactory();
