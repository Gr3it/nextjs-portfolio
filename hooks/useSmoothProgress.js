import { useState, useEffect, useRef } from "react";

export function useSmoothProgress(startFetchingJS) {
  const [smoothProgress, setSmoothProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (!startFetchingJS) return;

    let stopSub = false;

    const loadDrei = async () => {
      try {
        const { useProgress } = await import("@react-three/drei");
        const initialState = useProgress.getState();
        setInternalProgress(initialState.progress);

        const unsub = useProgress.subscribe((state) => {
          if (!stopSub) setInternalProgress(state.progress);
        });

        return unsub;
      } catch (err) {
        console.error("Errore nel caricamento di Drei:", err);
      }
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
        if (internalProgress === 100 && prev < 100) {
          const target = prev + (100 - prev) * 0.1;
          return target > 99.9 ? 100 : target;
        }

        if (internalProgress <= prev) return prev;

        const diff = internalProgress - prev;
        return prev + diff * 0.05;
      });
      animationFrame = requestAnimationFrame(update);
    };

    animationFrame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrame);
  }, [internalProgress, startFetchingJS]);

  useEffect(() => {
    if (smoothProgress === 100) {
      const timeout = setTimeout(() => setIsLoading(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [smoothProgress]);

  return { smoothProgress, isLoading };
}
