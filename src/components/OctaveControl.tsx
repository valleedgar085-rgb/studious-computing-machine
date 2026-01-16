import { useState, useEffect } from 'react';
import { userPrefsStore } from '../stores/UserPrefsStore';

interface OctaveControlProps {
  value?: number;
  onChange: (octave: number) => void;
}

export const OctaveControl: React.FC<OctaveControlProps> = ({ value, onChange }) => {
  const [octave, setOctave] = useState(value ?? userPrefsStore.getOctave());

  useEffect(() => {
    if (value !== undefined) {
      setOctave(value);
    }
  }, [value]);

  const handleChange = (newValue: number) => {
    setOctave(newValue);
    userPrefsStore.setOctave(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label>Octave:</label>
      <input
        type="number"
        min="1"
        max="7"
        value={octave}
        onChange={(e) => handleChange(Number(e.target.value))}
        style={{ width: '60px', padding: '4px' }}
      />
    </div>
  );
};
