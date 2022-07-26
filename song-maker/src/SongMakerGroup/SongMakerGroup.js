import  axios  from 'axios';
import React, {useState, useEffect, useRef, StrictMode} from 'react'
import '../SongMakerSelf/AppSongMaker.css'
// import SongMakerSelf from './SongMakerSelf';
import musicImg from '../SongMakerSelf/img/music.png'
import Piano from '../SongMakerSelf/piano';
import Sheet from '../score/sheet_by_string'
import {show_sheet} from '../score/parse';
import { useNavigate } from "react-router-dom";

var key=0;
var sheet_id=0;
// var i=0;
// var a=['a','b','c','d','e'];

const SongMakerGroup=()=>{
    
    let navigate=useNavigate();
    const userId = localStorage.getItem("id");
    const [inputValue,setInputValue]=useState(1)
    const [inputTempo, setInputTempo]=useState(120)
    const [inputName, setInputName]=useState("")
    const [Selected, setSelected]=useState('sine');
    const [Selected2, setSelected2]=useState('4/4');

    const [rowMake, setRowMake]=useState([]);//rowMake 배열
    const [jsonStringArr, setJsonStringArr]=useState([]);//jsonString 배열
    const [instrument, setInstrument]=useState([]);
    const [local, setLocal]=useState([]);

    const [total_length, setTotalLength] = useState(0);
    const [notes, setNotes] = useState([]);

    const [showPopup, setShowPopup]=useState(false);

    const playtestButton = useRef();
    const uploadButton = useRef();
    
    const togglePopup=(event)=>{
      setShowPopup(event.target.value);
    }

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
        
        //일단 piano.js로 보내주기

        navigate('/music_maker');
        
        // return(<Piano noteLength={1} tempo={154} note_type={"saw"} rhythm={"4/4"}/>)//noteLength={inputValue} tempo={inputTempo} note_type={Selected} rhythm={Selected2}
        
        // <Piano noteLength={1} tempo={154} note_type={"saw"} rhythm={"4/4"}/>
    }

    //get 받기
    // axios.get(`/api/temporary/${userId}`
    // , {
    //     headers: {"Content-Type": 'application/json'},
    // }).then((res)=>{
    //     console.log("RES")
    //     console.log(res)
    //     const jsonGet=res.data.value;
    //     const instrumentGet=res.data.instrm;
    //     setJsonStringArr(jsonStringArr.concat(
    //         {instrument: instrumentGet,
    //         jsonStr: jsonGet}));
    //     localStorage.setItem(userId, JSON.stringify(jsonStringArr.concat(
    //         {instrument: instrumentGet,
    //         jsonStr: jsonGet})));
    //     console.log("JsonStringARr!!!",jsonStringArr); //한 번 늦게 업데이트 됨
    //     // setInstrument(instrument?.concat(instrumentGet));
    //     // console.log("instrumentArr!!!", instrument);
    // });
    
    useEffect(()=>{
        const userItem = localStorage.getItem(userId);
        console.log("Hey");
        
        if (userItem === null) {
          setLocal([]);
        }
        else {
          const parsedItem = JSON.parse(userItem);
          setLocal(parsedItem);

          var maximum_length = 0;
          var notes = [];

          parsedItem.map(jsonObj => {
            console.log("???");
            console.log(jsonObj);
            const innerObj = jsonObj;
            console.log(innerObj);
            maximum_length = maximum_length < innerObj.total_length ? innerObj.total_length : maximum_length;
            innerObj.notes.forEach(v => {
              notes.push(v)
            })
          });
          setNotes(notes.sort((a, b) => a.start - b.start));
          setTotalLength(maximum_length);
          console.log(notes);
        }
    },[]);

    const audioPlayTest = (event) => {
      event.preventDefault();
      playtestButton.current.disabled = true;
      playtestButton.current.value = "Loading...";
      const playtestJson = {
        tempo: inputTempo,
        total_length: total_length,
        number_of_notes: notes.length,
        notes: notes
      };
      axios.post('/api/audio_playtest', JSON.stringify(playtestJson), {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        console.log("OK!!");
        console.log(res);
        // console.log(res.data);
        // let buffer = new ArrayBuffer(res.data.length);
        // let chars = new Uint8Array(buffer);
        // let dataView = new DataView(chars.buffer);
        // for (let i = 0; i < res.data.length; i++) {
        //     chars[i] = res.data.charCodeAt(i);
        // }
        
        // const blob = new Blob([chars], {type: 'application/octet-stream'})
        // const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = `http://192.249.18.201:443/api/audio/${res.data}`;
        a.download = 'playtest.wav';
        // a.target = '_blank'
        a.click()
        a.remove()
        // window.URL.revokeObjectURL(url);
        playtestButton.current.value = "PlayTest";
        playtestButton.current.disabled = false;
      }
      ).catch((res) => {
        alert("Playtest failed..");
        playtestButton.current.value = "PlayTest";
        playtestButton.current.disabled = false;
      })
    };

    const audioUpload = (event) => {
      event.preventDefault();
      uploadButton.current.disabled = true;
      uploadButton.current.value = "Uploading...";

      console.log(notes);

      const playtestJson = {
        author_id: userId,
        music_name: inputName,
        tempo: inputTempo,
        total_length: total_length,
        number_of_notes: notes.length,
        notes: notes
      };

      axios.post('/api/audio_upload', JSON.stringify(playtestJson), {
        headers: {
          "Content-Type": "application/json"
        }
      }).then((res) => {
        // console.log("OK!!");
        // console.log(res.data);
        alert("Upload success!!");
        uploadButton.current.value = "Upload";
        uploadButton.current.disabled = false;
      }
      ).catch((p) => {
        alert("Upload failed..");
        uploadButton.current.value = "Upload";
        uploadButton.current.disabled = false;
      })

      //제목 설정 팝업창 띄우기
      // return(
      //   <div>
      //   <h1>fix me to open popup</h1>
      //   <button onClick={togglePopup} value='false'>Open me</button>
      //   {showPopup?(
      //     <div>Success!!</div>
      //   ):null
      //   }
      //   </div>
      // );
    };
    
    const myPage=(event)=>{
        event.preventDefault();

        navigate('/music_list');
    }

    return (
        <div className='entire'>
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
          <h5>Name: </h5>
          <input className="inputInfo" type="text" onChange={(e)=>setInputName(e.target.value)}></input>
          </div>
          <div className='inputNT'>
          <h5>Tempo: </h5>
          <input className="inputInfo" type="number" onChange={(e)=>setInputTempo(e.target.valueAsNumber)}></input>
          </div>
          </div>


          <div className='inputNT'>
          
          <div className='inputNT'>
          <h5>Rhythm:  </h5>
          <select name="rhythm" id="rhythms" onChange={handleSelect2} value={Selected2}>
            <option>3/4</option>
            <option>4/4</option>
          </select>
          {/* <input type="submit" value="Submit" onClick={handleClick}></input> */}
          {/* <button onClick={audioPlayTest}>Playtest</button>
          <button onClick={audioUpload}>Upload</button> */}
          <input type="submit" value="PlayTest" onClick={audioPlayTest} ref={playtestButton}></input>
          <input type="submit" value="Upload" onClick={audioUpload} ref={uploadButton}></input>
          <input type="submit" value="My Page" onClick={myPage}></input>
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
      
        <div>
        {
            local.map(row=>{
              {/* TODO: add onClick to showNoteType. */}
                return (<div key={key++} className='divSheet'><div className='showNoteType'>{row.instrument}</div>
                <Sheet string={show_sheet(row)} id={`${sheet_id++}`}/></div>)
            })
        }
        </div>
        <input className='row-add' type="button" onClick={addRow}/>
      </div>
    </div>
    )
}

export default SongMakerGroup