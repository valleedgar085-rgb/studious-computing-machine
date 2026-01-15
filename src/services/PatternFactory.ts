import { Pattern, Note } from '../types';

class PatternFactory {
  generateChordPattern(density: number, octave: number): Pattern {
    const notes: Note[] = [];
    const chords = [
      ['C' + octave, 'E' + octave, 'G' + octave],
      ['F' + octave, 'A' + octave, 'C' + (octave + 1)],
      ['G' + octave, 'B' + octave, 'D' + (octave + 1)],
      ['Am' + octave, 'C' + (octave + 1), 'E' + (octave + 1)]
    ];

    const noteCount = Math.floor(density * 8);
    for (let i = 0; i < noteCount; i++) {
      const chordIndex = i % chords.length;
      const chord = chords[chordIndex];
      const time = i * 0.5;
      
      chord.forEach(pitch => {
        notes.push({
          pitch: pitch.replace(/[A-G]m?/, (match) => match.replace('m', '')),
          time,
          duration: 0.4,
          velocity: 0.7
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
