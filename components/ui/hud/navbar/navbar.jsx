import React from "react";
import ProgressBar from "./progressBar";

export default function Navbar() {
  return (
    <div className="fixed top-4 inset-x-0 z-10 flex justify-center pointer-events-none">
      <div className="w-full max-w-screen-2xl h-20 flex items-center gap-8 px-8 pointer-events-auto">
        <ProgressBar />
      </div>
    </div>
  );
}
