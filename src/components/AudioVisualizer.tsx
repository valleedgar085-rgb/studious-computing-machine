import { useEffect, useRef, useState } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
}

const BAR_COUNT = 32;

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [bars] = useState(() => Array.from({ length: BAR_COUNT }, () => Math.random()));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const barWidth = width / BAR_COUNT;

    let phase = 0;

    const draw = () => {
      ctx.fillStyle = 'rgba(26, 26, 46, 0.3)';
      ctx.fillRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#e74c3c');
      gradient.addColorStop(0.5, '#f39c12');
      gradient.addColorStop(1, '#2ecc71');

      for (let i = 0; i < BAR_COUNT; i++) {
        const barHeight = isPlaying
          ? (Math.sin(phase + i * 0.5) * 0.5 + 0.5) * height * 0.7 + height * 0.1
          : bars[i] * height * 0.3;

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth + 2,
          height - barHeight,
          barWidth - 4,
          barHeight
        );

        // Add glow effect
        if (isPlaying) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#2ecc71';
          ctx.fillRect(
            i * barWidth + 2,
            height - barHeight,
            barWidth - 4,
            barHeight
          );
          ctx.shadowBlur = 0;
        }
      }

      if (isPlaying) {
        phase += 0.08;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [isPlaying, bars]);

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      marginBottom: '20px',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={150}
        style={{
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          display: 'block'
        }}
      />
    </div>
  );
};
