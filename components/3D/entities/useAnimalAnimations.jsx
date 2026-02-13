import { useEffect, useRef } from "react";
import * as THREE from "three";

export function useAnimalAnimation(
  actions,
  animationsToPlay = ["Idle", "Headbutt", "Idle_Eating"],
) {
  const lastActionRef = useRef(null);

  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;

    let timeoutId;
    const mixer = Object.values(actions)[0]?.getMixer();

    const playNext = () => {
      const randomName =
        animationsToPlay[Math.floor(Math.random() * animationsToPlay.length)];
      const nextAction = actions[randomName];

      if (nextAction) {
        if (lastActionRef.current && lastActionRef.current !== nextAction) {
          lastActionRef.current.fadeOut(0.5);
        }

        nextAction.reset();
        nextAction.setLoop(THREE.LoopOnce);
        nextAction.clampWhenFinished = true;
        nextAction.setEffectiveWeight(1);
        nextAction.fadeIn(0.5);
        nextAction.play();

        lastActionRef.current = nextAction;
      }
    };

    const onFinished = () => {
      const randomWait = Math.random() * (4000 - 1000) + 1000;

      timeoutId = setTimeout(() => {
        playNext();
      }, randomWait);
    };

    if (mixer) {
      mixer.addEventListener("finished", onFinished);
    }

    playNext();

    return () => {
      if (mixer) mixer.removeEventListener("finished", onFinished);
      clearTimeout(timeoutId);
      Object.values(actions).forEach((a) => a?.stop());
    };
  }, [actions, animationsToPlay]);
}
