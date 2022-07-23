import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react' //useSate import
import SongMakerSelf from './SongMakerSelf/SongMakerSelf';

function App() {
  const [inputValue,setInputValue]=useState(1)

  function getNoteLength(){
  setInputValue(inputValue);
  }

  return (
    <div className="App">
      <h1>HeadBar!!!</h1>
        <input type="number" onChange={(e)=>setInputValue(e.target.valueAsNumber)}></input>
        <button onClick={getNoteLength}>입력</button>
        <NoteLength inputValue={inputValue} />

      <SongMakerSelf column={10} noteLength={inputValue}/>
    </div>
  );
}

function NoteLength(props){
  return(
      <h2>note 길이는 {props.inputValue}!!!!</h2>
  )
}

export default App;
