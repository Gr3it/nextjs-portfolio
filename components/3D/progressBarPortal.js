import { useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Navbar from "../navbar";

export default function ProgressBarPortal() {
  const rootRef = useRef(null);
  const scroll = useScroll();

  useEffect(() => {
    const target = document.getElementById("nav-portal");
    if (!target) {
      console.warn(`Target element with id nav-portal not found`);
      return;
    }

    rootRef.current = createRoot(target);
    rootRef.current.render(<Navbar scroll={scroll} />);

    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
  }, [scroll]);

  return null;
}
