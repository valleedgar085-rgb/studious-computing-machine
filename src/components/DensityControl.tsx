import { useState, useEffect } from 'react';
import { userPrefsStore } from '../stores/UserPrefsStore';

interface DensityControlProps {
  value?: number;
  onChange: (density: number) => void;
}

export const DensityControl: React.FC<DensityControlProps> = ({ value, onChange }) => {
  const [density, setDensity] = useState(value ?? userPrefsStore.getDensity());

  useEffect(() => {
    if (value !== undefined) {
      setDensity(value);
    }
  }, [value]);

  const handleChange = (newValue: number) => {
    setDensity(newValue);
    userPrefsStore.setDensity(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <label>Density:</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={density}
        onChange={(e) => handleChange(Number(e.target.value))}
        style={{ width: '150px' }}
      />
      <span>{density.toFixed(1)}</span>
    </div>
  );
};
