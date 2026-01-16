import { useState, useEffect } from 'react';
import { ChordType } from '../services/MusicTheory';

interface ChordTypeControlProps {
  value: ChordType;
  onChange: (type: ChordType) => void;
}

export const ChordTypeControl: React.FC<ChordTypeControlProps> = ({ value, onChange }) => {
  const [selectedType, setSelectedType] = useState<ChordType>(value);
  
  const chordTypes: { value: ChordType; label: string; color: string }[] = [
    { value: 'major', label: 'Major', color: '#3498db' },
    { value: 'minor', label: 'Minor', color: '#9b59b6' },
    { value: 'major7', label: 'Major 7th', color: '#1abc9c' },
    { value: 'minor7', label: 'Minor 7th', color: '#8e44ad' },
    { value: 'dominant7', label: 'Dominant 7th', color: '#e67e22' },
    { value: 'diminished', label: 'Diminished', color: '#e74c3c' },
    { value: 'augmented', label: 'Augmented', color: '#f39c12' },
    { value: 'sus2', label: 'Sus2', color: '#16a085' },
    { value: 'sus4', label: 'Sus4', color: '#27ae60' }
  ];

  useEffect(() => {
    setSelectedType(value);
  }, [value]);

  const handleChange = (type: ChordType) => {
    setSelectedType(type);
    onChange(type);
  };

  return (
    <div style={{ 
      padding: '15px',
      backgroundColor: 'rgba(52, 73, 94, 0.3)',
      borderRadius: '8px',
      border: '1px solid rgba(52, 152, 219, 0.3)'
    }}>
      <label style={{ 
        display: 'block',
        marginBottom: '10px',
        color: '#ecf0f1',
        fontWeight: 'bold',
        fontSize: '14px'
      }}>
        Chord Type:
      </label>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '8px'
      }}>
        {chordTypes.map(({ value: typeValue, label, color }) => (
          <button
            key={typeValue}
            onClick={() => handleChange(typeValue)}
            style={{
              padding: '8px 12px',
              backgroundColor: selectedType === typeValue 
                ? color 
                : 'rgba(52, 73, 94, 0.5)',
              color: selectedType === typeValue ? 'white' : '#bdc3c7',
              border: selectedType === typeValue 
                ? `2px solid ${color}` 
                : '2px solid rgba(189, 195, 199, 0.3)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: selectedType === typeValue ? 'bold' : 'normal',
              transition: 'all 0.3s ease',
              boxShadow: selectedType === typeValue 
                ? `0 2px 8px ${color}40` 
                : 'none'
            }}
            onMouseEnter={(e) => {
              if (selectedType !== typeValue) {
                e.currentTarget.style.backgroundColor = 'rgba(52, 73, 94, 0.7)';
                e.currentTarget.style.borderColor = 'rgba(189, 195, 199, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedType !== typeValue) {
                e.currentTarget.style.backgroundColor = 'rgba(52, 73, 94, 0.5)';
                e.currentTarget.style.borderColor = 'rgba(189, 195, 199, 0.3)';
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
