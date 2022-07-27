import React, {useState, useEffect, StrictMode} from 'react'
import '../SongMakerSelf/AppSongMaker.css'
// import SongMakerSelf from './SongMakerSelf';
import musicImg from '../SongMakerSelf/img/music.png'
import Piano from '../SongMakerSelf/piano';
import Sheet from '../score/sheet'

var key=0;

const SongMakerGroup=()=>{

    const [inputValue,setInputValue]=useState(1)
    const [inputTempo, setInputTempo]=useState(120)
    const [Selected, setSelected]=useState('sine');
    const [Selected2, setSelected2]=useState('4/4');

    const [rowMake, setRowMake]=useState([]);//rowMake 배열

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
    // const handleClick=(e)=>{
    //     e.preventDefault();
    // }

    const addRow=(event)=>{
        event.preventDefault();
        console.log("ADDDCLICKEDDD!!!!");
        //piano.js 화면으로 이동 (개인 작곡 화면)
        // return(<Piano noteLength={1} tempo={154} note_type={"saw"} rhythm={"4/4"}/>)//noteLength={inputValue} tempo={inputTempo} note_type={Selected} rhythm={Selected2}

        <Piano noteLength={1} tempo={154} note_type={"saw"} rhythm={"4/4"}/>
    }

    return (
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
            {/* <div className='inputNT'>
          <h5>Note Length: </h5>
          <input className="inputInfo" type="number" onChange={(e)=>setInputValue(e.target.valueAsNumber)}></input>
          </div> */}
          <div className='inputNT'>
          <h5>tempo: </h5>
          <input className="inputInfo" type="number" onChange={(e)=>setInputTempo(e.target.valueAsNumber)}></input>
          </div>
          
          </div>


          <div className='inputNT'>
          
          <div className='inputNT'>
          <h5 for="noteType">rhythm:  </h5>
          <select name="rhythm" id="rhythms" onChange={handleSelect2} value={Selected2}>
            <option >3/4</option>
            <option selected>4/4</option>
          </select>
          {/* <input type="submit" value="Submit" onClick={handleClick}></input> */}
          </div>
          </div>
          
          </div>
          {/* <h5 className="h55"for="noteType">note type</h5>
          
          <div className='OneRow'>
          <select name="noteType" id="noteTypes" onChange={handleSelect} value={Selected}>
            <option value="sin" selected>sin</option>
            <option value="square">square</option>
            <option value="triangle">triangle</option>
            <option value="saw">saw</option>
            <option value="synth1">synth1</option>
          </select>
          <Sheet json = {json}/>
          </div> */}
          
      </form>
      
      </div>
      <div className='rowrow'>
      <input className='row-add' type="button" onClick={addRow}>
        {/* {
            rowMake.map(row=>{
                return <div key={key++}>{row}</div>
            })
        } */}
      </input>
      </div>
    </div>
    )
}

export default SongMakerGroup