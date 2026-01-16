interface TransportBarProps {
  routeLabel: string;
  onStopAll: () => void;
}

export const TransportBar: React.FC<TransportBarProps> = ({ routeLabel, onStopAll }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 20px',
      backgroundColor: '#2c3e50',
      color: '#ecf0f1',
      borderBottom: '2px solid #34495e'
    }}>
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
        {routeLabel}
      </div>
      <button
        onClick={onStopAll}
        style={{
          padding: '8px 16px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Stop All
      </button>
    </div>
  );
};
