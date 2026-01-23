// hooks/useSmoothProgress.js
import { useState, useEffect } from "react";
import { useProgress } from "@react-three/drei";

export function useSmoothProgress() {
  const { progress } = useProgress();
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let animationFrame;
    const update = () => {
      setSmoothProgress((prev) => {
        const diff = progress - prev;
        if (diff < 0.1) return progress;
        return prev + diff * 0.05;
      });
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [progress]);

  useEffect(() => {
    if (progress === 100 && smoothProgress >= 99.9) {
      const timeout = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [progress, smoothProgress]);

  return { smoothProgress, isLoading };
}
