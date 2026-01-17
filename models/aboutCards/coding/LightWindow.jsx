import React, { useState } from "react";
import { Window } from "./Window";
import addSpace from "@/lib/addSpace";
import ControlledInput from "./ControlledInput";

import { useSnapshot } from "valtio";
import { lightsStore, resetLightsStore } from "@/valatio/lightsStorage";

export default function LightsWindow(props) {
  const snap = useSnapshot(lightsStore);
  const [version, setVersion] = useState(0);

  const resetAll = () => {
    resetLightsStore();
    setVersion((v) => v + 1);
  };

  return (
    <group {...props} dispose={null}>
      <Window file={"Lights.jsx"} position={[3, 6, 4]} reset={resetAll}>
        <pre className="code">
          <span className="kw">import</span> <span className="id">React</span>{" "}
          <span className="kw">from</span> <span className="str">"react"</span>;
          {"\n\n"}
          <span className="kw">export default function</span>{" "}
          <span className="fn">Lights</span>() {"{"}
          {"\n"}
          {addSpace(1)}
          <span className="kw">return</span> ({"\n"}
          {addSpace(2)}&lt;&gt;
          {"\n"}
          {addSpace(3)}&lt;<span className="cmp">ambientLight</span>{" "}
          <span className="prop">color</span>=<span className="sym">{"{"}</span>
          <ControlledInput
            type="color"
            className="value color"
            target={lightsStore.ambient}
            prop="color"
            resetKey={version}
          />
          <span className="sym">{"}"}</span>{" "}
          <span className="prop">intensity</span>=
          <span className="sym">{"{"}</span>
          <ControlledInput
            type="number"
            className="value number"
            target={lightsStore.ambient}
            prop="intensity"
            resetKey={version}
          />
          <span className="sym">{"}"}</span> /&gt;
          {"\n"}
          {addSpace(3)}&lt;<span className="cmp">directionalLight</span>
          {"\n"}
          {addSpace(4)}
          <span className="prop">color</span>=<span className="sym">{"{"}</span>
          <ControlledInput
            type="color"
            className="value color"
            target={lightsStore.directional}
            prop="color"
            resetKey={version}
          />
          <span className="sym">{"}"}</span>
          {"\n"}
          {addSpace(4)}
          <span className="prop">intensity</span>=
          <span className="sym">{"{"}</span>
          <ControlledInput
            type="number"
            className="value number"
            target={lightsStore.directional}
            prop="intensity"
            resetKey={version}
          />
          <span className="sym">{"}"}</span>
          {"\n"}
          {addSpace(4)}
          <span className="prop">position</span>=
          <span className="sym">{"{["}</span>
          <ControlledInput
            type="number"
            className="value number"
            target={lightsStore.directional.position}
            prop={0}
            resetKey={version}
          />
          <span className="sym">, </span>
          <ControlledInput
            type="number"
            className="value number"
            target={lightsStore.directional.position}
            prop={1}
            resetKey={version}
          />
          <span className="sym">, </span>
          <ControlledInput
            type="number"
            className="value number"
            target={lightsStore.directional.position}
            prop={2}
            resetKey={version}
          />
          <span className="sym">{"]}"}</span>
          {"\n"}
          {addSpace(4)}
          <span className="prop">castShadow</span>=
          <span className="sym">{"{"}</span>
          <ControlledInput
            type="boolean"
            className="value boolean"
            target={lightsStore.directional}
            prop="castShadow"
            resetKey={version}
          />
          <span className="sym">{"}"}</span>
          {"\n"}
          {addSpace(3)}/&gt;
          {"\n"}
          {addSpace(2)}&lt;/&gt;
          {"\n"}
          {addSpace(1)});
          {"\n"}
          {"}"}
        </pre>
      </Window>
    </group>
  );
}
