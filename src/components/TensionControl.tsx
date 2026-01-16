import { useState, useEffect } from 'react';

interface TensionControlProps {
  value: number;
  onChange: (tension: number) => void;
}

export const TensionControl: React.FC<TensionControlProps> = ({ value, onChange }) => {
  const [tension, setTension] = useState(value);

  useEffect(() => {
    setTension(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setTension(newValue);
    onChange(newValue);
  };

  // Color interpolation from consonant (green) to dissonant (red)
  const getColor = (val: number) => {
    const r = Math.floor(39 + (231 - 39) * val);
    const g = Math.floor(174 - (174 - 76) * val);
    const b = Math.floor(96 - (96 - 60) * val);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const currentColor = getColor(tension);

  return (
    <div style={{ 
      padding: '15px',
      backgroundColor: 'rgba(52, 73, 94, 0.3)',
      borderRadius: '8px',
      border: '1px solid rgba(52, 152, 219, 0.3)',
      minWidth: '250px'
    }}>
      <label style={{ 
        display: 'block',
        marginBottom: '10px',
        color: '#ecf0f1',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        Tension:
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ 
          fontSize: '12px',
          color: '#95a5a6',
          minWidth: '65px'
        }}>
          Consonant
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={tension}
          onChange={handleChange}
          style={{
            flex: 1,
            height: '8px',
            borderRadius: '4px',
            appearance: 'none',
            background: `linear-gradient(to right, #27ae60, #e74c3c)`,
            cursor: 'pointer'
          }}
        />
        <span style={{ 
          fontSize: '12px',
          color: '#95a5a6',
          minWidth: '60px'
        }}>
          Dissonant
        </span>
        <span style={{ 
          color: currentColor,
          fontWeight: 'bold',
          fontSize: '14px',
          minWidth: '35px',
          textShadow: `0 0 10px ${currentColor}60`
        }}>
          {tension.toFixed(1)}
        </span>
      </div>
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${currentColor};
          cursor: pointer;
          box-shadow: 0 0 10px ${currentColor};
          border: 2px solid white;
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${currentColor};
          cursor: pointer;
          box-shadow: 0 0 10px ${currentColor};
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};
