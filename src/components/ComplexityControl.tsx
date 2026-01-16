import { useState, useEffect } from 'react';

interface ComplexityControlProps {
  value: number;
  onChange: (complexity: number) => void;
}

export const ComplexityControl: React.FC<ComplexityControlProps> = ({ value, onChange }) => {
  const [complexity, setComplexity] = useState(value);

  useEffect(() => {
    setComplexity(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setComplexity(newValue);
    onChange(newValue);
  };

  // Color interpolation from simple (blue) to complex (purple)
  const getColor = (val: number) => {
    const r = Math.floor(52 + (155 - 52) * val);
    const g = Math.floor(152 - (152 - 89) * val);
    const b = Math.floor(219 - (219 - 182) * val);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const currentColor = getColor(complexity);

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
        Complexity:
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ 
          fontSize: '12px',
          color: '#95a5a6',
          minWidth: '45px'
        }}>
          Simple
        </span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={complexity}
          onChange={handleChange}
          style={{
            flex: 1,
            height: '8px',
            borderRadius: '4px',
            appearance: 'none',
            background: `linear-gradient(to right, #3498db, #9b59b6)`,
            cursor: 'pointer'
          }}
        />
        <span style={{ 
          fontSize: '12px',
          color: '#95a5a6',
          minWidth: '55px'
        }}>
          Complex
        </span>
        <span style={{ 
          color: currentColor,
          fontWeight: 'bold',
          fontSize: '14px',
          minWidth: '35px',
          textShadow: `0 0 10px ${currentColor}60`
        }}>
          {complexity.toFixed(1)}
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
