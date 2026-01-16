import { useState, useEffect } from 'react';
import { ProgressionStyle } from '../services/MusicTheory';

interface ProgressionStyleControlProps {
  value: ProgressionStyle;
  onChange: (style: ProgressionStyle) => void;
}

export const ProgressionStyleControl: React.FC<ProgressionStyleControlProps> = ({ value, onChange }) => {
  const [style, setStyle] = useState<ProgressionStyle>(value);
  
  const styles: ProgressionStyle[] = ['classical', 'pop', 'jazz', 'blues'];
  const styleColors: Record<ProgressionStyle, string> = {
    classical: '#3498db',
    pop: '#e74c3c',
    jazz: '#9b59b6',
    blues: '#f39c12'
  };

  useEffect(() => {
    setStyle(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = Number(e.target.value);
    const newStyle = styles[index];
    setStyle(newStyle);
    onChange(newStyle);
  };

  const currentIndex = styles.indexOf(style);
  const currentColor = styleColors[style];

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
        Progression Style:
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <input
          type="range"
          min="0"
          max={styles.length - 1}
          step="1"
          value={currentIndex}
          onChange={handleChange}
          style={{
            flex: 1,
            height: '8px',
            borderRadius: '4px',
            appearance: 'none',
            background: `linear-gradient(to right, 
              ${styleColors.classical} 0%, 
              ${styleColors.classical} 25%, 
              ${styleColors.pop} 25%, 
              ${styleColors.pop} 50%, 
              ${styleColors.jazz} 50%, 
              ${styleColors.jazz} 75%, 
              ${styleColors.blues} 75%, 
              ${styleColors.blues} 100%)`,
            cursor: 'pointer'
          }}
        />
        <span style={{ 
          color: currentColor,
          fontWeight: 'bold',
          fontSize: '14px',
          minWidth: '80px',
          textTransform: 'capitalize',
          textShadow: `0 0 10px ${currentColor}60`
        }}>
          {style}
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
