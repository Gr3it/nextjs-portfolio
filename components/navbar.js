import React from "react";
import ProgressBar from "./progressBar";

export default function Navbar({ scroll }) {
  return (
    <div className="w-full max-w-screen-2xl fixed h-20 flex items-center gap-8 top-4 px-8 z-50">
      <ProgressBar scroll={scroll} />
    </div>
  );
}
