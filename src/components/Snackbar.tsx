import { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({ 
  message, 
  type = 'info', 
  duration = 3000,
  onClose 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const backgroundColor = 
    type === 'success' ? '#27ae60' :
    type === 'error' ? '#e74c3c' :
    '#3498db';

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor,
      color: 'white',
      padding: '12px 24px',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      zIndex: 1000,
      minWidth: '200px',
      textAlign: 'center'
    }}>
      {message}
    </div>
  );
};
