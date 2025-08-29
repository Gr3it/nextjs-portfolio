class Vehicle1D {
  constructor(duration = 4) {
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
    this.target = target;

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

  update(frameDelta, target = this.target) {
    const clampedTarget = target;

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
    this.x = a * t5 + b * t4 + c * t3 + d * t2 + e * t + f;
    this.v = 5 * a * t4 + 4 * b * t3 + 3 * c * t2 + 2 * d * t + e;
    this.a = 20 * a * t3 + 12 * b * t2 + 6 * c * t + 2 * d;

    // Check if trajectory is complete
    const distanceToTarget = Math.abs(this.target - this.x);
    const isAtRest = Math.abs(this.v) < 0.001;
    const hasReachedTime = t >= this.duration;

    this.isActive = !hasReachedTime || distanceToTarget > 0.001 || !isAtRest;

    return { x: this.x, v: this.v, a: this.a, t };
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

// --- Simulation ---
const car = new Vehicle1D(4);
const dt = 1 / 60;

// plan to reach 100 in 4s
console.time("myFunction");
car.plan(100);
console.timeEnd("myFunction");

let steps = 0;
let run = true;
const interval = setInterval(() => {
  const { x, v, a, t } = car.update(dt);
  steps++;

  if (steps % 10 === 0) {
    console.log(
      `t=${t.toFixed(2)}s  x=${x.toFixed(2)}  v=${v.toFixed(2)}  a=${a.toFixed(
        2
      )}`
    );
  }

  // at 2s, change target mid-way (like a scroll jump)
  if (Math.abs(t - 2.0) < 1e-3 && run) {
    console.log("\n--- Target jumped to 300 ---\n");
    console.time("myFunction");
    car.plan(300); // replan to new target in 4s, from current state
    console.timeEnd("myFunction");
    run = false;
  }

  if (t >= 4) {
    console.log("\n--- Simulation ended ---");
    clearInterval(interval);
  }
}, dt * 1000);
