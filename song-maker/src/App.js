import { useState, useEffect } from "react";

import * as Tone from "tone";

import Editor from "./score/Editor";
import Preview from "./score/Preview";

import "./styles.css";

const defaultValue = `
\`\`\`abc
X: 1
M: 4/4
K: Am
|cea|[^Gb],ecb|[Gc']ecc'|[^F^f]dA^f|[eF]cAc-|cecA|[B,GB][A,Ac][A,Ac]4|
\`\`\``;

const synth = new Tone.PolySynth(Tone.Synth).toDestination();

export default function App() {
  const [value, setValue] = useState(defaultValue);
  const [isPlaying, setPlaying] = useState(false);
  function onEditorChange(value, event) {
    setValue(value);
  }

  function onEvent(event) {
    if (!event) {
      return;
    }
    event.notes.forEach((n) => {
      synth.triggerAttackRelease(n.name, n.duration);
    });
  }


  return (
    <div className="App">
      <Editor onEditorChange={onEditorChange} defaultValue={defaultValue} />
      <div className="preview-wrapper">
        <Preview value={value} onEvent={onEvent} isPlaying={isPlaying} />
      </div>
    </div>
  );
}
