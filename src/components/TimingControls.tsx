import { useState } from 'react';
import { userPrefsStore } from '../stores/UserPrefsStore';
import { transportEngine } from '../services/TransportEngine';

interface TimingControlsProps {
  onBPMChange?: (bpm: number) => void;
  onQuantizeChange?: (quantize: string) => void;
}

export const TimingControls: React.FC<TimingControlsProps> = ({ onBPMChange, onQuantizeChange }) => {
  const [bpm, setBpm] = useState(userPrefsStore.getBPM());
  const [quantize, setQuantize] = useState(userPrefsStore.getQuantize());

  const handleBPMChange = (value: number) => {
    setBpm(value);
    userPrefsStore.setBPM(value);
    transportEngine.setBPM(value);
    onBPMChange?.(value);
  };

  const handleQuantizeChange = (value: string) => {
    setQuantize(value);
    userPrefsStore.setQuantize(value);
    onQuantizeChange?.(value);
  };

  return (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
      <div>
        <label style={{ marginRight: '8px' }}>BPM:</label>
        <input
          type="number"
          value={bpm}
          onChange={(e) => handleBPMChange(Number(e.target.value))}
          min={40}
          max={240}
          style={{ width: '70px', padding: '4px' }}
        />
      </div>
      <div>
        <label style={{ marginRight: '8px' }}>Quantize:</label>
        <select
          value={quantize}
          onChange={(e) => handleQuantizeChange(e.target.value)}
          style={{ padding: '4px' }}
        >
          <option value="4n">1/4</option>
          <option value="8n">1/8</option>
          <option value="16n">1/16</option>
          <option value="32n">1/32</option>
        </select>
      </div>
    </div>
  );
};
