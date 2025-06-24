import * as THREE from "three";

export default function CurvePoints({ points }) {
  const cubeGeometry = new THREE.BoxGeometry(0.15, 0.15, 0.15);

  return (
    <group>
      {points.map((point, index) => (
        <mesh
          key={index}
          position={[point.x, point.y, point.z]}
          geometry={cubeGeometry}
        >
          <meshBasicMaterial color="blue" />
        </mesh>
      ))}
    </group>
  );
}
