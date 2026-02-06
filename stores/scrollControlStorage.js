import { proxy } from "valtio";

export const scrollControlStore = proxy({
  action: null, // 'freeze', 'unfreeze', null
  controlReady: false,
  proxyReady: false,
  frozenScrollY: 0,
});
