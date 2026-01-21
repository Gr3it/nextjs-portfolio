import { proxy } from "valtio";

export const CAMERA_CONFIG = {
  ZOOM: {
    STEP: 0.07,
    MAX: 1.14,
    MIN: 0.86,
    DEFAULT: 1.0,
  },
};

export const cameraStore = proxy({
  zoomValue: CAMERA_CONFIG.ZOOM.DEFAULT,
  isSupportCameraActive: false,

  toggleCamera: () => {
    cameraStore.isSupportCameraActive = !cameraStore.isSupportCameraActive;
  },
});
