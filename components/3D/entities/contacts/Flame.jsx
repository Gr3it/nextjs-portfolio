import { useSpring, animated, config } from "@react-spring/three";
import { Sparkles } from "@react-three/drei";

export function Flame({ active }) {
  const { scale } = useSpring({
    scale: active ? 1 : 0,
    config: config.wobbly,
  });

  return (
    <animated.group position={[0, 0, 0]} scale={scale}>
      {/* Outer flame */}
      <mesh position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.8, 2, 16]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.8} />
      </mesh>
      {/* Inner flame */}
      <mesh position={[0, -0.8, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 1.5, 16]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={0.9} />
      </mesh>
      {active && (
        <Sparkles
          count={30}
          scale={2}
          size={10}
          speed={0.8}
          opacity={1}
          color="#ffcc00"
          position={[0, -1, 0]}
        />
      )}
    </animated.group>
  );
}
