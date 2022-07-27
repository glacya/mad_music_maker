import  axios  from 'axios';
import React, {useState} from 'react';
import './grid.css';

var key = 0;

//delete 구현 필요***********
//key 확인!!!

const Piano = (props) => {
    const [column, setColumn]=useState(64);
    const length=props.noteLength;
    const tempo=props.tempo;
    const note_type=props.note_type; //두 번 전달 거침
    const rhythm=props.rhythm; //두 번 전달 거침
    let clicked=false;

    const [total_length, setTotalLength]=useState(0);
    const [number_of_notes, setNumberOfNotes]=useState(0);

    const [noteTag, setNoteTag]=useState([]);
    const [notes, setNotes] = useState([]);
    const [id, setId]=useState(0);

    // const [length, setNoteLength] = useState(1);
    // const [key, setKey] = useState(0);

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

    

    const onClick = (event) => {
        const x = Math.floor((event.nativeEvent.offsetX) / 20)
        const y = 24 - Math.floor((event.nativeEvent.offsetY) / 12)
        console.log(`${x}, ${y}`)

        if(clicked==false){
            //noteTag 배열에 추가
            setId(prevnum=>prevnum+1);
            const note=(<Note color={colors[parseInt(y)%12]} width={`${20 * length}px`} marginLeft={`${x * 20+0.5}px`} marginTop={`${(24 - y) * 12+0.5}px`}/>)
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

            setNumberOfNotes(prevNumber=>prevNumber+1);
        }
        else{
            //noteTag 배열에 삭제
            setNoteTag(noteTag.filter(user=>user.id!==id));
            //note 배열에 삭제
            setNotes(notes.filter(user=>user.id!==id));

            setNumberOfNotes(prevNumber=>prevNumber-1);
        }
        
        
    };
    
    const sortArray=()=>{
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$4")
        console.log("node num:",number_of_notes)
        console.log(notes)
        //notes 배열 정렬
        const startAscending=[...notes].sort((a,b)=>a.start-b.start);
        console.log("startAscending:  ",startAscending); ///확인하기!!!!!//pitch까지는 구현 못함...

        //total_length
        console.log("total_length!!!: ",startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length);
        // total_length=startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length-1-startAscending[0].start+1;
        setTotalLength(startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length-1-startAscending[0].start+1);
        console.log("TotalLength: ",total_length);

        return startAscending
    }

    async function playMusic(e){
        e.preventDefault();

        const startAscending=sortArray();
        
        console.log("TotalLength:!! ",total_length);
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
            console.log("RES")
            console.log(res)
        })
    
    }
    
    const addMusic=(e)=>{
        e.preventDefault();
        
        setColumn(column+16);
    }


    return (
        <div className='gridAndBtn'>
        {/* <button>Test Sound</button> */}
        <div id="grid" className="grid" style={style} onClick={onClick}>
            {noteTag.map(note=>{
                // setKey(x=>x+1);
                return <div key={key++}>{note}</div>
            }
            )}
        </div>
        {/* <input className='addNoteBtn' type="button" value={"+"}></input> */}
        <div className='clickBtn'>
        <input className='music-add' type="button" onClick={addMusic}/>
        <input className='img-button' type="button" onClick={playMusic}/>
        </div>
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