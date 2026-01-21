import { proxy } from "valtio";

export const scrollStore = proxy({
  percentage: 0,
  reachedPositions: new Set(),
});
