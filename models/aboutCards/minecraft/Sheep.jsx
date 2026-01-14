import React from "react";
import { useGLTF, Html } from "@react-three/drei";
import { HexColorPicker } from "react-colorful";
import { proxy, useSnapshot } from "valtio";

// --- Stato condiviso ---
const sheepState = proxy({
  fur: "#ffffff",
});

// --- Component Picker separato ---
function SheepPicker() {
  const snap = useSnapshot(sheepState);
  return (
    <div
      style={{
        background: "rgba(0,0,0,0.75)",
        padding: "8px",
        borderRadius: "8px",
        pointerEvents: "auto",
      }}
    >
      <HexColorPicker color={snap.fur} onChange={(c) => (sheepState.fur = c)} />
    </div>
  );
}

// --- Componente Modello 3D separato ---
function SheepModel() {
  const snap = useSnapshot(sheepState);
  const { nodes, materials } = useGLTF(
    "/models/aboutCards/minecraft/Sheep-transformed.glb"
  );

  return (
    <group dispose={null} rotation={[0, -Math.PI / 12, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sheep_Sheep_0.geometry}
        material={materials.Sheep}
        position={[0, 1.505, -0.998]}
        scale={0.1}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sheep_Fur_Sheep_Fur_0.geometry}
        material={materials.Sheep_Fur}
        material-color={snap.fur}
        position={[0, 1.505, -1.162]}
        scale={[0.15, 0.15, 0.121]}
      />
    </group>
  );
}

// --- Componente principale che unisce Html + Model ---
export function Sheep(props) {
  return (
    <group position={[2.25, 1, 0]}>
      {/* Html con picker */}
      <Html position={[0, 4, -1]} distanceFactor={6} center transform occlude>
        <SheepPicker />
      </Html>

      {/* Modello 3D separato */}
      <SheepModel {...props} />
    </group>
  );
}

useGLTF.preload("/models/aboutCards/minecraft/Sheep-transformed.glb");
