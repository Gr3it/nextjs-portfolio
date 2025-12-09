import React from 'react'
import { useGLTF } from '@react-three/drei'

function enableShadows(scene) {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true
      child.receiveShadow = true

      // Needed if using MeshStandardMaterial inside glTF
      if (child.material) {
        child.material.needsUpdate = true
      }
    }
  })
  return scene
}

export default function MyScene(props) {
  const { scene: Village }  = useGLTF('/models/world/Village-transformed.glb')
  const { scene: Forest }   = useGLTF('/models/world/Forest-transformed.glb')
  const { scene: Plains }   = useGLTF('/models/world/Plains-transformed.glb')
  const { scene: Badlands } = useGLTF('/models/world/Badlands-transformed.glb')
  const { scene: Desert }   = useGLTF('/models/world/Desert-transformed.glb')
  const { scene: Ocean }    = useGLTF('/models/world/Ocean-transformed.glb')
  const { scene: Skylands } = useGLTF('/models/world/Skylands-transformed.glb')
  const { scene: City }     = useGLTF('/models/world/City-transformed.glb')

  return (
    <group {...props}>
      <primitive object={enableShadows(Village)}  position={[0,0,0]} />
      <primitive object={enableShadows(Forest)}   position={[0,0,32]} />
      <primitive object={enableShadows(Plains)}   position={[0,0,142]} />
      <primitive object={enableShadows(Badlands)} position={[0,0,238]} />
      <primitive object={enableShadows(Desert)}   position={[0,0,286]} />
      <primitive object={enableShadows(Ocean)}    position={[0,0,334]} />
      <primitive object={enableShadows(Skylands)} position={[0,0,484]} />
      <primitive object={enableShadows(City)}     position={[0,0,521]} />
    </group>
  )
}

useGLTF.preload('/models/world/Village-transformed.glb')
useGLTF.preload('/models/world/Forest-transformed.glb')
useGLTF.preload('/models/world/Plains-transformed.glb')
useGLTF.preload('/models/world/Badlands-transformed.glb')
useGLTF.preload('/models/world/Desert-transformed.glb')
useGLTF.preload('/models/world/Ocean-transformed.glb')
useGLTF.preload('/models/world/Skylands-transformed.glb')
useGLTF.preload('/models/world/City-transformed.glb')
