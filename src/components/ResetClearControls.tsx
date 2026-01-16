interface ResetClearControlsProps {
  onReset: () => void;
  onClear: () => void;
}

export const ResetClearControls: React.FC<ResetClearControlsProps> = ({ onReset, onClear }) => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <button
        onClick={onReset}
        style={{
          padding: '8px 16px',
          backgroundColor: '#3498db',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Reset
      </button>
      <button
        onClick={onClear}
        style={{
          padding: '8px 16px',
          backgroundColor: '#95a5a6',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Clear
      </button>
    </div>
  );
};
