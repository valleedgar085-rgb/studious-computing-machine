import { useState, useEffect } from 'react';
import { Pattern } from '../types';

interface PatternPadEditorProps {
  pattern: Pattern | null;
  onPatternChange?: (pattern: Pattern) => void;
  isPlaying?: boolean;
}

export const PatternPadEditor: React.FC<PatternPadEditorProps> = ({ pattern, isPlaying = false }) => {
  const [grid, setGrid] = useState<boolean[][]>([]);
  const [activeColumn, setActiveColumn] = useState<number>(0);

  useEffect(() => {
    if (pattern) {
      rebuildGrid(pattern);
    } else {
      setGrid([]);
    }
  }, [pattern]);

  useEffect(() => {
    if (isPlaying && grid.length > 0) {
      const interval = setInterval(() => {
        setActiveColumn((prev) => (prev + 1) % (grid[0]?.length || 16));
      }, 125); // 8th notes at 120 BPM
      return () => clearInterval(interval);
    } else {
      setActiveColumn(0);
    }
  }, [isPlaying, grid]);

  const rebuildGrid = (p: Pattern) => {
    const rows = 12;
    const cols = 16;
    const newGrid: boolean[][] = Array(rows).fill(null).map(() => Array(cols).fill(false));
    
    p.notes.forEach(note => {
      const col = Math.floor((note.time / p.duration) * cols);
      const row = Math.floor(Math.random() * rows);
      if (col < cols && row < rows) {
        newGrid[row][col] = true;
      }
    });
    
    setGrid(newGrid);
  };

  const toggleCell = (row: number, col: number) => {
    const newGrid = grid.map((r, i) => 
      i === row ? r.map((c, j) => j === col ? !c : c) : r
    );
    setGrid(newGrid);
  };

  if (!pattern) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center', 
        color: '#95a5a6',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ fontSize: '18px', marginBottom: '10px' }}>No pattern loaded</div>
        <div style={{ fontSize: '14px', opacity: 0.7 }}>Generate or load a pattern to begin</div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${grid[0]?.length || 16}, 1fr)`,
        gap: '3px',
        backgroundColor: 'rgba(15, 52, 96, 0.3)',
        padding: '15px',
        borderRadius: '8px',
        maxWidth: '100%',
        overflow: 'auto'
      }}>
        {grid.map((row, rowIdx) => 
          row.map((cell, colIdx) => {
            const isActive = isPlaying && colIdx === activeColumn;
            const cellActive = cell && isActive;
            
            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                onClick={() => toggleCell(rowIdx, colIdx)}
                style={{
                  aspectRatio: '1',
                  minWidth: '20px',
                  minHeight: '20px',
                  backgroundColor: cell 
                    ? (cellActive ? '#f39c12' : '#2ecc71')
                    : (isActive ? 'rgba(52, 152, 219, 0.3)' : 'rgba(44, 62, 80, 0.5)'),
                  border: isActive 
                    ? '2px solid #3498db' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  borderRadius: '4px',
                  transition: 'all 0.1s ease',
                  boxShadow: cellActive 
                    ? '0 0 15px rgba(243, 156, 18, 0.8), 0 0 30px rgba(243, 156, 18, 0.4)'
                    : cell
                    ? '0 0 8px rgba(46, 204, 113, 0.5)'
                    : 'none',
                  animation: cellActive ? 'pulse 0.3s ease-in-out' : 'none'
                }}
              />
            );
          })
        )}
      </div>
      <div style={{
        marginTop: '15px',
        fontSize: '12px',
        color: '#95a5a6',
        textAlign: 'center',
        opacity: 0.8
      }}>
        Click cells to toggle notes • {isPlaying ? '▶ Playing' : '⏸ Paused'}
      </div>
    </div>
  );
};
