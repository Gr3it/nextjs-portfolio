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
  INSTANT: "instant", // Nuova modalità
  DAMPING: "damping",
  ACCELERATION: "acceleration",
};

const getScrollThreshold = () => {
  const scrollHeight = document.documentElement.scrollHeight;
  const containerHeight = window.innerHeight;
  return Math.max(scrollHeight - containerHeight, 1);
};

// ... (Classe Vehicle1D invariata) ...
class Vehicle1D {
  constructor(duration = DEFAULT_DURATION) {
    this.duration = duration;
    this.x = 0;
    this.v = 0;
    this.a = 0;
    this.timer = 0;
    this.target = 0;
    this.lastTarget = null;
    this.coeffs = null;
    this.isActive = false;
  }

  plan(target) {
    this.timer = 0;
    this.target = THREE.MathUtils.clamp(target, 0, 1);
    const T = this.duration;
    const x0 = this.x;
    const v0 = this.v;
    const a0 = this.a;
    const xf = this.target;
    const vf = 0;
    const af = 0;
    const f = x0;
    const e = v0;
    const d = a0 / 2;
    const T2 = T * T;
    const T3 = T2 * T;
    const T4 = T3 * T;
    const T5 = T4 * T;
    const A = [
      [T5, T4, T3],
      [5 * T4, 4 * T3, 3 * T2],
      [20 * T3, 12 * T2, 6 * T],
    ];
    const B = [xf - (d * T2 + e * T + f), vf - (2 * d * T + e), af - 2 * d];
    const det = this.determinant3x3(A);
    if (Math.abs(det) < 1e-10) {
      this.coeffs = { a: 0, b: 0, c: 0, d: 0, e: (xf - x0) / T, f: x0 };
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

  determinant3x3(matrix) {
    const [[a, b, c], [d, e, f], [g, h, i]] = matrix;
    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  }

  update(target, frameDelta) {
    const clampedTarget = THREE.MathUtils.clamp(target, 0, 1);
    if (
      this.lastTarget === null ||
      Math.abs(clampedTarget - this.lastTarget) > 0.001
    ) {
      this.plan(clampedTarget);
      this.lastTarget = clampedTarget;
      this.isActive = true;
    }
    if (this.duration <= 0) {
      this.x = clampedTarget;
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
    this.x = THREE.MathUtils.clamp(
      a * t5 + b * t4 + c * t3 + d * t2 + e * t + f,
      0,
      1,
    );
    this.v = 5 * a * t4 + 4 * b * t3 + 3 * c * t2 + 2 * d * t + e;
    this.a = 20 * a * t3 + 12 * b * t2 + 6 * c * t + 2 * d;
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

const ScrollContext = React.createContext(null);

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
  const offsetRef = useRef(0);
  const start = Math.max(0, Math.min(from, to));
  const end = Math.min(1, Math.max(from, to));
  const distance = end - start;

  const dampingStateRef = useRef({ offset: 0 });
  const vehicleRef = useRef(null);

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

    // Helper per mappare lo scroll globale all'intervallo locale [0, 1]
    const getLocalTarget = (raw) => {
      if (raw <= start) return 0;
      if (raw >= end) return 1;
      return (raw - start) / distance;
    };

    if (mode === ANIMATION_MODES.INSTANT) {
      const target = getLocalTarget(rawScrollTarget);
      shouldInvalidate = Math.abs(offsetRef.current - target) > eps;
      finalOffset = target;
    } else if (mode === ANIMATION_MODES.DAMPING) {
      const dampingState = dampingStateRef.current;
      const previousOffset = dampingState.offset;

      easing.damp(
        dampingState,
        "offset",
        THREE.MathUtils.clamp(rawScrollTarget, 0, 1),
        damping,
        frameDelta,
        maxSpeed,
        undefined,
        eps,
      );

      shouldInvalidate = Math.abs(dampingState.offset - previousOffset) > eps;
      finalOffset = getLocalTarget(dampingState.offset);
    } else if (mode === ANIMATION_MODES.ACCELERATION && vehicleRef.current) {
      const localTarget = getLocalTarget(rawScrollTarget);
      const previousOffset = vehicleRef.current.x;

      vehicleRef.current.update(localTarget, frameDelta);
      finalOffset = vehicleRef.current.x;

      shouldInvalidate =
        Math.abs(finalOffset - previousOffset) > eps ||
        vehicleRef.current.isActive;
    }

    offsetRef.current = finalOffset;
    if (shouldInvalidate) invalidate();
  });

  return () => offsetRef.current;
}

// ... (Resto dei componenti ScrollControls, ScrollControlsProxy, AttachCallbackToScrollEvent invariati) ...

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

export function ScrollControlsProxy({ pages = DEFAULT_PAGES }) {
  const style = useMemo(() => ({ minHeight: `${pages * 100}vh` }), [pages]);
  return (
    <div className="w-full pointer-events-none select-none" style={style} />
  );
}

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
