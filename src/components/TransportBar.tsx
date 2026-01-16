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
      padding: '15px 20px',
      background: 'linear-gradient(90deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%)',
      color: '#ecf0f1',
      borderBottom: '2px solid rgba(52, 152, 219, 0.3)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ 
        fontSize: '20px', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
      }}>
        <span style={{ fontSize: '24px' }}>🎵</span>
        {routeLabel}
      </div>
      <button
        onClick={onStopAll}
        style={{
          padding: '10px 20px',
          backgroundColor: '#e74c3c',
          color: 'white',
          border: '2px solid #c0392b',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '14px',
          boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)',
          transition: 'all 0.3s ease'
        }}
      >
        ⏹ Stop All
      </button>
    </div>
  );
};
