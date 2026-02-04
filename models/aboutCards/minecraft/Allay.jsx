import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, DragControls, Html } from "@react-three/drei";
import { enableShadows } from "@/lib/enableShadows";

export function Allay(props) {
  const group = useRef();
  const [dragging, setDragging] = useState(false);

  const { scene, animations } = useGLTF(
    "/models/aboutCards/minecraft/Allay-transformed.glb",
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Armature|Armature|ArmatureAction"]?.play();
  }, []);

  // Cursor feedback
  useEffect(() => {
    document.body.style.cursor = dragging ? "grabbing" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [dragging]);

  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      position={[-3, 9, 3]}
      scale={[1.11, 1.11, 1.11]}
    >
      <DragControls
        dragLimits={[
          [-3, 12],
          [-2, 2],
          [-2, 6],
        ]}
        onHover={(hovering) => {
          document.body.style.cursor = hovering ? "grab" : "auto";
        }}
        onDragStart={() => setDragging(true)}
        onDragEnd={() => setDragging(false)}
      >
        <primitive
          object={enableShadows(scene)}
          scale={[0.5, 0.5, 0.5]}
          rotation={[0, -Math.PI / 6, 0]}
        />
        {!dragging && (
          <Html center position={[0.2, -0.2, 0]} zIndexRange={[40, 0]}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{
                opacity: 1,
                filter: "drop-shadow(0 0 6px rgba(0,0,0,1))",
              }}
            >
              <path
                d="M12 2v20M2 12h20M12 2l-2 2m2-2l2 2M12 22l-2-2m2 2l2-2M2 12l2-2m-2 2l2 2M22 12l-2-2m2 2l-2 2"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </Html>
        )}
      </DragControls>
    </group>
  );
}

useGLTF.preload("/models/aboutCards/minecraft/Allay-transformed.glb");
