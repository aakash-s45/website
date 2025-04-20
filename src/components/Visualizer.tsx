'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './styles/Visualizer.module.css';

export default function Visualizer({ isPlaying }: { isPlaying: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [levels, setLevels] = useState<number[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      const fullWidth = container.offsetWidth;
      const visualizerWidth = fullWidth * 0.28;
      const barWidth = 5;
      const count = Math.floor(visualizerWidth / barWidth);
      setLevels(Array(count).fill(3)); // Initial height
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
  
    const getLevelForIndex = (index: number, total: number) => {
      // Create a symmetrical distribution curve (like a bell)
      const center = total / 2;
      const distanceFromCenter = Math.abs(index - center);
      const intensity = 1 - distanceFromCenter / center; // 1 at center, 0 at edges
      const base = 4;
      const max = 20;
      return Math.floor(base + intensity * Math.random() * (max - base));
    };
  
    if (isPlaying && levels.length > 0) {
      interval = setInterval(() => {
        setLevels(prev =>
          prev.map((_, i) => getLevelForIndex(i, prev.length))
        );
      }, 180);
    } else {
      setLevels(prev => prev.map(() => 6));
    }
  
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, levels.length]);
  

  return (
    <div ref={containerRef} className={styles.visualizer}>
      {levels.map((height, i) => (
        <span
          key={i}
          className={styles.bar}
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
}
