import { useState, useEffect } from 'react';
import { Pattern, Template } from '../types';
import { patternFactory } from '../services/PatternFactory';
import { playExportController } from '../services/PlayExportController';
import { userPrefsStore } from '../stores/UserPrefsStore';
import { TimingControls } from '../components/TimingControls';
import { DensityControl } from '../components/DensityControl';
import { OctaveControl } from '../components/OctaveControl';
import { ResetClearControls } from '../components/ResetClearControls';
import { PatternPadEditor } from '../components/PatternPadEditor';
import { TemplateControls } from '../components/TemplateControls';
import { Snackbar } from '../components/Snackbar';
import { AudioVisualizer } from '../components/AudioVisualizer';
import { ChordTypeControl } from '../components/ChordTypeControl';
import { ProgressionStyleControl } from '../components/ProgressionStyleControl';
import { ComplexityControl } from '../components/ComplexityControl';
import { TensionControl } from '../components/TensionControl';
import { ChordType, ProgressionStyle } from '../services/MusicTheory';

export const ChordGeneratorScreen: React.FC = () => {
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [density, setDensity] = useState(userPrefsStore.getDensity());
  const [octave, setOctave] = useState(userPrefsStore.getOctave());
  const [chordType, setChordType] = useState<ChordType>('major');
  const [progressionStyle, setProgressionStyle] = useState<ProgressionStyle>('pop');
  const [complexity, setComplexity] = useState(0.5);
  const [tension, setTension] = useState(0.5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type?: 'success' | 'error' } | null>(null);

  useEffect(() => {
    playExportController.setPlayStateChangeListener(setIsPlaying);
    generatePattern();
  }, []);

  const regeneratePattern = (
    newDensity: number = density,
    newOctave: number = octave,
    newChordType: ChordType = chordType,
    newStyle: ProgressionStyle = progressionStyle,
    newComplexity: number = complexity,
    newTension: number = tension
  ) => {
    const newPattern = patternFactory.generateChordPattern(
      newDensity, 
      newOctave, 
      newChordType, 
      newStyle, 
      newComplexity, 
      newTension
    );
    setPattern(newPattern);
  };

  const generatePattern = () => {
    regeneratePattern();
  };

  const handleDensityChange = (newDensity: number) => {
    setDensity(newDensity);
    regeneratePattern(newDensity);
  };

  const handleOctaveChange = (newOctave: number) => {
    setOctave(newOctave);
    regeneratePattern(density, newOctave);
  };

  const handleChordTypeChange = (newType: ChordType) => {
    setChordType(newType);
    regeneratePattern(density, octave, newType);
  };

  const handleProgressionStyleChange = (newStyle: ProgressionStyle) => {
    setProgressionStyle(newStyle);
    regeneratePattern(density, octave, chordType, newStyle);
  };

  const handleComplexityChange = (newComplexity: number) => {
    setComplexity(newComplexity);
    regeneratePattern(density, octave, chordType, progressionStyle, newComplexity);
  };

  const handleTensionChange = (newTension: number) => {
    setTension(newTension);
    regeneratePattern(density, octave, chordType, progressionStyle, complexity, newTension);
  };

  const handlePlay = () => {
    if (pattern) {
      if (isPlaying) {
        playExportController.stop();
      } else {
        playExportController.play(pattern);
      }
    }
  };

  const handleReset = () => {
    generatePattern();
  };

  const handleClear = () => {
    setPattern(null);
  };

  const handleTemplateLoad = (template: Template) => {
    setPattern(template.pattern);
    if (template.density !== undefined) setDensity(template.density);
    if (template.octave !== undefined) setOctave(template.octave);
  };

  const showSnackbar = (message: string, type?: 'success' | 'error') => {
    setSnackbar({ message, type });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <h2 style={{ 
        color: '#ecf0f1', 
        marginBottom: '20px',
        fontSize: '28px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
      }}>
        Chord Generator
      </h2>
      
      <AudioVisualizer isPlaying={isPlaying} />
      
      <div style={{ 
        display: 'flex', 
        gap: '20px', 
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        <TimingControls />
        <DensityControl value={density} onChange={handleDensityChange} />
        <OctaveControl value={octave} onChange={handleOctaveChange} />
        <ResetClearControls onReset={handleReset} onClear={handleClear} />
      </div>

      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '15px',
        marginBottom: '20px'
      }}>
        <ProgressionStyleControl 
          value={progressionStyle} 
          onChange={handleProgressionStyleChange} 
        />
        <ComplexityControl 
          value={complexity} 
          onChange={handleComplexityChange} 
        />
        <TensionControl 
          value={tension} 
          onChange={handleTensionChange} 
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <ChordTypeControl 
          value={chordType} 
          onChange={handleChordTypeChange} 
        />
      </div>

      <TemplateControls
        scope="chords"
        currentPattern={pattern}
        onLoad={handleTemplateLoad}
        onShowMessage={showSnackbar}
      />

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handlePlay}
          style={{
            padding: '15px 40px',
            backgroundColor: isPlaying ? '#e74c3c' : '#27ae60',
            color: 'white',
            border: isPlaying ? '2px solid #c0392b' : '2px solid #229954',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            boxShadow: isPlaying 
              ? '0 4px 15px rgba(231, 76, 60, 0.4)' 
              : '0 4px 15px rgba(39, 174, 96, 0.4)',
            transition: 'all 0.3s ease'
          }}
        >
          {isPlaying ? '⏸ Stop' : '▶ Play'}
        </button>
      </div>

      <PatternPadEditor pattern={pattern} isPlaying={isPlaying} />

      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </div>
  );
};
