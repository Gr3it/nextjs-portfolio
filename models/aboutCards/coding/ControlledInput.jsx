import React, { useEffect, useState, useMemo } from "react";
import { validators } from "@/lib/inputValidators";

export default function ControlledInput({
  target,
  prop,
  type,
  resetKey,
  className,
}) {
  // target è l'oggetto proxy, prop è la stringa della chiave (es. "showGrid")
  const [internal, setInternal] = useState(String(target[prop]));
  const validator = validators[type];
  const isValid = useMemo(() => validator(internal), [internal, validator]);

  // Sync su reset
  useEffect(() => {
    setInternal(String(target[prop]));
  }, [target[prop], resetKey]);

  const handleInput = (e) => {
    const val = e.target.value;
    setInternal(val);

    if (validator(val)) {
      // Valtio: Mutazione diretta! Super clean.
      if (type === "boolean") target[prop] = val === "true";
      else if (type === "number") target[prop] = Number(val);
      else target[prop] = val;
    }
  };

  return (
    <input
      value={internal}
      onInput={handleInput}
      className={className}
      style={{
        width: `${Math.max(internal.length, 2)}ch`,
        backgroundColor: isValid ? "transparent" : "rgba(255, 0, 0, 0.25)",
      }}
    />
  );
}
