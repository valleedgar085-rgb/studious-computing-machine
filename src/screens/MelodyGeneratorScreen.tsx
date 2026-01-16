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

export const MelodyGeneratorScreen: React.FC = () => {
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
    const newPattern = patternFactory.generateMelodyPattern(density, octave);
    setPattern(newPattern);
  };

  const handleDensityChange = (newDensity: number) => {
    setDensity(newDensity);
    const newPattern = patternFactory.generateMelodyPattern(newDensity, octave);
    setPattern(newPattern);
  };

  const handleOctaveChange = (newOctave: number) => {
    setOctave(newOctave);
    const newPattern = patternFactory.generateMelodyPattern(density, newOctave);
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
    <div style={{ padding: '20px' }}>
      <h2>Melody Generator</h2>
      
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
        scope="melody"
        currentPattern={pattern}
        onLoad={handleTemplateLoad}
        onShowMessage={showSnackbar}
      />

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={handlePlay}
          style={{
            padding: '12px 24px',
            backgroundColor: isPlaying ? '#e74c3c' : '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>

      <PatternPadEditor pattern={pattern} />

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
