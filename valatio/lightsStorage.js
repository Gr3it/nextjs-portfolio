import { proxy } from "valtio";

export const lightsStore = proxy({
  ambient: {
    color: "#D4E3FC",
    intensity: 1.25,
  },
  directional: {
    color: "#FFFFFF",
    intensity: 1.5,
    position: [-15, 30, 35],
    castShadow: true,
  },
});

export const resetLightsStore = () => {
  // Reset Ambient Light
  lightsStore.ambient.color = "#D4E3FC";
  lightsStore.ambient.intensity = 1.25;

  // Reset Directional Light
  lightsStore.directional.color = "#FFFFFF";
  lightsStore.directional.intensity = 1.5;
  lightsStore.directional.castShadow = true;

  // Reset Position (Array)
  lightsStore.directional.position[0] = -15;
  lightsStore.directional.position[1] = 30;
  lightsStore.directional.position[2] = 35;
};
