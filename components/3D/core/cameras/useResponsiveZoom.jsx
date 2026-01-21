import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import { cameraStore } from "@/stores/cameraStorage";

export function useResponsiveZoom(wideZoomFactor = 0.2) {
  const { size } = useThree();
  const { zoomValue } = useSnapshot(cameraStore);

  const responsiveZoom = useMemo(() => {
    if (size.height === 0) return 1;

    const aspect = size.width / size.height;
    const TALL_THRESHOLD = 2.1;
    const WIDE_THRESHOLD = 2.2;

    if (aspect < TALL_THRESHOLD) {
      return aspect / TALL_THRESHOLD;
    } else if (aspect > WIDE_THRESHOLD) {
      const extraAspect = aspect - WIDE_THRESHOLD;
      return 1 + extraAspect * wideZoomFactor;
    }

    return 1;
  }, [size.width, size.height, wideZoomFactor]);

  return responsiveZoom * zoomValue;
}
