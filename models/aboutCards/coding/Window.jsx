import React from "react";
import { Html, Text, useGLTF } from "@react-three/drei";
import { usePointerHover } from "@/hooks/usePointerHover";
import { a, useSpring } from "@react-spring/three";

const colorBase = "#F1F3F4";

export function Window({
  isFocused,
  position: targetPosition,
  file,
  reset,
  children,
  ...props
}) {
  const { nodes, materials } = useGLTF(
    "/models/aboutCards/Window-transformed.glb",
  );
  const { handlePointerOver, handlePointerOut } = usePointerHover();

  const { position, scale, rotation } = useSpring({
    position: isFocused ? [-17, 8, targetPosition[2]] : targetPosition,
    scale: isFocused ? [2.25, 2.25, 2.25] : [1, 1, 1],
    rotation: isFocused ? [(-2 * Math.PI) / 9, 0, 0] : [0, 0, 0],
    config: {
      mass: 1,
      tension: 180,
      friction: 22,
    },
  });

  return (
    <a.group
      {...props}
      dispose={null}
      position={position}
      scale={scale}
      rotation={rotation}
      onPointerOver={() => {
        if (!isFocused) handlePointerOver();
      }}
      onPointerOut={handlePointerOut}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Group_17svg.geometry}
        material={materials.PaletteMaterial001}
      />

      <Text
        color={colorBase}
        fontSize={0.3}
        position={[-3.85, 3.2, 0.01]}
        anchorX={"left"}
      >
        {file}
      </Text>

      <group
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={(e) => {
          e.stopPropagation();
          if (reset) reset();
        }}
      >
        <mesh position={[5.02, 3.2, 0.001]}>
          <planeGeometry args={[1.6, 0.7]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <Text
          color={colorBase}
          fontSize={0.3}
          position={[4.45, 3.2, 0.01]}
          anchorX={"left"}
        >
          {"Reset"}
        </Text>
      </group>

      <Html
        position={[-0.02, -0.43, 0.001]}
        distanceFactor={5}
        transform
        style={{
          cursor: isFocused ? "auto" : "pointer",
        }}
      >
        <div className="window-html-content">{children}</div>
      </Html>
    </a.group>
  );
}

useGLTF.preload("/models/aboutCards/Window-transformed.glb");
