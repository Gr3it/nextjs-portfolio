import { useGLTF } from "@react-three/drei";

export const SCENE_ASSETS = [
  // --- 1. WORLD ---
  "/models/world/Village-transformed.glb",
  "/models/world/Forest-transformed.glb",
  "/models/world/Plains-transformed.glb",
  "/models/world/Badlands-transformed.glb",
  "/models/world/Desert-transformed.glb",
  "/models/world/Ocean-transformed.glb",
  "/models/world/Skylands-transformed.glb",
  "/models/world/City-transformed.glb",

  // --- 2. VEHICLES & DECORATIONS ---
  "/models/vehicles/sedan-sports-transformed.glb",
  "/models/vehicles/boat-sail-a-transformed.glb",
  "/models/vehicles/spaceship-transformed.glb",
  "/models/vehicles/commercial-train-transformed.glb",
  "/models/vehicles/train-transformed.glb",
  "/models/Flag.glb",
  "/models/star-transformed.glb",

  // --- 3. PROJECT PREVIEWS ---
  "/models/projectPreviews/ColorScreenTestPreview-transformed.glb",
  "/models/projectPreviews/CryptoPriceTrackerPreview-transformed.glb",
  "/models/projectPreviews/EventToolPreview-transformed.glb",
  "/models/projectPreviews/FlynetPreview-transformed.glb",
  "/models/projectPreviews/HotelMeanoPreview-transformed.glb",
  "/models/projectPreviews/MetaEmpirePreview-transformed.glb",
  "/models/projectPreviews/PlanItPreview-transformed.glb",
  "/models/projectPreviews/PortfolioPreview-transformed.glb",
  "/models/projectPreviews/SmartParkingAppPreview-transformed.glb",
  "/models/projectPreviews/SnipingBotPreview-transformed.glb",
  "/models/projectPreviews/SpacePiratesPreview-transformed.glb",
  "/models/projectPreviews/WalletTrackerPreview-transformed.glb",

  // --- 4. ABOUT ---
  "/models/aboutCards/Window-transformed.glb",
  "/models/aboutCards/Blockchain-transformed.glb",
  "/models/aboutCards/Design-transformed.glb",
  "/models/aboutCards/Games-transformed.glb",
  "/models/aboutCards/Minecraft-transformed.glb",
  "/models/aboutCards/minecraft/Allay-transformed.glb",
  "/models/aboutCards/minecraft/Bee-transformed.glb",
  "/models/aboutCards/minecraft/model-transformed.glb",
  "/models/aboutCards/minecraft/Sheep-transformed.glb",
  "/models/aboutCards/minecraft/Tree-transformed.glb",

  // --- 5. FOOTER ---
  "/models/footerCards/Document-transformed.glb",
  "/models/footerCards/Github-transformed.glb",
  "/models/footerCards/Linkedin-transformed.glb",
  "/models/footerCards/PaperPlane-transformed.glb",
];

export const preloadAssets = (assets) => {
  assets.forEach((path) => useGLTF.preload(path));
};
