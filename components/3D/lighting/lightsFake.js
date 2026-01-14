import React from "react";

export default function Lights() {
  return (
    <>
      <directionalLight
        color={"#ffffff"}
        intensity={1.5}
        position={[-15, 30, 35]}
        castShadow={true}
      />
      <ambientLight color={"#d4e3fc"} intensity={1.25} />
    </>
  );
}
