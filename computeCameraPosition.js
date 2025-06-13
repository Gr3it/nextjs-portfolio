const fs = require("fs");
const path = require("path");

const worldConfig = require("./config/world-config.json");

const screenWidth = 1920;
const worldWidth = worldConfig.width;
const screenHeight = 917;
const FOV = 20;
const inclination = -40;
const near = 40;

function rotatePoint(x, y, degrees) {
  const radians = degrees * (Math.PI / 180);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);

  const newX = x * cos - y * sin;
  const newY = x * sin + y * cos;

  return { x: newX, y: newY };
}

const worldHeight = (worldWidth * screenHeight) / screenWidth;
const worldMiddleHeightPoints = worldHeight / 2;

const cameraHeight =
  worldMiddleHeightPoints / Math.tan(((FOV / 2) * Math.PI) / 180);

const far = Math.sqrt(cameraHeight ** 2 + worldMiddleHeightPoints ** 2);

const cameraPositionRotated = rotatePoint(
  worldMiddleHeightPoints,
  cameraHeight,
  inclination
);
const lookAtPositionRotated = rotatePoint(
  worldMiddleHeightPoints,
  0,
  inclination
);

// Final camera vectors
const position = [0, cameraPositionRotated.y, cameraPositionRotated.x];
const lookAt = [0, lookAtPositionRotated.y, lookAtPositionRotated.x];

function intersectRayWithPlaneY(rayOrigin, rayDir) {
  const t = -rayOrigin[1] / rayDir[1]; // y = 0 → solve for t
  return [rayOrigin[0] + t * rayDir[0], 0, rayOrigin[2] + t * rayDir[2]];
}

// Reuse your camera position and lookAt
const dir = [
  lookAt[0] - position[0],
  lookAt[1] - position[1],
  lookAt[2] - position[2],
];
const dirLength = Math.sqrt(dir[0] ** 2 + dir[1] ** 2 + dir[2] ** 2);
const forward = dir.map((v) => v / dirLength); // normalize

// Create rotation for vertical FOV edges
function rotateAroundX(vec, degrees) {
  const rad = degrees * (Math.PI / 180);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const [x, y, z] = vec;
  return [x, y * cos - z * sin, y * sin + z * cos];
}

const fovHalf = FOV / 2;

const topRayDir = rotateAroundX(forward, -fovHalf);
const bottomRayDir = rotateAroundX(forward, fovHalf);

// Intersect both rays with y=0
const topPoint = intersectRayWithPlaneY(position, topRayDir);
const bottomPoint = intersectRayWithPlaneY(position, bottomRayDir);

// Compute height on the plane
const frustumHeightOnPlane = Math.abs(topPoint[2] - bottomPoint[2]);

// Save to JSON
const data = {
  far,
  near,
  FOV,
  position,
  lookAt,
  frustumHeightOnPlane,
};

fs.writeFileSync(
  path.join(__dirname, "/config/camera-config.json"),
  JSON.stringify(data, null, 2)
);

console.log("Camera config saved to camera-config.json");
