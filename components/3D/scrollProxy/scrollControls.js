import React, { useEffect, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { invalidate, useFrame, useThree } from "@react-three/fiber";

// Constants
const DEFAULT_DAMPING = 0.2;
const DEFAULT_MAX_SPEED = Infinity;
const DEFAULT_EPS = 0.00001;
const DEFAULT_PAGES = 2;

/**
 * Calculate the scroll threshold based on document and viewport dimensions
 */
const getScrollThreshold = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const containerHeight = window.innerHeight;
  return Math.max(scrollHeight - containerHeight, 1);
};

// Create context with proper typing
const ScrollContext = React.createContext(null);

/**
 * Custom hook for scroll-based animations with smooth easing
 * @param {number} damping - Damping factor for easing (0-1)
 * @param {number} maxSpeed - Maximum speed for easing
 * @param {number} eps - Epsilon threshold for animation updates
 */
export function useScroll(
  damping = DEFAULT_DAMPING,
  maxSpeed = DEFAULT_MAX_SPEED,
  eps = DEFAULT_EPS
) {
  const globalState = React.useContext(ScrollContext);
  const localStateRef = useRef({
    offset: 0,
    delta: 0,
    lastOffset: 0,
  });

  const { gl } = useThree();

  useFrame((_, frameDelta) => {
    console.log(gl.info.render.triangles);
    console.log(gl.info.render.calls);
    if (!globalState?.scroll) return;

    const localState = localStateRef.current;
    const previousOffset = localState.offset;

    // Apply easing to offset
    easing.damp(
      localState,
      "offset",
      globalState.scroll.current,
      damping,
      frameDelta,
      maxSpeed,
      (t) => {
        return 1 / (1 + t + 0.48 * t * t + 0.235 * t * t * t);
      },
      eps
    );

    // Calculate delta (rate of change)
    const deltaValue = Math.abs(previousOffset - localState.offset);
    easing.damp(
      localState,
      "delta",
      deltaValue,
      damping,
      frameDelta,
      maxSpeed,
      undefined,
      eps
    );

    // Only invalidate if there's meaningful change
    if (localState.delta > eps) {
      invalidate();
    }
  });

  // Memoize the API object to prevent unnecessary re-renders
  const scrollAPI = useMemo(() => {
    if (!globalState) return null;

    const localState = localStateRef.current;

    return {
      eps,
      damping,
      get offset() {
        return localState.offset;
      },
      get delta() {
        return localState.delta;
      },
      scroll: globalState.scroll,

      /**
       * Returns clamped offset value between 0 and 1
       */
      clampedOffset() {
        return THREE.MathUtils.clamp(localState.offset, 0, 1);
      },

      /**
       * Maps scroll progress to 0-1 range for a specific section
       * @param {number} from - Start position (0-1)
       * @param {number} distance - Section length (0-1)
       * @param {number} margin - Extra margin around the section
       */
      range(from, distance, margin = 0) {
        const start = from - margin;
        const end = start + distance + margin * 2;
        const { offset } = localState;

        if (offset < start) return 0;
        if (offset > end) return 1;
        return (offset - start) / (end - start);
      },

      /**
       * Returns a sine curve (0-1-0) for smooth transitions
       * @param {number} from - Start position (0-1)
       * @param {number} distance - Section length (0-1)
       * @param {number} margin - Extra margin around the section
       */
      curve(from, distance, margin = 0) {
        const rangeValue = this.range(from, distance, margin);
        return Math.sin(rangeValue * Math.PI);
      },

      /**
       * Returns boolean indicating if scroll position is within range
       * @param {number} from - Start position (0-1)
       * @param {number} distance - Section length (0-1)
       * @param {number} margin - Extra margin around the section
       */
      visible(from, distance, margin = 0) {
        const start = from - margin;
        const end = start + distance + margin * 2;
        const { offset } = localState;
        return offset >= start && offset <= end;
      },
    };
  }, [damping, eps, globalState]);

  return scrollAPI;
}

/**
 * Main ScrollControls provider component
 */
export default function ScrollControls({ children }) {
  const scrollRef = useRef(0);
  const scrollThresholdRef = useRef(1);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      scroll: scrollRef,
    }),
    []
  );

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const threshold = scrollThresholdRef.current;
    scrollRef.current = Math.min(
      currentScrollY / scrollThresholdRef.current,
      1
    );
  }, []);

  // Memoized resize handler
  const handleResize = useCallback(() => {
    scrollThresholdRef.current = getScrollThreshold();
    handleScroll(); // Update scroll position after resize
  }, [handleScroll]);

  useEffect(() => {
    // Initialize
    handleResize();

    // Add event listeners with passive scrolling for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
}

/**
 * Creates a proxy div to enable scrolling for the specified number of pages
 * @param {number} pages - Number of viewport heights to enable scrolling
 */
export function ScrollControlsProxy({ pages = DEFAULT_PAGES }) {
  const style = useMemo(
    () => ({
      minHeight: `${pages * 100}vh`,
    }),
    [pages]
  );

  return (
    <div className="w-full pointer-events-none select-none" style={style} />
  );
}

/**
 * Hook to attach a callback to scroll events with normalized scroll progress
 * @param {Function} callback - Function to call with scroll progress (0-1)
 */
export function AttachCallbackToScrollEvent(callback) {
  const scrollThresholdRef = useRef(1);
  const callbackRef = useRef(callback);

  // Keep callback ref up to date
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Memoized scroll handler
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const normalizedScroll = Math.min(scrollY / scrollThresholdRef.current, 1);
    callbackRef.current(normalizedScroll);
  }, []);

  // Memoized resize handler
  const handleResize = useCallback(() => {
    scrollThresholdRef.current = getScrollThreshold();
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    // Initialize
    handleResize();

    // Add event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);
}
