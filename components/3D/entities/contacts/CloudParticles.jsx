import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Each cloud: start XY at rocket base, direction (dx, dy) = outward+up, color, size
const CLOUD_CONFIGS = [
  { startX: -0.7, startY: -1.2, dx: -1.0, dy: 9, scale: 0.6, color: "#222" },
  { startX: 0.5, startY: -1.4, dx: 0.8, dy: 7, scale: 0.4, color: "#555" },
  { startX: 1, startY: -1.2, dx: 1.0, dy: 9, scale: 0.5, color: "#333" },
];

const CLOUD_DURATION = 1.8; // seconds for the one-shot animation

function CloudPuff({ startX, startY, dx, dy, scale, color, active }) {
  const meshRef = useRef();
  const startTimeRef = useRef(null);
  const done = useRef(false);

  useFrame(({ clock }) => {
    if (!meshRef.current || !active || done.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = clock.elapsedTime;
    }

    const elapsed = clock.elapsedTime - startTimeRef.current;
    const t = Math.min(elapsed / CLOUD_DURATION, 1); // 0 → 1, clamped

    // Move from base outward+upward
    meshRef.current.position.x = startX + dx * t;
    meshRef.current.position.y = startY + dy * t;

    // Fade in [0..0.2], fade out [0.2..1]
    meshRef.current.material.opacity = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8;

    if (t >= 1) {
      meshRef.current.material.opacity = 0;
      done.current = true;
    }
  });

  if (!active) return null;

  return (
    <mesh
      ref={meshRef}
      position={[startX, startY, 0]}
      scale={[scale * 1.5, scale, scale]}
    >
      <sphereGeometry args={[1, 12, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  );
}

export function CloudParticles({ active }) {
  return (
    <group>
      {CLOUD_CONFIGS.map((cfg, i) => (
        <CloudPuff key={i} {...cfg} active={active} />
      ))}
    </group>
  );
}
