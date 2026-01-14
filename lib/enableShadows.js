export function enableShadows(scene) {
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;

      // Needed if using MeshStandardMaterial inside glTF
      if (child.material) {
        child.material.needsUpdate = true;
      }
    }
  });
  return scene;
}
