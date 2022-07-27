import { useState, useEffect } from "react";
import * as Tone from "tone";
import Editor from "./Editor";
import Preview from "./Preview";
import { show_sheet } from "./parse"
import "./styles.css";

console.log("################# show.js #####################")
const json = JSON.parse(JSON.stringify({
    "tempo": 130,
    "length": 20,
    "number_of_notes": 4,
    "rhythm" : "4/4",
    "notes": [
        {
            "start": 1,
            "length": 4,
            "pitch": 4,
            "note_type": "saw"
        },
        {
            "start": 5,
            "length": 1,
            "pitch": 2,
            "note_type": "saw"
        },
        {
            "start": 5,
            "length": 1,
            "pitch": 12,
            "note_type": "saw"
        },
        {
            "start": 6,
            "length": 1,
            "pitch": 0,
            "note_type": "saw"
        },
        {
            "start": 7,
            "length": 1,
            "pitch": 2,
            "note_type": "saw"
        },
        {
            "start": 7,
            "length": 1,
            "pitch": 5,
            "note_type": "saw"
        },
        {
            "start": 11,
            "length": 1,
            "pitch": 10,
            "note_type": "saw"
        },
        {
            "start": 16,
            "length": 4,
            "pitch": 0,
            "note_type": "saw"
        }
    ]
})) // 넘겨받을 json 데이터

var defaultValue = show_sheet(json)
const synth = new Tone.PolySynth(Tone.Synth).toDestination();

export default function App() {
  console.log("############"+defaultValue);
  const [value, setValue] = useState(defaultValue);
  const [isPlaying, setPlaying] = useState(false);
  

  function onEvent(event) {
    if (!event) {
      return;
    }
    event.notes.forEach((n) => {
      synth.triggerAttackRelease(n.name, n.duration);
    });
  }

  return (
    <div className = "Sheet">
    <Preview value={value}/>
    </div>
  );
}
