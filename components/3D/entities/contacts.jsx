import React, { useState, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useSpring, animated, config } from "@react-spring/three";
import { Html, Sparkles } from "@react-three/drei";
import { Rocket } from "@/models/vehicles/Rocket";
import { useTargetReached } from "@/hooks/useTargetReached";

const Z_OFFSET = 484;

// Each cloud: start XY at rocket base, direction (dx, dy) = outward+up, color, size
const CLOUD_CONFIGS = [
  {
    startX: -0.7,
    startY: -1.2,
    dx: -1.0,
    dy: 9,
    scale: 0.6,
    color: "#222",
  },
  {
    startX: 0.5,
    startY: -1.4,
    dx: 0.8,
    dy: 7,
    scale: 0.4,
    color: "#555",
  },
  { startX: 1, startY: -1.2, dx: 1.0, dy: 9, scale: 0.5, color: "#333" },
];

const CLOUD_DURATION = 1.8; // seconds for the one-shot animation

function CloudPuff({ startX, startY, dx, dy, scale, color, active }) {
  const meshRef = useRef();
  const startTimeRef = useRef(null);
  const done = useRef(false);

  useFrame(({ clock }) => {
    if (!meshRef.current || !active || done.current) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = clock.elapsedTime;
    }

    const elapsed = clock.elapsedTime - startTimeRef.current;
    const t = Math.min(elapsed / CLOUD_DURATION, 1); // 0 → 1, clamped

    // Move from base outward+upward
    meshRef.current.position.x = startX + dx * t;
    meshRef.current.position.y = startY + dy * t;

    // Fade in [0..0.2], fade out [0.2..1]
    meshRef.current.material.opacity = t < 0.2 ? t / 0.2 : 1 - (t - 0.2) / 0.8;

    if (t >= 1) {
      meshRef.current.material.opacity = 0;
      done.current = true;
    }
  });

  if (!active) return null;

  return (
    <mesh
      ref={meshRef}
      position={[startX, startY, 0]}
      scale={[scale * 1.5, scale, scale]}
    >
      <sphereGeometry args={[1, 12, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0} />
    </mesh>
  );
}

function CloudParticles({ active }) {
  return (
    <group>
      {CLOUD_CONFIGS.map((cfg, i) => (
        <CloudPuff key={i} {...cfg} active={active} />
      ))}
    </group>
  );
}

const Flame = ({ active }) => {
  const { scale } = useSpring({
    scale: active ? 1 : 0,
    config: config.wobbly,
  });

  return (
    <animated.group position={[0, 0, 0]} scale={scale}>
      {/* Outer flame */}
      <mesh position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.8, 2, 16]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.8} />
      </mesh>
      {/* Inner flame */}
      <mesh position={[0, -0.8, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.5, 1.5, 16]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={0.9} />
      </mesh>
      {active && (
        <Sparkles
          count={30}
          scale={2}
          size={10}
          speed={0.8}
          opacity={1}
          color="#ffcc00"
          position={[0, -1, 0]}
        />
      )}
    </animated.group>
  );
};

const ROCKET_Z = 30.5 + Z_OFFSET;

export default function Contacts() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [flyingAway, setFlyingAway] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const inView = useTargetReached(ROCKET_Z, null, 75);

  const { position, rotation } = useSpring({
    position: flyingAway
      ? [-15, 50, 20 + Z_OFFSET] // flies away upwards and sideways
      : clicked
        ? [-9.5, 6.0, 30.5 + Z_OFFSET] // elevated
        : hovered
          ? [-9.5, 3.5, 30.5 + Z_OFFSET] // hover lift
          : [-9.5, 2.7, 30.5 + Z_OFFSET], // idle
    rotation: flyingAway
      ? [Math.PI / 4, 0, Math.PI / 8] // tilt when flying
      : [0, 0, 0], // upright
    config: flyingAway
      ? { duration: 2500, tension: 50, friction: 20 }
      : config.wobbly,
  });

  const isActive = hovered || clicked || flyingAway;

  const rocketRef = useRef();

  useFrame((state) => {
    if (rocketRef.current) {
      if ((hovered || clicked) && !flyingAway) {
        // High frequency, low amplitude oscillation for vibration effect
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
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.target);
    try {
      const response = await fetch("https://formspree.io/f/xykdqplg", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (response.ok) {
        setClicked(false);
        setFlyingAway(true);
        // Reset cursor just in case
        document.body.style.cursor = "auto";
      } else {
        const data = await response.json();
        setSubmitError(
          data.error || "Oops! There was a problem submitting your form",
        );
      }
    } catch (error) {
      setSubmitError("Oops! There was a problem submitting your form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <animated.group position={position} rotation={rotation} scale={2}>
      {/* Invisible interaction area over the rocket */}
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
          if (!flyingAway && !clicked) {
            document.body.style.cursor = "auto";
          }
          setHovered(false);
        }}
      >
        {/* large detection area */}
        <cylinderGeometry args={[2, 2, 4, 16]} />
        <meshBasicMaterial color="red" wireframe />
      </mesh>

      <group ref={rocketRef}>
        <Rocket />
      </group>

      {/* Flame effect active on hover/click/fly */}
      <Flame active={isActive} />

      {/* Cloud particles — hint that this object is interactable */}
      <CloudParticles active={inView && !flyingAway} />

      {/* Contact Form Modal */}
      {clicked && !flyingAway && (
        <Html position={[2.5, 5, 0]} zIndexRange={[100, 0]}>
          <div
            className="w-[350px] max-w-[50vw] p-6 rounded-2xl bg-[var(--background)] border border-[var(--borderColor)] shadow-2xl font-sans cursor-auto"
            style={{ pointerEvents: "auto", color: "var(--foreground)" }}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold mb-4 text-[var(--accent-color)]">
              Get in Touch
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-[var(--grey)]">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="bg-[var(--hoverBg)] border border-[var(--borderColor)] px-3 py-2 rounded-lg outline-none focus:border-[var(--accent-color)] transition-colors placeholder:text-[var(--grey)] text-[var(--foreground)]"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-[var(--grey)]">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="How can I help you?"
                  className="bg-[var(--hoverBg)] border border-[var(--borderColor)] px-3 py-2 rounded-lg outline-none focus:border-[var(--accent-color)] transition-colors resize-none placeholder:text-[var(--grey)] text-[var(--foreground)]"
                ></textarea>
              </label>

              {submitError && (
                <p className="text-red-400 text-sm">{submitError}</p>
              )}

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setClicked(false);
                    setHovered(false);
                    document.body.style.cursor = "auto";
                  }}
                  className="px-4 py-2 rounded-lg border border-[var(--borderColor)] hover:cursor-pointer hover:bg-[var(--hoverBg)] transition-colors text-sm font-medium text-[var(--foreground)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-[var(--accent-color)] hover:cursor-pointer hover:brightness-110 text-white font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Launch Message"}
                </button>
              </div>
            </form>
          </div>
        </Html>
      )}
    </animated.group>
  );
}
