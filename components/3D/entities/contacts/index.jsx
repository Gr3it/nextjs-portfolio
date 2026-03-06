import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { Rocket } from "@/models/vehicles/Rocket";
import { useTargetReached } from "@/hooks/useTargetReached";
import { Flame } from "./Flame";
import { CloudParticles } from "./CloudParticles";
import { ContactForm } from "./ContactForm";

import worldConfig from "@/config/world-config.json";

const Z_OFFSET = worldConfig.sections["Skylands"]?.start;
const ROCKET_Z = 30.5 + Z_OFFSET;

export default function Contacts() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [flyingAway, setFlyingAway] = useState(false);

  const inView = useTargetReached(ROCKET_Z, null, 75);

  const { position, rotation } = useSpring({
    position: flyingAway
      ? [-15, 50, 20 + Z_OFFSET] // flies away upwards and sideways
      : clicked
        ? [-9.5, 6.0, 30.5 + Z_OFFSET] // elevated when form is open
        : hovered
          ? [-9.5, 3.5, 30.5 + Z_OFFSET] // hover lift
          : [-9.5, 2.7, 30.5 + Z_OFFSET], // idle
    rotation: flyingAway ? [Math.PI / 4, 0, Math.PI / 8] : [0, 0, 0],
    config: flyingAway
      ? { duration: 2500, tension: 50, friction: 20 }
      : config.wobbly,
  });

  const isActive = hovered || clicked || flyingAway;

  const rocketRef = useRef();

  useFrame((state) => {
    if (!rocketRef.current) return;
    if ((hovered || clicked) && !flyingAway) {
      // High-frequency low-amplitude vibration
      rocketRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 40) * 0.0075;
      rocketRef.current.rotation.z =
        Math.sin(state.clock.elapsedTime * 50) * 0.00375;
      rocketRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 45) * 0.00375;
    } else {
      rocketRef.current.position.y = 0;
      rocketRef.current.rotation.z = 0;
      rocketRef.current.rotation.x = 0;
    }
  });

  const handleCancel = () => {
    setClicked(false);
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const handleSuccess = () => {
    setClicked(false);
    setFlyingAway(true);
    document.body.style.cursor = "auto";
  };

  return (
    <animated.group position={position} rotation={rotation} scale={2}>
      {/* Invisible interaction hitbox */}
      <mesh
        visible={false}
        position={[0, 2, 0]}
        onClick={(e) => {
          e.stopPropagation();
          if (!flyingAway && !clicked) setClicked(true);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          if (!flyingAway && !clicked) {
            document.body.style.cursor = "pointer";
            setHovered(true);
          }
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          if (!flyingAway && !clicked) document.body.style.cursor = "auto";
          setHovered(false);
        }}
      >
        <cylinderGeometry args={[2, 2, 4, 16]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh>

      <group ref={rocketRef}>
        <Rocket />
      </group>

      <Flame active={isActive} />

      <CloudParticles active={inView && !flyingAway} />

      {clicked && !flyingAway && (
        <ContactForm onCancel={handleCancel} onSuccess={handleSuccess} />
      )}
    </animated.group>
  );
}
