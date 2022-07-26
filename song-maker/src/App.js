import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react' //useSate import
import SongMakerSelf from './SongMakerSelf/SongMakerSelf';
import musicImg from './music.png'

function App() {
  const [inputValue,setInputValue]=useState(1)
  const [inputTempo, setInputTempo]=useState(120)
  const [Selected, setSelected]=useState('');
  const [Selected2, setSelected2]=useState('');

  // const [inputNoteType, setInputNoteType]=useState()
  const handleSelect=(e)=>{
    setSelected(e.target.value);
  }
  const handleSelect2=(e)=>{
    setSelected2(e.target.value);
  }
  // function getNoteLength(){
  // setInputValue(inputValue);
  // setInputTempo(inputTempo);
  // }
  const handleClick=(e)=>{
    e.preventDefault();
  }

  return (
    <form className="App">
      <img src={musicImg} 
      width="50" 
      alt="music"/>
      <h2>Music Maker</h2>
        <div>
        <h5>note Length: </h5>
        <input className="inputInfo" type="number" onChange={(e)=>setInputValue(e.target.valueAsNumber)}></input>
        </div>
        <div>
        <h5>Tempo: </h5>
        <input className="inputInfo" type="number" onChange={(e)=>setInputTempo(e.target.valueAsNumber)}></input>
        </div>
        <label for="noteType">Choose the note type:</label>
        <select name="noteType" id="noteTypes" onChange={handleSelect} value={Selected}>
          <option value="sin">sin</option>
          <option value="square">square</option>
          <option value="triangle">triangle</option>
          <option value="saw">saw</option>
          <option value="synth1">synth1</option>
        </select>
        <select name="rhythm" id="rhythms" onChange={handleSelect2} value={Selected2}>
          <option>4/4</option>
          <option>3/4</option>
        </select>
        <input type="submit" value="Submit" onClick={handleClick}></input>
        {/* <button onClick={getNoteLength}>입력</button> */}
        <NoteLength inputValue={inputValue} />
        <Tempo inputTempo={inputTempo} />
        <p>NoteType Selected: {Selected}</p>
        <p>NoteType Selected: {Selected2}</p>
      <SongMakerSelf column={10} noteLength={inputValue} tempo={inputTempo} note_type={Selected} rhythm={Selected2}/>
    </form>
  );
}

function NoteLength(props){
  return(
      <h2>note 길이는 {props.inputValue}!!!!</h2>
  )
}

function Tempo(props){
  return(
      <h2>temp는 {props.inputTempo}!!!!</h2>
  )
}

export default App;
