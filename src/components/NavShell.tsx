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
    <div style={{ minHeight: '100vh', backgroundColor: '#34495e' }}>
      <TransportBar 
        routeLabel={getRouteLabel()} 
        onStopAll={handleStopAll} 
      />
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        padding: '10px 20px',
        backgroundColor: '#2c3e50',
        borderBottom: '1px solid #1a1a1a'
      }}>
        <button
          onClick={() => handleNavigate('chords')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentRoute === 'chords' ? '#3498db' : '#7f8c8d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: currentRoute === 'chords' ? 'bold' : 'normal'
          }}
        >
          Chords
        </button>
        <button
          onClick={() => handleNavigate('melody')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentRoute === 'melody' ? '#3498db' : '#7f8c8d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: currentRoute === 'melody' ? 'bold' : 'normal'
          }}
        >
          Melody
        </button>
        <button
          onClick={() => handleNavigate('bassline')}
          style={{
            padding: '10px 20px',
            backgroundColor: currentRoute === 'bassline' ? '#3498db' : '#7f8c8d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: currentRoute === 'bassline' ? 'bold' : 'normal'
          }}
        >
          Bassline
        </button>
      </div>

      <div style={{ backgroundColor: '#ecf0f1', minHeight: 'calc(100vh - 120px)' }}>
        {currentRoute === 'chords' && <ChordGeneratorScreen />}
        {currentRoute === 'melody' && <MelodyGeneratorScreen />}
        {currentRoute === 'bassline' && <BasslineGeneratorScreen />}
      </div>
    </div>
  );
};
