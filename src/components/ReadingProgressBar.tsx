import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ReadingProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  const [percent, setPercent] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const rounded = Math.round(latest * 100);
      setPercent(rounded);
      setIsVisible(latest > 0.01);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none"
    >
      {/* Background track (subtle translucent guide in light/dark mode) */}
      <div className="absolute inset-0 bg-slate-900/[0.04] dark:bg-white/[0.04]" />

      {/* Progress fill */}
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
      />

      {/* Leading tip glow beacon */}
      {isVisible && (
        <motion.div
          style={{
            left: `${percent}%`,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ duration: 0.1 }}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 dark:bg-cyan-200 shadow-[0_0_10px_#22d3ee,0_0_4px_#38bdf8] pointer-events-none"
        />
      )}
    </div>
  );
};
