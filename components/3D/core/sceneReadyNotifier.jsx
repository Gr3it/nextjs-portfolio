import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function SceneReadyNotifier({ onReady }) {
  const hasNotified = useRef(false);

  useFrame(() => {
    if (!hasNotified.current) {
      hasNotified.current = true;
      onReady();
    }
  });

  return null;
}
