/**
 * pathParser.js
 *
 * Parses an array of 3D path points and enriches it with support points
 * suitable for use as control points in a Catmull-Rom spline.
 *
 * Input point format: { x: number, y: number, z: number }
 *
 * Segment classification (comparing point[i] → point[i+1]):
 *   - only x changes            → straight: RIGHT (+x) or LEFT (-x)
 *   - only z changes            → straight: DOWN  (+z) or UP   (-z)
 *   - both x and z change       → 90° curve
 *   - y changes                 → slope (RISE or FALL)
 *
 * For every CURVE the output replaces the curve vertex with:
 *   pinchIn → middle45 → pinchOut
 *
 *   Where:
 *     - pinchIn    = curveStart offset by +PINCH_DIST along entry direction
 *     - middle45   = geometric point at 45° on the arc
 *     - pinchOut   = curveEnd   offset by -PINCH_DIST along exit  direction
 *
 *   Arc radius R = |Δx| = |Δz| of the two curve points.
 *   Center = corner of the right angle (NOT on the arc).
 *   middle45 = center + normalize(va + vb) * R
 *
 * For every SLOPE boundary:
 *   - slope start: emit point, then emit point + PINCH_DIST along travel dir
 *   - slope end  : emit point - PINCH_DIST along travel dir, then emit point
 */

const PINCH_DIST = 0.1;

// ─── helpers ─────────────────────────────────────────────────────────────────

const approxEq = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const clone = (p) => ({ ...p });

function dirVec(dir) {
  switch (dir) {
    case "RIGHT":
      return { x: 1, z: 0 };
    case "LEFT":
      return { x: -1, z: 0 };
    case "DOWN":
      return { x: 0, z: 1 };
    case "UP":
      return { x: 0, z: -1 };
    default:
      return { x: 0, z: 0 };
  }
}

function offset(p, dir, dist) {
  const v = dirVec(dir);
  return { x: p.x + v.x * dist, y: p.y, z: p.z + v.z * dist };
}

function cardinalDir(a, b) {
  const dx = b.x - a.x,
    dz = b.z - a.z;
  const xc = !approxEq(dx, 0),
    zc = !approxEq(dz, 0);
  if (xc && !zc) return dx > 0 ? "RIGHT" : "LEFT";
  if (zc && !xc) return dz > 0 ? "DOWN" : "UP";
  return null;
}

/**
 * Geometric 45° point on the arc of a 90° curve.
 *
 * a = entry arc point, b = exit arc point.
 * R = |a.x - b.x|  (= |a.z - b.z| for a 90° arc).
 * center = corner of the right angle.
 * middle45 = center + normalize(va + vb) * R
 */
function middle45(a, b, entryDir) {
  console.log(a, b, entryDir);
  const R = Math.abs(a.x - b.x); // equals |Δz|

  // The center is the corner NOT on the arc.
  // If we were travelling along x (RIGHT/LEFT), x stops changing first,
  // so center.x = b.x and center.z = a.z  (and vice-versa).
  const center = {
    x: entryDir === "RIGHT" || entryDir === "LEFT" ? a.x : b.x,
    z: entryDir === "DOWN" || entryDir === "UP" ? a.z : b.z,
    y: a.y,
  };

  const va = { x: a.x - center.x, z: a.z - center.z };
  const vb = { x: b.x - center.x, z: b.z - center.z };

  const bx = va.x + vb.x;
  const bz = va.z + vb.z;
  const len = Math.sqrt(bx * bx + bz * bz) || 1;

  return {
    x: center.x + (bx / len) * R,
    y: a.y,
    z: center.z + (bz / len) * R,
  };
}

// ─── main export ──────────────────────────────────────────────────────────────

/**
 * pathParser
 * @param {Array<{x:number,y:number,z:number}>} points
 * @param {{ pinchDist?: number }} [opts]
 * @returns {Array<{x:number,y:number,z:number}>}
 */
export default function pathParser(points, opts = {}) {
  const PD = opts.pinchDist ?? PINCH_DIST;

  if (!points || points.length < 2) return (points || []).map(clone);

  // ── Pass 1: classify segments ─────────────────────────────────────────────
  let currentDir = null;
  for (let i = 0; i < points.length - 1; i++) {
    const d = cardinalDir(points[i], points[i + 1]);
    if (d) {
      currentDir = d;
      break;
    }
  }

  const segments = []; // segments[i]: transition from points[i] → points[i+1]

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i],
      b = points[i + 1];
    const dx = b.x - a.x,
      dz = b.z - a.z,
      dy = b.y - a.y;
    const xc = !approxEq(dx, 0),
      zc = !approxEq(dz, 0),
      yc = !approxEq(dy, 0);

    const entryDir = currentDir;

    if (yc) {
      // Slope – xz travel direction unchanged
      segments.push({
        type: "slope",
        slopeDir: dy > 0 ? "RISE" : "FALL",
        entryDir,
        exitDir: entryDir,
      });
    } else if (xc && zc) {
      // 90° curve
      const exitDir =
        entryDir === "RIGHT" || entryDir === "LEFT"
          ? dz > 0
            ? "DOWN"
            : "UP"
          : dx > 0
            ? "RIGHT"
            : "LEFT";
      segments.push({ type: "curve", entryDir, exitDir });
      currentDir = exitDir;
    } else {
      // Straight
      const dir = cardinalDir(a, b) || currentDir;
      segments.push({ type: "straight", entryDir: dir, exitDir: dir });
      currentDir = dir;
    }
  }

  // ── Pass 2: build enriched output ─────────────────────────────────────────
  const out = [];
  let inSlope = false;

  for (let i = 0; i < points.length; i++) {
    const pt = points[i];
    const seg = segments[i]; // segment leaving point i  (undef for last)
    const prev = segments[i - 1]; // segment arriving at i    (undef for first)

    // Slope boundary: leaving a slope section
    const leavingSlope =
      prev &&
      prev.type === "slope" &&
      (seg === undefined || seg.type !== "slope");
    if (leavingSlope) {
      out.push(offset(pt, prev.exitDir, -PD)); // pinch before end-of-slope point
      inSlope = false;
    }

    // Emit the point itself
    out.push(clone(pt));

    // Slope boundary: entering a slope section
    const enteringSlope = seg && seg.type === "slope" && !inSlope;
    if (enteringSlope) {
      out.push(offset(pt, seg.entryDir, PD)); // pinch after start-of-slope point
      inSlope = true;
    }

    // Curve: insert pinchIn → middle45 → pinchOut between point[i] and point[i+1]
    // (point[i+1] will be emitted on the next iteration as normal)
    if (seg && seg.type === "curve") {
      const a = pt,
        b = points[i + 1];
      out.push(offset(a, seg.entryDir, PD)); // pinchIn
      out.push(middle45(a, b, seg.entryDir, seg.exitDir)); // geometric 45° point
      out.push(offset(b, seg.exitDir, -PD)); // pinchOut
    }
  }

  return out;
}
