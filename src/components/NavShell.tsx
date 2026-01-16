import { useState } from 'react';
import { TransportBar } from '../components/TransportBar';
import { playExportController } from '../services/PlayExportController';
import { ChordGeneratorScreen } from '../screens/ChordGeneratorScreen';
import { MelodyGeneratorScreen } from '../screens/MelodyGeneratorScreen';
import { BasslineGeneratorScreen } from '../screens/BasslineGeneratorScreen';

type Route = 'chords' | 'melody' | 'bassline';

export const NavShell: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<Route>('chords');

  const handleNavigate = (route: Route) => {
    playExportController.stopAll();
    setCurrentRoute(route);
  };

  const handleStopAll = () => {
    playExportController.stopAll();
  };

  const getRouteLabel = (): string => {
    switch (currentRoute) {
      case 'chords':
        return 'Chord Generator';
      case 'melody':
        return 'Melody Generator';
      case 'bassline':
        return 'Bassline Generator';
      default:
        return 'Music Generator';
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)'
    }}>
      <TransportBar 
        routeLabel={getRouteLabel()} 
        onStopAll={handleStopAll} 
      />
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        padding: '15px 20px',
        background: 'rgba(22, 33, 62, 0.8)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <button
          onClick={() => handleNavigate('chords')}
          style={{
            padding: '12px 24px',
            backgroundColor: currentRoute === 'chords' ? '#3498db' : 'rgba(127, 140, 141, 0.3)',
            color: 'white',
            border: currentRoute === 'chords' ? '2px solid #2980b9' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: currentRoute === 'chords' ? 'bold' : 'normal',
            fontSize: '14px',
            boxShadow: currentRoute === 'chords' ? '0 4px 15px rgba(52, 152, 219, 0.4)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          🎹 Chords
        </button>
        <button
          onClick={() => handleNavigate('melody')}
          style={{
            padding: '12px 24px',
            backgroundColor: currentRoute === 'melody' ? '#3498db' : 'rgba(127, 140, 141, 0.3)',
            color: 'white',
            border: currentRoute === 'melody' ? '2px solid #2980b9' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: currentRoute === 'melody' ? 'bold' : 'normal',
            fontSize: '14px',
            boxShadow: currentRoute === 'melody' ? '0 4px 15px rgba(52, 152, 219, 0.4)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          🎵 Melody
        </button>
        <button
          onClick={() => handleNavigate('bassline')}
          style={{
            padding: '12px 24px',
            backgroundColor: currentRoute === 'bassline' ? '#3498db' : 'rgba(127, 140, 141, 0.3)',
            color: 'white',
            border: currentRoute === 'bassline' ? '2px solid #2980b9' : '2px solid transparent',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: currentRoute === 'bassline' ? 'bold' : 'normal',
            fontSize: '14px',
            boxShadow: currentRoute === 'bassline' ? '0 4px 15px rgba(52, 152, 219, 0.4)' : 'none',
            transition: 'all 0.3s ease'
          }}
        >
          🎸 Bassline
        </button>
      </div>

      <div style={{ 
        background: 'transparent',
        minHeight: 'calc(100vh - 140px)',
        padding: '20px'
      }}>
        {currentRoute === 'chords' && <ChordGeneratorScreen />}
        {currentRoute === 'melody' && <MelodyGeneratorScreen />}
        {currentRoute === 'bassline' && <BasslineGeneratorScreen />}
      </div>
    </div>
  );
};
