import React, {useState, useEffect, StrictMode} from 'react'
import './AppSongMaker.css';
import SongMakerSelf from './SongMakerSelf';
import musicImg from './img/music.png'

import Piano from './piano';
const AppSongMaker =()=>{
    const [inputValue,setInputValue]=useState(1)
    const [inputTempo, setInputTempo]=useState(120)
    const [Selected, setSelected]=useState('sine');
    const [Selected2, setSelected2]=useState('4/4');

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


    return(
    <div >
      <div className='noteAndAdd'>
      <form >
        <div className='inputs'>
        <img src={musicImg} 
        width="30"
        height="30" 
        alt="music"
        className='AppSongMakerSrc'/>
        <div className='header'>Music Maker</div>

          <div className='inputNT'>
            <div className='inputNT'>
          <h5>Note Length: </h5>
          <input className="inputInfo" type="number" onChange={(e)=>setInputValue(e.target.valueAsNumber)}></input>
          </div>
          <div className='inputNT'>
          <h5>Tempo: </h5>
          <input className="inputInfo" type="number" onChange={(e)=>setInputTempo(e.target.valueAsNumber)}></input>
          </div>
          
          </div>


          <div className='inputNT'>
          <div className='inputNT'>
          <h5 for="noteType">Note type:</h5>
          
          <select name="noteType" id="noteTypes" onChange={handleSelect} value={Selected}>
            <option value="sin" selected>sin</option>
            <option value="square">square</option>
            <option value="triangle">triangle</option>
            <option value="saw">saw</option>
            <option value="synth1">synth1</option>
          </select>
          </div>
          <div className='inputNT'>
          <h5 for="noteType">Rhythm:</h5>
          <select name="rhythm" id="rhythms" onChange={handleSelect2} value={Selected2}>
            <option >3/4</option>
            <option selected>4/4</option>
          </select>
          <input type="submit" value="Submit" onClick={handleClick}></input>
          </div>
          </div>
          
          </div>
          {/* <button onClick={getNoteLength}>입력</button> */}
          {/* <NoteLength inputValue={inputValue} />
          <Tempo inputTempo={inputTempo} />
          <p>NoteType Selected: {Selected}</p>
          <p>NoteType Selected: {Selected2}</p> */}
        {/* <SongMakerSelf column={50} noteLength={inputValue} tempo={inputTempo} note_type={Selected} rhythm={Selected2}/> */}
        <Piano noteLength={inputValue} tempo={inputTempo} note_type={Selected} rhythm={Selected2}/>
      </form>
      
      </div>
      
    </div>
    )
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


export default AppSongMaker