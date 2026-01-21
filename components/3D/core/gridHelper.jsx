import * as THREE from "three";
import { useMemo } from "react";

// Configuration constants
const DEFAULT_GRID_CONFIG = {
  size: 200,
  divisions: 100, // size / 2 was probably intended to be more divisions
  centerLineColor: 0x444444,
  gridColor: 0x888888,
};

export function GridOverlay({
  size = DEFAULT_GRID_CONFIG.size,
  divisions = DEFAULT_GRID_CONFIG.divisions,
  centerLineColor = DEFAULT_GRID_CONFIG.centerLineColor,
  gridColor = DEFAULT_GRID_CONFIG.gridColor,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) {
  const gridHelper = useMemo(() => {
    return new THREE.GridHelper(size, divisions, centerLineColor, gridColor);
  }, [size, divisions, centerLineColor, gridColor]);

  return (
    <primitive object={gridHelper} position={position} rotation={rotation} />
  );
}
