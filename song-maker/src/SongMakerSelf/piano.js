import  axios  from 'axios';
import React, {useState, useEffect} from 'react';
import { start } from 'tone';
import './grid.css';
import Sheet from '../score/sheet'
import {show_sheet} from '../score/parse'
import { useNavigate } from 'react-router';

var key = 0;


const Piano = (props) => {
    const userId = localStorage.getItem("id");
    const [column, setColumn]=useState(32);
    const length=props.noteLength;
    const tempo=props.tempo;
    const note_type=props.note_type; //두 번 전달 거침
    const rhythm=props.rhythm; //두 번 전달 거침
    const navigate = useNavigate();

    // var noteName=['C4', '', 'D4', '', 'E4', 'F4', '', 'G4', '', 'A4', '', 'B4',
    //     'C5', '', 'D5', '', 'E5', 'F5', '', 'G5', '', 'A5', '', 'B5',
    //     'C6']

    const [json,setJson] = useState(JSON.parse(JSON.stringify({
        "tempo": 130,
        "total_length": 20,
        "number_of_notes": 4,
        "rhythm" : "4/4",
        "notes": []
    })));

    const [total_length, setTotalLength]=useState(32);
    const [number_of_notes, setNumberOfNotes]=useState(0);

    const [noteTag, setNoteTag]=useState([]);//<Note/> 배열
    const [notes, setNotes] = useState([]); //post 요청 json파일 배열
    const [id, setId]=useState(0);

    const colors=[
        "#E33059",
        "#F75839",
        "#F7943D",
        "#F3B72F",
        "#EDD929",
        "#95C631",
        "#56A754",
        "#11826D",
        "#3160A3",
        "#5B37CC",
        "#A347BF",
        "#EA57B2",
    ];

    const style = {
        width: `${20*column+1}px`,
        height: '301px',
        margin: '10px 10px 10px 10px',
        position: 'relative',
        
    };

    

    const sortArray=(notes)=>{
        // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$")
        // console.log("node num:",number_of_notes)
        // console.log("notes in sortArray: ",notes);
        //notes 배열 정렬
        const startAscending=[...notes].sort((a,b)=>a.start-b.start);
        // console.log("startAscending:  ",startAscending); ///확인하기!!!!!//pitch까지는 구현 못함...
        // setNotes(startAscending);
        //total_length
        // console.log("total_length!!!: ",startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length);
        // total_length=startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length-1-startAscending[0].start+1;
        // setTotalLength(startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length-1-startAscending[0].start+1);
        // console.log("TotalLength: sortArray : ",total_length);

        return startAscending
    }

    // useEffect(()=>{
    //     console.log("note in useEffect!!", notes);
    //     sortArray(notes)
    // }, [notes]);


    const onClick = (event) => {
        const x = Math.floor((event.nativeEvent.offsetX) / 20)
        const y = 24 - Math.floor((event.nativeEvent.offsetY) / 12)
        // console.log(`${x}, ${y}`)

        
        
        //noteTag 배열에 추가
        setId(prevnum=>prevnum+1);
        const note=(<Note id={id} color={colors[parseInt(y)%12]} width={`${20 * length}px`} marginLeft={`${x * 20+0.5}px`} marginTop={`${(24 - y) * 12+0.5}px`}/>)
        setNoteTag(noteTag.concat(note))
        

    
        //note 배열에 추가
        const notee={//id 추가해야??
            id: id,
            start: x,
            length: length,
            pitch:y,
            note_type: note_type
        };
        setNotes(notes.concat(notee));
        
        // console.log("notes!!!!!!정렬 전!!", notes);

        const Array=sortArray(notes.concat(notee)); //회준오빠 : Array 사용하기!!!!
        

        // console.log("정렬 후!!!", notes);
        // console.log("Array!!!",Array);

        setJson((json)=>{
            return {...json, notes: Array}
        })
        
        setNumberOfNotes(prevNumber=>prevNumber+1);
    };

    const removeNotes=(id)=>{
        //noteTag 배열에 삭제
        setNoteTag(noteTag.filter(user=>user.props.id!==id));
        //note 배열에 삭제
        setNotes(notes.filter(user=>user.id!==id));
        var Array=sortArray(notes);
        Array = Array.filter(user=>user.id!==id);
        setJson((json)=>{
            return {...json, tempo: tempo, length: total_length, notes: Array}
        })
        setNumberOfNotes(prevNumber=>prevNumber-1);
    }
    
    

    async function playMusic(e){
        e.preventDefault();

        const startAscending=sortArray(notes);
        
        

        axios.post("/api/audio_playtest",JSON.stringify({
            tempo: tempo,
            total_length: total_length,
            number_of_notes: number_of_notes,
            rhythm:rhythm,
            notes:startAscending
        })
        , {
            headers: {"Content-Type": 'application/json'},
        }).then((res)=>{
            // console.log("RES")
            // console.log(res)

            // TODO: download here.

            // console.log(res.data);
        })
    
    }
    
    const addMusic=(e)=>{
        e.preventDefault();
        
        setColumn(column+16);
        setTotalLength(total_length+16);
    }

    const sendPost=(e)=>{
        // e.preventDefault();

        // axios.post("/api/temporary",JSON.parse(JSON.stringify({
        //     id: userId,
        //     instrm: note_type,
        //     value: show_sheet(json)
        // }))
        // , {
        //     headers: {"Content-Type": 'application/json'},
        // }).then((res)=>{
        //     console.log("RES")
        //     console.log(res)

        //     // console.log(res.data);
        // })
        
        let previousItem = localStorage.getItem(userId);
        previousItem = previousItem === null ? [] : JSON.parse(previousItem);
        
        // console.log(userId);

        localStorage.setItem(userId, JSON.stringify(previousItem.concat({
            instrument: note_type,
            tempo: tempo,
            total_length: total_length,
            number_of_notes: number_of_notes,
            rhythm: rhythm,
            notes: sortArray(notes)}
        )));

        // Navigate back to song_maker_group.
        navigate('/song_maker_group');
    }

    return (
        <div>
        <div className='gridAndBtn'>
            {/* <div className='noteName'>
            {noteName.map(note=>{
                return (<p className='singleNoteName'>{note}</p> )
            })

            }</div> */}
        <div id="grid" className="grid" style={style} onClick={onClick}>
            {noteTag.map(note=>{
                return <div key={key++} onClick={(event)=>{removeNotes(note.props.id); event.stopPropagation()}}>{note}</div>
            }
            )}
        </div>
        <div className='musicBtn'>
            <input className='send-post' type="button" onClick={sendPost}/>
        <input className='music-add' type="button" onClick={addMusic}/>
        {/* <input className='img-button' type="button" onClick={playMusic}/> */}
        
        </div>
        </div>
        <Sheet json = {json}/>
        </div>
    )
}

const Note = (props) => {
    const style = {
        width: props.width,
        height: '12px',
        backgroundColor: props.color,
        marginLeft: props.marginLeft,
        marginTop: props.marginTop,
        display: 'inline-block',
        position: 'absolute',
        border: '1px solid black'
    };

    return (
        <div key={++key} style={style}></div>
    )
}

export default Piano