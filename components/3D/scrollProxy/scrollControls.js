import React, { useEffect, useRef, useCallback, useMemo } from "react";
import * as THREE from "three";
import { easing } from "maath";
import { invalidate, useFrame } from "@react-three/fiber";

// Constants
const DEFAULT_DAMPING = 0.2;
const DEFAULT_MAX_SPEED = Infinity;
const DEFAULT_EPS = 0.00001;
const DEFAULT_PAGES = 2;
const DEFAULT_DURATION = 2.0;

// Animation modes
export const ANIMATION_MODES = {
  DAMPING: "damping",
  ACCELERATION: "acceleration",
};

/**
 * Calculate the scroll threshold based on document and viewport dimensions
 */
const getScrollThreshold = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const containerHeight = window.innerHeight;
  return Math.max(scrollHeight - containerHeight, 1);
};

/**
 * 5th order (minimum jerk) polynomial trajectory vehicle
 */
class Vehicle1D {
  constructor(duration = DEFAULT_DURATION) {
    this.duration = duration;
    this.x = 0; // position (0-1)
    this.v = 0; // velocity
    this.a = 0; // acceleration
    this.timer = 0;
    this.target = 0;
    this.lastTarget = null;
    this.coeffs = null;
    this.isActive = false;
  }

  // Plan a 5th order (minimum jerk) polynomial trajectory
  plan(target) {
    this.timer = 0;
    this.target = THREE.MathUtils.clamp(target, 0, 1);

    const T = this.duration;
    const x0 = this.x;
    const v0 = this.v;
    const a0 = this.a;
    const xf = this.target;
    const vf = 0; // stop at target
    const af = 0; // no accel at stop

    // Polynomial form: x(t) = a*t^5 + b*t^4 + c*t^3 + d*t^2 + e*t + f
    const f = x0;
    const e = v0;
    const d = a0 / 2;

    const T2 = T * T;
    const T3 = T2 * T;
    const T4 = T3 * T;
    const T5 = T4 * T;

    // System of equations at t = T
    const A = [
      [T5, T4, T3],
      [5 * T4, 4 * T3, 3 * T2],
      [20 * T3, 12 * T2, 6 * T],
    ];
    const B = [xf - (d * T2 + e * T + f), vf - (2 * d * T + e), af - 2 * d];

    // Solve 3x3 system for [a, b, c]
    const det = this.determinant3x3(A);

    if (Math.abs(det) < 1e-10) {
      // Fallback to linear interpolation
      this.coeffs = {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: (xf - x0) / T,
        f: x0,
      };
    } else {
      const a =
        this.determinant3x3([
          [B[0], A[0][1], A[0][2]],
          [B[1], A[1][1], A[1][2]],
          [B[2], A[2][1], A[2][2]],
        ]) / det;

      const b =
        this.determinant3x3([
          [A[0][0], B[0], A[0][2]],
          [A[1][0], B[1], A[1][2]],
          [A[2][0], B[2], A[2][2]],
        ]) / det;

      const c =
        this.determinant3x3([
          [A[0][0], A[0][1], B[0]],
          [A[1][0], A[1][1], B[1]],
          [A[2][0], A[2][1], B[2]],
        ]) / det;

      this.coeffs = { a, b, c, d, e, f };
    }
  }

  // Calculate 3x3 determinant
  determinant3x3(matrix) {
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  update(target, frameDelta) {
    const clampedTarget = THREE.MathUtils.clamp(target, 0, 1);

    // Replan if target changed significantly
    if (
      this.lastTarget === null ||
      Math.abs(clampedTarget - this.lastTarget) > 0.001
    ) {
      this.plan(clampedTarget);
      this.lastTarget = clampedTarget;
      this.isActive = true;
    }

    if (this.duration <= 0) {
      this.isActive = false;
      return this.x;
    }

    this.timer = Math.min(this.timer + frameDelta, this.duration);
    const t = this.timer;

    if (!this.coeffs) {
      this.isActive = false;
      return this.x;
    }

    const { a, b, c, d, e, f } = this.coeffs;
    const t2 = t * t;
    const t3 = t2 * t;
    const t4 = t3 * t;
    const t5 = t4 * t;

    // Calculate position, velocity, acceleration
    this.x = THREE.MathUtils.clamp(
      a * t5 + b * t4 + c * t3 + d * t2 + e * t + f,
      0,
      1
    );
    this.v = 5 * a * t4 + 4 * b * t3 + 3 * c * t2 + 2 * d * t + e;
    this.a = 20 * a * t3 + 12 * b * t2 + 6 * c * t + 2 * d;

    // Check if trajectory is complete
    const distanceToTarget = Math.abs(this.target - this.x);
    const isAtRest = Math.abs(this.v) < 0.001;
    const hasReachedTime = t >= this.duration;

    this.isActive = !hasReachedTime || distanceToTarget > 0.001 || !isAtRest;

    return this.x;
  }

  reset() {
    this.x = 0;
    this.v = 0;
    this.a = 0;
    this.timer = 0;
    this.target = 0;
    this.lastTarget = null;
    this.coeffs = null;
    this.isActive = false;
  }
}

// Create context
const ScrollContext = React.createContext(null);

/**
 * Custom hook for scroll-based animations
 */
export function useScroll(options = {}) {
  const {
    mode = ANIMATION_MODES.ACCELERATION,
    damping = DEFAULT_DAMPING,
    maxSpeed = DEFAULT_MAX_SPEED,
    eps = DEFAULT_EPS,
    duration = DEFAULT_DURATION,
    from = 0,
    to = 1,
  } = options;

  const globalState = React.useContext(ScrollContext);
  const offsetRef = useRef(0); // Initialize with 0 instead of undefined

  // Validate interval
  const start = Math.max(0, Math.min(from, to));
  const end = Math.min(1, Math.max(from, to));
  const distance = end - start;

  // State for damping mode
  const dampingStateRef = useRef({ offset: 0, delta: 0 });

  // Vehicle for acceleration mode - automatically created
  const vehicleRef = useRef(null);

  // Initialize vehicle for acceleration mode
  useEffect(() => {
    if (mode === ANIMATION_MODES.ACCELERATION) {
      vehicleRef.current = new Vehicle1D(duration);
    }

    return () => {
      if (vehicleRef.current) {
        vehicleRef.current.reset();
        vehicleRef.current = null;
      }
    };
  }, [mode, duration]);

  useFrame((_, frameDelta) => {
    if (!globalState?.scroll) return;

    const rawScrollTarget = globalState.scroll.current;
    let finalOffset = 0;
    let shouldInvalidate = false;

    if (mode === ANIMATION_MODES.DAMPING) {
      const dampingState = dampingStateRef.current;
      const previousOffset = dampingState.offset;

      // Apply easing to global scroll
      easing.damp(
        dampingState,
        "offset",
        THREE.MathUtils.clamp(rawScrollTarget, 0, 1),
        damping,
        frameDelta,
        maxSpeed,
        undefined,
        eps
      );

      // Calculate delta for invalidation
      const delta = Math.abs(dampingState.offset - previousOffset);
      shouldInvalidate = delta > eps;

      // Map to interval
      const globalOffset = dampingState.offset;
      if (globalOffset <= start) {
        finalOffset = 0;
      } else if (globalOffset >= end) {
        finalOffset = 1;
      } else {
        finalOffset = (globalOffset - start) / distance;
      }
    } else if (mode === ANIMATION_MODES.ACCELERATION && vehicleRef.current) {
      // Map global scroll to interval progress
      let intervalProgress = 0;
      if (rawScrollTarget <= start) {
        intervalProgress = 0;
      } else if (rawScrollTarget >= end) {
        intervalProgress = 1;
      } else {
        intervalProgress = (rawScrollTarget - start) / distance;
      }

      const previousOffset = vehicleRef.current.x;
      vehicleRef.current.update(intervalProgress, frameDelta);
      finalOffset = vehicleRef.current.x;

      const delta = Math.abs(finalOffset - previousOffset);
      shouldInvalidate = delta > eps || vehicleRef.current.isActive;
    }

    offsetRef.current = finalOffset;

    if (shouldInvalidate) {
      invalidate();
    }
  }, 1);

  // Return a getter function that always returns the current value
  return () => offsetRef.current;
}

/**
 * Main ScrollControls provider component
 */
export default function ScrollControls({ children }) {
  const scrollRef = useRef(0);
  const scrollThresholdRef = useRef(1);

  const contextValue = useMemo(() => ({ scroll: scrollRef }), []);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    scrollRef.current = currentScrollY / scrollThresholdRef.current;
  }, []);

  const handleResize = useCallback(() => {
    scrollThresholdRef.current = getScrollThreshold();
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

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
 * Scroll proxy component for setting page height
 */
export function ScrollControlsProxy({ pages = DEFAULT_PAGES }) {
  const style = useMemo(() => ({ minHeight: `${pages * 100}vh` }), [pages]);

  return (
    <div className="w-full pointer-events-none select-none" style={style} />
  );
}

/**
 * Hook to attach callback to scroll events
 */
export function AttachCallbackToScrollEvent(callback) {
  const scrollThresholdRef = useRef(1);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const normalizedScroll = Math.min(scrollY / scrollThresholdRef.current, 1);
    callbackRef.current(normalizedScroll);
  }, []);

  const handleResize = useCallback(() => {
    scrollThresholdRef.current = getScrollThreshold();
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    handleResize();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [handleScroll, handleResize]);
}
