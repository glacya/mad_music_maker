import React, {useState} from 'react';
import './grid.css';

var key = 0;

const Piano = (props) => {
    const style = {
        width: `${20*props.column+1}px`,
        height: '301px',
        margin: '10px 10px 10px 10px',
        position: 'relative',
        
    };

    const [notes, setNotes] = useState([]);
    const [note_length, setNoteLength] = useState(1);
    // const [key, setKey] = useState(0);

    const onClick = (event) => {
        const x = Math.floor((event.nativeEvent.offsetX) / 20)
        const y = 24 - Math.floor((event.nativeEvent.offsetY) / 12)
        console.log(`${x}, ${y}`)
        // console.log(event)
        const note=(<Note color={'#FF0000'} width={`${20 * note_length}px`} marginLeft={`${x * 20+1}px`} marginTop={`${(24 - y) * 12+0.5}px`}/>)
        setNotes(notes.concat(note))
    };
    

    return (
        <div id="grid" className="grid" style={style} onClick={onClick}>
            {notes.map(note=>{
                // setKey(x=>x+1);
                return <div key={key++}>{note}</div>
            }
            )}
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