import React, { useState } from "react";
import { Window } from "./Window";
import addSpace from "@/lib/addSpace";
import ControlledInput from "./ControlledInput";

import { debugStore, resetDebugStore } from "@/stores/debugStorage";

export default function DebugWindow(props) {
  const [version, setVersion] = useState(0);

  const handleReset = () => {
    resetDebugStore();
    setVersion((v) => v + 1);
  };

  return (
    <group {...props} dispose={null}>
      <Window
        file={"Debug-config.json"}
        position={[-3, 6, 2]}
        reset={handleReset}
        isFocused={props.isFocused}
      >
        {props.hide || (
          <pre className="code">
            <span className="sym">{"{"}</span>
            {"\n"}

            {addSpace(1)}
            <span className="cmt">// Visual debug</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"showGrid"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="showGrid"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="sym">,</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"showStats"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="showStats"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="sym">,</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"showLightHelper"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="showLightHelper"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="sym">,</span>
            {"\n\n"}

            {addSpace(1)}
            <span className="cmt">// Camera / support</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"showSupportCamera"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="showSupportCamera"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="sym">,</span>
            {"\n\n"}

            {addSpace(1)}
            <span className="cmt">// Vehicle</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"enablePathEditor"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="enablePathEditor"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="sym">,</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"disableVehicleSmoothing"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="disableVehicleSmoothing"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="sym">,</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"showVehicleSafeZone"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="showVehicleSafeZone"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="sym">,</span>
            {"\n"}

            {addSpace(1)}
            <span className="key">"hideVehicle"</span>
            <span className="sym">: </span>
            <ControlledInput
              target={debugStore}
              prop="hideVehicle"
              type="boolean"
              className="value boolean"
              resetKey={version}
            />
            <span className="cmt"> // Only in editor</span>
            {"\n"}

            <span className="sym">{"}"}</span>
          </pre>
        )}
      </Window>
    </group>
  );
}
