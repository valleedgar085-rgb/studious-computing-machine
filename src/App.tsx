import { NavShell } from './components/NavShell';
import { transportEngine } from './services/TransportEngine';
import { userPrefsStore } from './stores/UserPrefsStore';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const prefs = userPrefsStore.getPreferences();
    transportEngine.setBPM(prefs.bpm);
  }, []);

  return <NavShell />;
}

export default App;
