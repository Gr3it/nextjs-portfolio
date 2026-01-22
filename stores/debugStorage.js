import { proxy } from "valtio";

// Questo è l'oggetto reattivo accessibile ovunque
export const debugStore = proxy({
  showGrid: false,
  showStats: false,
  showLightHelper: false,
  showSupportCamera: false,
  enablePathEditor: false,
  disableVehicleSmoothing: false,
  showVehicleSafeZone: false,
  hideVehicle: false,
});

export const resetDebugStore = () => {
  const initial = {
    showGrid: false,
    showStats: false,
    showLightHelper: false,
    showSupportCamera: false,
    enablePathEditor: false,
    disableVehicleSmoothing: false,
    showVehicleSafeZone: false,
    hideVehicle: false,
  };
  Object.assign(debugStore, initial);
};
