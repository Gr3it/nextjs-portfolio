import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { easings, useSpringValue } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function AnimatedStar({ isAnimating, starIndex = 0, ...props }) {
  const starRef = useRef()
  const { nodes, materials } = useGLTF('/models/star-transformed.glb')
  
  // Animation values
  const scale = useSpringValue(0) // Start from size 0
  const opacity = useSpringValue(1)
  const rotationY = useSpringValue(0)
  
  // Position for the star explosion (starts from flag center)
  const animatedPosition = useSpringValue(0)
  
  // Calculate pentagon position on XY plane
  const targetPosition = React.useMemo(() => {
    const angle = (starIndex * Math.PI * 2) / 5 + Math.PI / 2// Start from top
    const radius = 1.5 // Distance from flag center
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: 0 // Stay on XY plane
    }
  }, [starIndex])
  
  useEffect(() => {
    if (isAnimating) {
      // No delay - start immediately
      // Quick animation - 1 second total (first third of 3-second flag animation)
      scale.start({ to: 0.5, config: { duration: 150 } }) // Scale from 0 to 1
      animatedPosition.start({ to: 1, config: { duration: 800, easing: easings.easeOutBack } })
      
      // Rotate one full turn around Y axis
      setTimeout(() => {
        rotationY.start({ to: Math.PI * 2, config: { duration: 500 } })
      }, 100)
      
      // Fade out in the last part of the animation
      setTimeout(() => {
        opacity.start({ to: 0, config: { duration: 200 } })
        scale.start({ to: 0, config: { duration: 200 } })
      }, 600)
      
    } else {
      // Reset values when not animating
      scale.set(0) // Reset to size 0
      opacity.set(1)
      rotationY.set(0)
      animatedPosition.set(0)
    }
  }, [isAnimating, scale, opacity, rotationY, animatedPosition])
  
  // Update position during animation
  useFrame(() => {
    if (starRef.current) {
      if (isAnimating) {
        const progress = animatedPosition.get()
        
        // Start from flag center (0,0,0) and move to pentagon position on XY plane
        const newPos = new THREE.Vector3(
          targetPosition.x * progress,
          targetPosition.y * progress,
          targetPosition.z * progress
        )
        
        starRef.current.position.copy(newPos)
        starRef.current.scale.setScalar(scale.get())
        starRef.current.rotation.y = rotationY.get()
        
        const mesh = starRef.current.children[0]
        if (mesh && mesh.material) {
          mesh.material.opacity = opacity.get()
          mesh.material.transparent = true
        }
      } else {
        // When not animating, position at flag center with scale 0
        starRef.current.position.set(0, 0, 0)
        starRef.current.scale.setScalar(0)
        starRef.current.rotation.y = 0
      }
    }
  })
  
  return (
    <group ref={starRef} {...props} dispose={null}>
      <mesh 
        castShadow 
        receiveShadow 
        geometry={nodes.star.geometry} 
        material={materials.Yellow.clone()}
      />
    </group>
  )
}

useGLTF.preload('/models/star-transformed.glb')