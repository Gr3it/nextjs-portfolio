import worldConfig from "@/config/world-config.json";
import cameraConfig from "@/config/camera-config.json";

export function getPositionInPercentage(value) {
  return Math.min(
    (value / (worldConfig.height - cameraConfig.frustumHeightOnPlane)) * 100,
    100,
  );
}

export function calculateGradient() {
  const { sections, height } = worldConfig;

  const colorStops = sections
    .map((s, i) => {
      const start = getPositionInPercentage(s.start) - (i === 0 ? 0 : 0.5);
      const end =
        getPositionInPercentage(sections[i + 1]?.start ?? height) -
        (i === sections.length - 1 ? 0 : 1.5);
      return `${s.color} ${start}% , ${s.color} ${end}%`;
    })
    .join(", ");

  const gradient = `linear-gradient(to right, ${colorStops})`;
  return gradient;
}
