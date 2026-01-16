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

export const ChordGeneratorScreen: React.FC = () => {
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [density, setDensity] = useState(userPrefsStore.getDensity());
  const [octave, setOctave] = useState(userPrefsStore.getOctave());
  const [isPlaying, setIsPlaying] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type?: 'success' | 'error' } | null>(null);

  useEffect(() => {
    playExportController.setPlayStateChangeListener(setIsPlaying);
    generatePattern();
  }, []);

  const generatePattern = () => {
    const newPattern = patternFactory.generateChordPattern(density, octave);
    setPattern(newPattern);
  };

  const handleDensityChange = (newDensity: number) => {
    setDensity(newDensity);
    const newPattern = patternFactory.generateChordPattern(newDensity, octave);
    setPattern(newPattern);
  };

  const handleOctaveChange = (newOctave: number) => {
    setOctave(newOctave);
    const newPattern = patternFactory.generateChordPattern(density, newOctave);
    setPattern(newPattern);
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
