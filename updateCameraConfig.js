const fs = require("fs");
const path = require("path");
const worldConfig = require("./config/world-config.json");

// Camera configuration parameters
const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 917;
const CAMERA_FRUSTUM_WIDTH = worldConfig.width;
const FOV = 20;
const CAMERA_INCLINATION = -40;
const NEAR = 40;

const HALF_FOV = FOV / 2;

/**
 * Rotates a 2D point around the origin by the specified degrees
 * @param {number} x - X coordinate
 * @param {number} y - Y coordinate
 * @param {number} degrees - Rotation angle in degrees
 * @returns {Object} Rotated point {x, y}
 */
function rotatePoint2DOnOrigin(x, y, degrees) {
  const radians = degrees * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  };
}

/**
 * Rotates a 3D vector around the X-axis
 * @param {Array} vec - 3D vector [x, y, z]
 * @param {number} degrees - Rotation angle in degrees
 * @returns {Array} Rotated vector [x, y, z]
 */
function rotateAroundXAxis(vec, degrees) {
  const rad = degrees * (Math.PI / 180);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const [x, y, z] = vec;

  return [x, y * cos - z * sin, y * sin + z * cos];
}

/**
 * Finds intersection point of a ray with the XZ plane (y = 0)
 * @param {Array} rayOrigin - Ray origin [x, y, z]
 * @param {Array} rayDir - Ray direction [x, y, z]
 * @returns {Array} Intersection point [x, y, z]
 */
function intersectRayWithPlaneY(rayOrigin, rayDir) {
  const t = -rayOrigin[1] / rayDir[1];
  return [rayOrigin[0] + t * rayDir[0], 0, rayOrigin[2] + t * rayDir[2]];
}

/**
 * Normalizes a 3D vector
 * @param {Array} vec - 3D vector [x, y, z]
 * @returns {Array} Normalized vector [x, y, z]
 */
function normalizeVector(vec) {
  const length = Math.sqrt(vec[0] ** 2 + vec[1] ** 2 + vec[2] ** 2);
  return vec.map((v) => v / length);
}

// Calculate world dimensions and camera position
const CAMERA_FRUSTUM_HEIGHT =
  (CAMERA_FRUSTUM_WIDTH * SCREEN_HEIGHT) / SCREEN_WIDTH;
const CAMERA_FRUSTUM_MIDDLE_HEIGHT = CAMERA_FRUSTUM_HEIGHT / 2;

// Calculate camera distance based on FOV
const CAMERA_DISTANCE =
  CAMERA_FRUSTUM_MIDDLE_HEIGHT / Math.tan((HALF_FOV * Math.PI) / 180);
const far = Math.sqrt(CAMERA_DISTANCE ** 2 + CAMERA_FRUSTUM_MIDDLE_HEIGHT ** 2);

// Apply inclination rotation
const cameraPos2D = rotatePoint2DOnOrigin(
  CAMERA_FRUSTUM_MIDDLE_HEIGHT,
  CAMERA_DISTANCE,
  CAMERA_INCLINATION
);
const lookAtPos2D = rotatePoint2DOnOrigin(
  CAMERA_FRUSTUM_MIDDLE_HEIGHT,
  0,
  CAMERA_INCLINATION
);

// Convert to 3D coordinates (x, y, z)
const cameraPos3D = [0, cameraPos2D.y, cameraPos2D.x];
const cameraLookAt3D = [0, lookAtPos2D.y, lookAtPos2D.x];

// Calculate camera direction vector
const direction = [
  cameraLookAt3D[0] - cameraPos3D[0],
  cameraLookAt3D[1] - cameraPos3D[1],
  cameraLookAt3D[2] - cameraPos3D[2],
];
const forwardDirection = normalizeVector(direction);

// Calculate frustum boundaries
const topRayDir = rotateAroundXAxis(forwardDirection, -HALF_FOV);
const bottomRayDir = rotateAroundXAxis(forwardDirection, HALF_FOV);

// Find frustum intersection with ground plane
const topPoint = intersectRayWithPlaneY(cameraPos3D, topRayDir);
const bottomPoint = intersectRayWithPlaneY(cameraPos3D, bottomRayDir);
const frustumHeightOnPlane = Math.abs(topPoint[2] - bottomPoint[2]);

// Generate camera configuration
const cameraConfig = {
  far,
  near: NEAR,
  FOV,
  position: cameraPos3D,
  lookAt: cameraLookAt3D,
  frustumHeightOnPlane,
};

// Save configuration to file
const configPath = path.join(__dirname, "config", "camera-config.json");
fs.writeFileSync(configPath, JSON.stringify(cameraConfig, null, 2));

console.log("Camera config saved to camera-config.json");
console.log("Configuration:", cameraConfig);
