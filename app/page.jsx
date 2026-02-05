"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useSmoothProgress } from "@/hooks/useSmoothProgress";
import LoadingScreen from "@/components/ui/loadingScreen";

const App3d = dynamic(() => import("@/components/app3d"), {
  ssr: false,
});

export default function World() {
  const [startFetchingJS, setStartFetchingJS] = useState(false);
  const { smoothProgress, isLoading } = useSmoothProgress(startFetchingJS);

  const handleVideoLoaded = () => {
    setStartFetchingJS(true);
  };

  return (
    <>
      {isLoading && (
        <LoadingScreen
          progress={smoothProgress}
          onVideoReady={handleVideoLoaded}
        />
      )}

      {startFetchingJS && <App3d />}
    </>
  );
}
