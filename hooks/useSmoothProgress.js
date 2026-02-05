import { useState, useEffect, useRef } from "react";

export function useSmoothProgress(startFetchingJS) {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [internalProgress, setInternalProgress] = useState(0);

  const isLibraryLoaded = useRef(false);

  useEffect(() => {
    if (!startFetchingJS) return;

    let stopSub = false;

    const loadDrei = async () => {
      try {
        const { useProgress } = await import("@react-three/drei");
        isLibraryLoaded.current = true;

        const unsub = useProgress.subscribe((state) => {
          if (!stopSub) setInternalProgress(state.progress);
        });

        return unsub;
      } catch (err) {}
    };

    const unsubPromise = loadDrei();

    return () => {
      stopSub = true;
      unsubPromise.then((unsub) => unsub?.());
    };
  }, [startFetchingJS]);

  useEffect(() => {
    if (!startFetchingJS) return;

    let animationFrame;
    const update = () => {
      setSmoothProgress((prev) => {
        if (internalProgress <= prev) {
          return prev;
        }
        const diff = internalProgress - prev;
        if (diff < 0.1) return internalProgress;
        return prev + diff * 0.05;
      });
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [internalProgress, startFetchingJS]);

  useEffect(() => {
    if (internalProgress === 100 && smoothProgress >= 99.9) {
      const timeout = setTimeout(() => setIsLoading(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [internalProgress, smoothProgress]);

  return { smoothProgress, isLoading };
}
