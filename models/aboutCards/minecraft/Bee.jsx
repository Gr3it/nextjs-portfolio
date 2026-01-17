import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";

export function Bee(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/aboutCards/minecraft/Bee-transformed.glb",
  );
  const { actions } = useAnimations(animations, group);

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!actions?.Animation) return;
    actions.Animation.play();
  }, [actions]);

  const toggleAnimation = () => {
    const action = actions?.Animation;
    if (!action) return;

    if (isPlaying) {
      action.stop();
    } else {
      action.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <group {...props} dispose={null} position={[7, 6.5, 2.5]}>
      <Html
        position={[0, 2, 0]} // sopra il modello
        center
        distanceFactor={10}
        transform
        occlude
      >
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
          <button
            onClick={toggleAnimation}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "6px",
              border: "1px solid #888",
              cursor: "pointer",
              background: "#2f2f2f",
              color: "#e0e0e0",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPlaying ? "⏹" : "▶"}
          </button>
          <p style={{ fontSize: "1.25rem" }}>Animation</p>
        </div>
      </Html>
      <group
        ref={group}
        rotation={[0, Math.PI / 3, 0]}
        scale={[0.15, 0.15, 0.15]}
      >
        <group name="Scene">
          <group name="GLTF_SceneRootNode" rotation={[0, Math.PI / 2, 0]}>
            <group
              name="leg001_7"
              position={[-1.191, -2.057, -0.8]}
              rotation={[-2.431, 0, 0]}
            >
              <mesh
                name="Object_23"
                castShadow
                receiveShadow
                geometry={nodes.Object_23.geometry}
                material={materials["Material.001"]}
              />
            </group>
            <group
              name="leg002_8"
              position={[1.021, -2.057, 0.375]}
              rotation={[-2.431, 0, 0]}
            >
              <mesh
                name="Object_25"
                castShadow
                receiveShadow
                geometry={nodes.Object_25.geometry}
                material={materials["Material.001"]}
              />
            </group>
            <group
              name="leg003_9"
              position={[-1.191, -2.057, 0.375]}
              rotation={[-2.431, 0, 0]}
            >
              <mesh
                name="Object_27"
                castShadow
                receiveShadow
                geometry={nodes.Object_27.geometry}
                material={materials["Material.001"]}
              />
            </group>
            <group
              name="leg004_1"
              position={[1.021, -2.057, -0.8]}
              rotation={[-2.431, 0, 0]}
            >
              <mesh
                name="Object_11"
                castShadow
                receiveShadow
                geometry={nodes.Object_11.geometry}
                material={materials["Material.001"]}
              />
            </group>
            <group
              name="leg005_10"
              position={[1.021, -2.057, 1.572]}
              rotation={[-2.431, 0, 0]}
            >
              <mesh
                name="Object_29"
                castShadow
                receiveShadow
                geometry={nodes.Object_29.geometry}
                material={materials["Material.001"]}
              />
            </group>
            <group
              name="leg006_11"
              position={[-1.191, -2.057, 1.572]}
              rotation={[-2.431, 0, 0]}
            >
              <mesh
                name="Object_31"
                castShadow
                receiveShadow
                geometry={nodes.Object_31.geometry}
                material={materials["Material.001"]}
              />
            </group>
            <group
              name="RingL_4"
              position={[-1.728, 2.228, -1.242]}
              rotation={[2.997, 0.256, -2.854]}
              scale={[1, 1, 0.916]}
            >
              <mesh
                name="Object_17"
                castShadow
                receiveShadow
                geometry={nodes.Object_17.geometry}
                material={materials.PaletteMaterial002}
              />
              <mesh
                name="Object_18"
                castShadow
                receiveShadow
                geometry={nodes.Object_18.geometry}
                material={materials.PaletteMaterial001}
              />
            </group>
            <group
              name="RingR_5"
              position={[1.48, 2.228, -1.242]}
              rotation={[2.982, -0.237, -0.337]}
              scale={[1, 1, 0.916]}
            >
              <mesh
                name="Object_20"
                castShadow
                receiveShadow
                geometry={nodes.Object_20.geometry}
                material={materials.PaletteMaterial001}
              />
              <mesh
                name="Object_21"
                castShadow
                receiveShadow
                geometry={nodes.Object_21.geometry}
                material={materials.PaletteMaterial002}
              />
            </group>
            <group
              name="USL_3"
              position={[-1.052, 1.884, -4.264]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.092, 1.042, 1.042]}
            >
              <mesh
                name="Object_15"
                castShadow
                receiveShadow
                geometry={nodes.Object_15.geometry}
                material={materials.PaletteMaterial001}
              />
            </group>
            <group
              name="USR_2"
              position={[0.79, 1.884, -4.264]}
              rotation={[0, 0, Math.PI / 2]}
              scale={[1.092, 1.042, 1.042]}
            >
              <mesh
                name="Object_13"
                castShadow
                receiveShadow
                geometry={nodes.Object_13.geometry}
                material={materials.PaletteMaterial001}
              />
            </group>
          </group>
          <mesh
            name="Object_4"
            castShadow
            receiveShadow
            geometry={nodes.Object_4.geometry}
            material={materials["Material.001"]}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.78, 1.78, 2.967]}
          />
          <mesh
            name="Object_6"
            castShadow
            receiveShadow
            geometry={nodes.Object_6.geometry}
            material={materials.PaletteMaterial001}
            rotation={[0, Math.PI / 2, 0]}
            scale={[1.78, 1.78, 2.967]}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/aboutCards/minecraft/Bee-transformed.glb");
