import React, { useState, useMemo } from "react";
import { useGLTF, Wireframe, Html } from "@react-three/drei";

const wireFrameOptions = {
  fillMix: 0.3,
  dash: false,
  squeeze: false,
  thickness: 0.1,
  fill: "#000000",
  stroke: "#00FFFF",
  colorBackfaces: false,
};

export function Tree(props) {
  const { nodes, materials } = useGLTF(
    "/models/aboutCards/minecraft/Tree-transformed.glb",
  );

  const [showWireframe, setShowWireframe] = useState(true);

  // 1. Memorizziamo le geometrie convertite per evitare ricalcoli
  // e garantire che siano pronte prima del montaggio dei Wireframe.
  const processedGeometries = useMemo(() => {
    return {
      log: nodes["Portfolio__102_-61_34_to_106_319_38_1"].geometry
        .clone()
        .toNonIndexed(),
      top: nodes["Portfolio__102_-61_34_to_106_319_38_2"].geometry
        .clone()
        .toNonIndexed(),
      leaves: nodes["Portfolio__102_-61_34_to_106_319_38_3"].geometry
        .clone()
        .toNonIndexed(),
    };
  }, [nodes]);

  return (
    <group {...props} position={[6, 2, -3]} dispose={null}>
      <Html
        position={[0.5, 7, 0]}
        center
        distanceFactor={10}
        transform
        zIndexRange={[40, 0]}
      >
        <div
          style={{
            padding: "8px 12px",
            background: "black",
            color: "white",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            pointerEvents: "auto",
          }}
        >
          <input
            type="checkbox"
            checked={showWireframe}
            onChange={() => setShowWireframe(!showWireframe)}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
              accentColor: "#888",
            }}
          />
          <p style={{ fontSize: "1.25rem", margin: 0 }}>Wireframe</p>
        </div>
      </Html>

      <group rotation={[Math.PI / 2, 0, 0]}>
        {/* Usiamo le geometrie processate dal memo */}
        <mesh
          castShadow
          receiveShadow
          geometry={processedGeometries.log}
          material={materials.oak_log}
        >
          {showWireframe && <Wireframe {...wireFrameOptions} />}
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={processedGeometries.top}
          material={materials.oak_log_top}
        >
          {showWireframe && <Wireframe {...wireFrameOptions} />}
        </mesh>

        <mesh
          castShadow
          receiveShadow
          geometry={processedGeometries.leaves}
          material={materials.oak_leaves}
        >
          {showWireframe && <Wireframe {...wireFrameOptions} />}
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/aboutCards/minecraft/Tree-transformed.glb");
