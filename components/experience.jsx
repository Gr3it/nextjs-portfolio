"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSmoothProgress } from "@/hooks/useSmoothProgress";
import LoadingScreen from "@/components/ui/loadingScreen";
import { scrollControlStore } from "@/stores/scrollControlStorage";
import { usePathname } from "next/navigation";
import CustomCursor from "./ui/customCursor";

const App3d = dynamic(() => import("@/components/app3d"), {
  ssr: false,
});

export default function Experience() {
  const [startFetchingJS, setStartFetchingJS] = useState(false);
  const { smoothProgress } = useSmoothProgress(startFetchingJS);
  const [isReady, setIsReady] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) {
      if (isReady) scrollControlStore.action = "unfreeze";
    } else {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => {
          setStartFetchingJS(true);
        });
      } else {
        setTimeout(() => setStartFetchingJS(true), 2000);
      }
    }
  }, [isHome]);

  const handleVideoLoaded = () => {
    setStartFetchingJS(true);
  };

  return (
    <>
      {!isReady && isHome && (
        <LoadingScreen
          progress={smoothProgress}
          onVideoReady={handleVideoLoaded}
        />
      )}

      {startFetchingJS && (
        <App3d
          onReady={() => {
            if (isHome) {
              scrollControlStore.action = "unfreeze";
              window.dispatchEvent(new CustomEvent("startTransitionIn"));
            }
            setIsReady(true);
            setStartFetchingJS(true);
          }}
        />
      )}
      <CustomCursor pathname={pathname} loadingScreen={!isReady} />
    </>
  );
}
