import { useRef } from "react";
import { useScrollProxyListener } from "../scrollProxy/scrollProxy";

export default function VehicleController({
  curve,
  start,
  end,
  damping = 5,
  children,
}) {
  const carGroupRef = useRef();

  useScrollProxyListener(
    (scrollProgress) => {
      if (!carGroupRef.current || !curve) return;

      const point = curve.getPointAt(scrollProgress);
      const tangent = curve.getTangentAt(scrollProgress).normalize();

      carGroupRef.current.position.copy(point);

      const yAngle = Math.atan2(tangent.x, tangent.z);
      carGroupRef.current.rotation.y = yAngle;

      const horizontalDistance = Math.sqrt(
        tangent.x * tangent.x + tangent.z * tangent.z
      );
      const xAngle = Math.atan2(-tangent.y, horizontalDistance);
      carGroupRef.current.rotation.x = xAngle;
    },
    {
      damping: damping,
      start: start,
      end: end,
    }
  );

  return <group ref={carGroupRef}>{children}</group>;
}
