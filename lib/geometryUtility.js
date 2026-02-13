import * as THREE from "three";

/**
 * Calcola l'offset necessario per arrotondare il centro della geometria ai centesimi.
 * @param {THREE.BufferGeometry} geometry
 */
export const getGeometryReport = (geometry) => {
  if (!geometry) return null;

  geometry.computeBoundingBox();
  const center = new THREE.Vector3();
  geometry.boundingBox.getCenter(center);

  // Funzione per trovare lo scarto verso il centesimo più vicino
  // Es: 0.0512 -> arrotonda a 0.05 -> offset necessario: -0.0012
  const getOffsetToNearestCent = (val) => {
    const rounded = Math.round(val * 100) / 100;
    const diff = rounded - val;
    // Arrotondiamo il risultato finale per evitare errori di floating point
    return Math.round(diff * 100000) / 100000;
  };

  const offX = getOffsetToNearestCent(center.x);
  const offY = getOffsetToNearestCent(center.y);
  const offZ = getOffsetToNearestCent(center.z);

  const positionString = `position={[${offX}, ${offY}, ${offZ}]}`;

  console.groupCollapsed(`Draco Correction Report - Centesimi`);
  console.log("%c Centro Attuale (Impreciso):", "color: #ff9900", center);
  console.log(
    "%c Offset Correttivo per Arrotondare:",
    "color: #00ff00; font-weight: bold;",
  );
  console.log(positionString);
  console.log("-----------------------");
  console.table({
    "Valore Originale": { x: center.x, y: center.y, z: center.z },
    "Arrotondato a 0.01": {
      x: Math.round(center.x * 100) / 100,
      y: Math.round(center.y * 100) / 100,
      z: Math.round(center.z * 100) / 100,
    },
    "Offset da Incollare": { x: offX, y: offY, z: offZ },
  });
  console.groupEnd();

  return { offX, offY, offZ, positionString };
};

export const snapVerticesToGrid = (geometry, precision = 2) => {
  if (!geometry || !geometry.attributes.position) return;

  const position = geometry.attributes.position;
  const factor = Math.pow(10, precision);

  for (let i = 0; i < position.count; i++) {
    let x = position.getX(i);
    let y = position.getY(i);
    let z = position.getZ(i);

    x = Math.round(x * factor) / factor;
    y = Math.round(y * factor) / factor;
    z = Math.round(z * factor) / factor;

    position.setXYZ(i, x, y, z);
  }

  position.needsUpdate = true;

  geometry.computeVertexNormals();

  return geometry;
};
