import React, { useState } from "react";
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

  return (
    /* Spostata la posizione originale del modello [6, 2, -3] qui sul genitore */
    <group {...props} position={[6, 2, -3]} dispose={null}>
      <Html position={[0.5, 7, 0]} center distanceFactor={10} transform>
        <div
          style={{
            padding: "8px 12px",
            background: "rgba(0,0,0,1)",
            color: "white",
            borderRadius: "8px",
            fontSize: "12px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            pointerEvents: "auto",
            userSelect: "none",
          }}
        >
          {/* Checkbox stilizzata */}
          <input
            type="checkbox"
            checked={showWireframe}
            onChange={() => setShowWireframe(!showWireframe)}
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer",
              accentColor: "#888", // Colore ciano per il check
            }}
          />
          <p style={{ fontSize: "1.25rem", margin: 0, whiteSpace: "nowrap" }}>
            Wireframe
          </p>
        </div>
      </Html>

      {/* Rimosso position/rotation da qui per non sommarli al genitore */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Portfolio__102_-61_34_to_106_319_38_1"].geometry}
          material={materials.oak_log}
        >
          {showWireframe && <Wireframe {...wireFrameOptions} />}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Portfolio__102_-61_34_to_106_319_38_2"].geometry}
          material={materials.oak_log_top}
        >
          {showWireframe && <Wireframe {...wireFrameOptions} />}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["Portfolio__102_-61_34_to_106_319_38_3"].geometry}
          material={materials.oak_leaves}
        >
          {showWireframe && <Wireframe {...wireFrameOptions} />}
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/aboutCards/minecraft/Tree-transformed.glb");
