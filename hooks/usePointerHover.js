import { useCallback, useState } from "react";

export function usePointerHover(cursor = "pointer") {
  const [hover, setHover] = useState(false);

  const handlePointerOver = useCallback(() => {
    setHover(true);
    document.body.style.cursor = cursor;
  }, [cursor]);

  const handlePointerOut = useCallback(() => {
    setHover(false);
    document.body.style.cursor = "auto";
  }, []);

  return {
    hover,
    handlePointerOver,
    handlePointerOut,
  };
}
