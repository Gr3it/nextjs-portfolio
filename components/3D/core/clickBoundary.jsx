import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function isDescendant(parent, object) {
  let current = object;
  while (current) {
    if (current === parent) return true;
    current = current.parent;
  }
  return false;
}

export default function ClickBoundary({ onInside, onOutside, children }) {
  const ref = useRef();
  const { camera, gl, scene } = useThree();

  useEffect(() => {
    const handlePointerDown = (event) => {
      const rect = gl.domElement.getBoundingClientRect();

      const mouse = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
      };

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);

      const hits = raycaster.intersectObjects(scene.children, true);

      if (hits.length === 0) {
        onOutside?.(event);
        return;
      }

      const closestHit = hits[0];

      if (ref.current && isDescendant(ref.current, closestHit.object)) {
        onInside?.(event);
      } else {
        onOutside?.(event);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [camera, gl, scene, onInside, onOutside]);

  return <group ref={ref}>{children}</group>;
}
