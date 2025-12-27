import fontMap from "@/components/fontMap";
import { Billboard, Text } from "@react-three/drei";
import React, { useState } from "react";

import { SpacePiratesPreview } from "@/models/projectPreviews/SpacePiratesPreview";
import { SnipingBotPreview } from "@/models/projectPreviews/SnipingBotPreview";
import { EventToolPreview } from "@/models/projectPreviews/EventToolPreview";
import { FlynetPreview } from "@/models/projectPreviews/FlynetPreview";
import { HotelMeanoPreview } from "@/models/projectPreviews/HotelMeanoPreview";
import { MetaEmpirePreview } from "@/models/projectPreviews/MetaEmpirePreview";
import { SmartParkingAppPreview } from "@/models/projectPreviews/SmartParkingAppPreview";
import { CryptoPriceTrackerPreview } from "@/models/projectPreviews/CryptoPriceTrackerPreview";
import { ColorScreenTestPreview } from "@/models/projectPreviews/ColorScreenTestPreview";
import { PlanItPreview } from "@/models/projectPreviews/PlanItPreview";
import { WalletTrackerPreview } from "@/models/projectPreviews/WalletTrackerPreview";
import { PortfolioPreview } from "@/models/projectPreviews/PortfolioPreview";
import { Minecraft } from "@/models/aboutCards/Minecraft";

const PROJECT_COMPONENTS = {
  SpacePiratesPreview,
  SnipingBotPreview,
  EventToolPreview,
  FlynetPreview,
  HotelMeanoPreview,
  MetaEmpirePreview,
  SmartParkingAppPreview,
  CryptoPriceTrackerPreview,
  ColorScreenTestPreview,
  PlanItPreview,
  WalletTrackerPreview,
  PortfolioPreview,
  Minecraft,
};

function getCardComponent(type) {
  const Component = PROJECT_COMPONENTS[type];
  return Component ? <Component /> : null;
}

export default function AboutCard({ card }) {
  return (
    <group position={card.position}>
      <mesh position={[9, 0.001, 9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 18]} />
        <meshBasicMaterial transparent opacity={0} color={"hotpink"} />
      </mesh>

      <group position={[9, 0, 4]}>{getCardComponent(card?.component)}</group>

      <group position={[1, 0.01, 6]}>
        <Text
          position={[8, 0, 1.75]}
          anchorX={"center"}
          anchorY={"bottom"}
          rotation={[-1.5707963267948966, 0, 0]}
          fontSize={1.4}
          lineHeight={1.2}
          maxWidth={16}
          font={fontMap[600]}
        >
          {card.title}
        </Text>
        <Text
          position={[0, 0, 2]}
          anchorX={"left"}
          anchorY={"top"}
          rotation={[-1.5707963267948966, 0, 0]}
          fontSize={0.75}
          maxWidth={16}
          font={fontMap[400]}
        >
          {card.description}
        </Text>
      </group>
    </group>
  );
}
