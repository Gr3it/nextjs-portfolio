import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { useMemo } from "react";

const WorldMaskMaterial = shaderMaterial(
  {
    uMin: new THREE.Vector2(-5, -5),
    uMax: new THREE.Vector2(5, 5),
    uColor: new THREE.Color("white"),
    uEdgeSoftness: 1.0,
  },
  `
  varying vec3 vWorldPosition;
  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
  `,
  `
  varying vec3 vWorldPosition;
  uniform vec2 uMin;
  uniform vec2 uMax;
  uniform vec3 uColor;
  uniform float uEdgeSoftness;

  void main() {
    // Calcolo maschera su assi X e Z (piano orizzontale)
    float maskX = smoothstep(uMin.x, uMin.x + uEdgeSoftness, vWorldPosition.x) * (1.0 - smoothstep(uMax.x - uEdgeSoftness, uMax.x, vWorldPosition.x));
    
    float maskZ = smoothstep(uMin.y, uMin.y + uEdgeSoftness, vWorldPosition.z) * (1.0 - smoothstep(uMax.y - uEdgeSoftness, uMax.y, vWorldPosition.z));
    
    float visibility = maskX * maskZ;
    float alpha = 1.0 - visibility;
    
    gl_FragColor = vec4(uColor, alpha);
  }
  `,
);

extend({ WorldMaskMaterial });

export default function WorldFog({
  topLeft,
  bottomRight,
  softness = 2.0,
  margin = 10.0,
}) {
  const { width, height, center } = useMemo(() => {
    const minX = Math.min(topLeft[0], bottomRight[0]);
    const maxX = Math.max(topLeft[0], bottomRight[0]);
    const minZ = Math.min(topLeft[1], bottomRight[1]);
    const maxZ = Math.max(topLeft[1], bottomRight[1]);

    const w = maxX - minX + margin * 2;
    const h = maxZ - minZ + margin * 2;

    return {
      width: w,
      height: h,
      center: [(minX + maxX) / 2, 0.01, (minZ + maxZ) / 2],
    };
  }, [topLeft, bottomRight, margin]);

  return (
    <mesh position={center} rotation={[-Math.PI / 2, 0, 0]} renderOrder={999}>
      <planeGeometry args={[width, height]} />
      <worldMaskMaterial
        uMin={
          new THREE.Vector2(
            Math.min(topLeft[0], bottomRight[0]),
            Math.min(topLeft[1], bottomRight[1]),
          )
        }
        uMax={
          new THREE.Vector2(
            Math.max(topLeft[0], bottomRight[0]),
            Math.max(topLeft[1], bottomRight[1]),
          )
        }
        uColor={new THREE.Color("white")}
        uEdgeSoftness={softness}
        transparent={true}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}
