import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function MyScene(props) {
  const { scene:Village } = useGLTF('/models/world/Village-transformed.glb')
  const { scene:Forest } = useGLTF('/models/world/Forest-transformed.glb')
  const { scene:Plains } = useGLTF('/models/world/Plains-transformed.glb')
  const { scene:Badlands } = useGLTF('/models/world/Badlands-transformed.glb')
  const { scene:Desert } = useGLTF('/models/world/Desert-transformed.glb')
  const { scene:Ocean } = useGLTF('/models/world/Ocean-transformed.glb')
  const { scene:Skylands } = useGLTF('/models/world/Skylands-transformed.glb')
  const { scene:City } = useGLTF('/models/world/City-transformed.glb')

  return (
    <group {...props}>
      <primitive object={Village} position={[0,0,0]}/>
      <primitive object={Forest} position={[0,0,32]}/>
      <primitive object={Plains} position={[0,0,142]}/>
      <primitive object={Badlands} position={[0,0,238]}/>
      <primitive object={Desert} position={[0,0,286]}/>
      <primitive object={Ocean} position={[0,0,334]}/>
      <primitive object={Skylands} position={[0,0,484]}/>
      <primitive object={City} position={[0,0,521]}/>
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
