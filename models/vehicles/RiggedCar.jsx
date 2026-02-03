import React, { useEffect, useLayoutEffect } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

export function RiggedCar({ hover, ...props }) {
  const group = React.useRef();
  const { scene, animations } = useGLTF(
    "/models/vehicles/Rigged-car-transformed.glb",
  );
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useLayoutEffect(() => {
    if (actions.RestPose) {
      actions.RestPose.play().paused = true;
    }
  }, [actions]);

  useEffect(() => {
    if (hover) {
      actions.Fall?.stop();
      actions.RestPose?.stop();

      const wakeUp = actions.WakeUp;
      if (wakeUp) {
        wakeUp.reset().setLoop(THREE.LoopOnce).play();
        wakeUp.clampWhenFinished = true;

        const onWakeUpFinished = (e) => {
          if (e.action === wakeUp) {
            actions.Idle?.reset().play();
            actions.WakeUp.getMixer().removeEventListener(
              "finished",
              onWakeUpFinished,
            );
          }
        };
        wakeUp.getMixer().addEventListener("finished", onWakeUpFinished);
      }
    } else {
      actions.Idle?.fadeOut(0.5);
      actions.WakeUp?.stop();

      const fall = actions.Fall;
      if (fall) {
        fall.reset().setLoop(THREE.LoopOnce).play();
        fall.clampWhenFinished = true;

        const onFallFinished = (e) => {
          if (e.action === fall) {
            actions.RestPose?.reset().play();
            actions.RestPose.paused = true;
            fall.getMixer().removeEventListener("finished", onFallFinished);
          }
        };
        fall.getMixer().addEventListener("finished", onFallFinished);
      }
    }

    return () => {
      actions.WakeUp?.getMixer().stopAllAction();
    };
  }, [hover, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Rig">
          <primitive object={nodes.Root} />
        </group>
        <skinnedMesh
          name="body"
          geometry={nodes.body.geometry}
          material={materials.colormap}
          skeleton={nodes.body.skeleton}
          castShadow
          receiveShadow
        />
        <skinnedMesh
          name="spoiler"
          geometry={nodes.spoiler.geometry}
          material={materials.colormap}
          skeleton={nodes.spoiler.skeleton}
          castShadow
          receiveShadow
        />
        <skinnedMesh
          name="wheel-back-left"
          geometry={nodes["wheel-back-left"].geometry}
          material={materials.colormap}
          skeleton={nodes["wheel-back-left"].skeleton}
          castShadow
          receiveShadow
        />
        <skinnedMesh
          name="wheel-back-right"
          geometry={nodes["wheel-back-right"].geometry}
          material={materials.colormap}
          skeleton={nodes["wheel-back-right"].skeleton}
          castShadow
          receiveShadow
        />
        <skinnedMesh
          name="wheel-front-left"
          geometry={nodes["wheel-front-left"].geometry}
          material={materials.colormap}
          skeleton={nodes["wheel-front-left"].skeleton}
          castShadow
          receiveShadow
        />
        <skinnedMesh
          name="wheel-front-right"
          geometry={nodes["wheel-front-right"].geometry}
          material={materials.colormap}
          skeleton={nodes["wheel-front-right"].skeleton}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/vehicles/Rigged-car-transformed.glb");
