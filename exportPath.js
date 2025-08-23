// generate-tubes.js (CommonJS)
const fs = require("fs");
const path = require("path");
const THREE = require("three");
const { GLTFExporter } = require("three-stdlib");

const CONFIG_FILE = "./config/vehicles-config.json";
const OUTPUT_FILE = "./paths.glb";
const TUBE_PARAMS = {
  tubularSegments: 1000,
  radius: 0.8,
  radialSegments: 8,
  closed: false,
};

// Load curve data
let data = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));

// Create a Three.js scene
const scene = new THREE.Scene();

// Material for tubes
const material = new THREE.MeshStandardMaterial({
  color: 0x00aaff,
});

// Loop over curves from JSON
data.forEach((vehicle, i) => {
  const points = vehicle.points.map((p) => new THREE.Vector3(p[0], p[1], p[2]));
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.TubeGeometry(
    curve,
    TUBE_PARAMS.tubularSegments,
    TUBE_PARAMS.radius,
    TUBE_PARAMS.radialSegments,
    TUBE_PARAMS.closed
  );

  const mesh = new THREE.Mesh(geometry, material.clone());

  const vehicleType = vehicle.type || "unknown";
  mesh.name = `${vehicleType}_path_${i}`;

  scene.add(mesh);
});

// Export scene as GLB
const exporter = new GLTFExporter();

const options = {
  binary: true,
  embedImages: false,
  includeCustomExtensions: false,
};

exporter.parse(
  scene,
  (result) => {
    fs.writeFileSync(OUTPUT_FILE, Buffer.from(result));
    console.log("✅ Exported to paths.glb");
  },
  (error) => {
    console.error("Error during GLB export:", error);
    process.exit(1);
  },
  options
);

// Expected JSON format:
/*
[
  {
    "type": "car",
    "points": [
      [0, 0, 0],
      [10, 5, 2],
      [20, 10, 4],
      [30, 8, 6]
    ]
  },
  {
    "type": "truck", 
    "points": [
      [0, 10, 0],
      [15, 12, 3],
      [25, 15, 5]
    ]
  }
]
*/
