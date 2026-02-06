"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSmoothProgress } from "@/hooks/useSmoothProgress";
import LoadingScreen from "@/components/ui/loadingScreen";
import { scrollControlStore } from "@/stores/scrollControlStorage";
import { usePathname } from "next/navigation";

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

      {(startFetchingJS || !isHome) && (
        <App3d
          onReady={() => {
            if (isHome) scrollControlStore.action = "unfreeze";
            setIsReady(true);
          }}
          hide={!isHome}
        />
      )}
    </>
  );
}
