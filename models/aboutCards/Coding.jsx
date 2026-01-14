import React from "react";
import { Window } from "./Window";

function LightsWindow(props) {
  return (
    <group {...props} dispose={null}>
      <Window file={"Lights.jsx"}>
        <pre className="code">
          <span className="kw">import</span> <span className="id">React</span>{" "}
          <span className="kw">from</span> <span className="str">"react"</span>;
          {"\n\n"}
          <span className="kw">export default function</span>{" "}
          <span className="fn">Lights</span>() {"{"}
          {"\n"}  <span className="kw">return</span> ({"\n"}    &lt;&gt;
          {"\n"}      &lt;<span className="cmp">ambientLight</span>{" "}
          <span className="prop">color</span>=<span className="sym">{"{"}</span>
          <input
            style={{ width: "7ch" }}
            className="value color"
            defaultValue="#d4e3fc"
            onInput={(e) => {
              e.target.style.width = Math.max(e.target.value.length, 2) + "ch";
            }}
          />
          <span className="sym">{"}"}</span>{" "}
          <span className="prop">intensity</span>=
          <span className="sym">{"{"}</span>
          <input
            style={{ width: "4ch" }}
            className="value number"
            defaultValue="1.25"
            onInput={(e) => {
              e.target.style.width = Math.max(e.target.value.length, 2) + "ch";
            }}
          />
          <span className="sym">{"}"}</span> /&gt;
          {"\n"}      &lt;<span className="cmp">directionalLight</span>
          {"\n"}        <span className="prop">color</span>=
          <span className="sym">{"{"}</span>
          <input
            style={{ width: "7ch" }}
            className="value color"
            defaultValue="#ffffff"
            onInput={(e) => {
              e.target.style.width = Math.max(e.target.value.length, 2) + "ch";
            }}
          />
          <span className="sym">{"}"}</span>
          {"\n"}        <span className="prop">intensity</span>=
          <span className="sym">{"{"}</span>
          <input
            style={{ width: "3ch" }}
            className="value number"
            defaultValue="1.5"
            onInput={(e) => {
              e.target.style.width = Math.max(e.target.value.length, 2) + "ch";
            }}
          />
          <span className="sym">{"}"}</span>
          {"\n"}        <span className="prop">position</span>=
          <span className="sym">{"{["}</span>
          <input
            style={{ width: "3ch" }}
            className="value number"
            defaultValue="-15"
            onInput={(e) =>
              (e.target.style.width = Math.max(e.target.value.length, 2) + "ch")
            }
          />
          ,{" "}
          <input
            style={{ width: "2ch" }}
            className="value number"
            defaultValue="30"
            onInput={(e) =>
              (e.target.style.width = Math.max(e.target.value.length, 2) + "ch")
            }
          />
          ,{" "}
          <input
            style={{ width: "2ch" }}
            className="value number"
            defaultValue="35"
            onInput={(e) =>
              (e.target.style.width = Math.max(e.target.value.length, 2) + "ch")
            }
          />
          <span className="sym">{"]}"}</span>
          {"\n"}        <span className="prop">castShadow</span>=
          <span className="sym">{"{"}</span>
          <input
            style={{ width: "4ch" }}
            className="value boolean"
            defaultValue="true"
            onInput={(e) => {
              e.target.style.width = Math.max(e.target.value.length, 2) + "ch";
            }}
          />
          <span className="sym">{"}"}</span>
          {"\n"}      /&gt;
          {"\n"}    &lt;/&gt;
          {"\n"}  );
          {"\n"}
          {"}"}
        </pre>
      </Window>
    </group>
  );
}

function DebugWindow(props) {
  return (
    <group {...props} dispose={null}>
      <Window file={"Debug-config.json"} />
    </group>
  );
}

export default function Coding() {
  return (
    <>
      <LightsWindow position={[3, 4, 4]}/>
      <DebugWindow position={[-3, 6, 2]}/>
    </>
  );
}
