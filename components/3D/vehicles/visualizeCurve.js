import * as THREE from "three";

export default function CurveLine({ curve }) {
  const points = curve.getPoints(100);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="white" />
    </line>
  );
}
