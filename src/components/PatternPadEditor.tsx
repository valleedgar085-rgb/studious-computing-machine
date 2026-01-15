import { useState, useEffect } from 'react';
import { Pattern } from '../types';

interface PatternPadEditorProps {
  pattern: Pattern | null;
  onPatternChange?: (pattern: Pattern) => void;
}

export const PatternPadEditor: React.FC<PatternPadEditorProps> = ({ pattern }) => {
  const [grid, setGrid] = useState<boolean[][]>([]);

  useEffect(() => {
    if (pattern) {
      rebuildGrid(pattern);
    } else {
      setGrid([]);
    }
  }, [pattern]);

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
      <div style={{ padding: '20px', textAlign: 'center', color: '#7f8c8d' }}>
        No pattern loaded
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${grid[0]?.length || 16}, 20px)`,
        gap: '2px',
        backgroundColor: '#34495e',
        padding: '10px',
        borderRadius: '4px'
      }}>
        {grid.map((row, rowIdx) => 
          row.map((cell, colIdx) => (
            <div
              key={`${rowIdx}-${colIdx}`}
              onClick={() => toggleCell(rowIdx, colIdx)}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: cell ? '#2ecc71' : '#2c3e50',
                border: '1px solid #1a1a1a',
                cursor: 'pointer',
                borderRadius: '2px'
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};
