import  axios  from 'axios';
import React, {useState, useEffect} from 'react'
import './SongMakerSelf.css'


 //props로 column 수를 받아옴-> 업데이트 가능하게 추후 구현 필요*********
 //지금 짝수번 클릭시에만 색깔 칠해지게 구현됨***********
 //지금은 button 상관없이 입력하기만 하면 바로바로 업데이트 되고 있음*********
//10으로 적힌 부분들 props.column으로 바꿔주기

 const SongMakerSelf = (props) => {
    console.log("nodeLength: "+props.noteLength)
    console.log("node temp: "+props.tempo)
    console.log("note_type: "+props.note_type)
    console.log("rhythm: "+props.rhythm)

    const tempo=props.tempo;
    // let total_length=0;///수정하기*************
    const [total_length, setTotalLength]=useState(0);
    // let number_of_notes=0;
    const [number_of_notes, setNumberOfNotes]=useState(0);
    const rhythm=props.rhythm;
    let note_type=props.note_type ////input 받아줘야!!!!!
    // let notes=[] //클래스 생성 필요*************** ->noteClass
    // const [newNotes, setNewNotes]=useState({start: 0, length: 0, pitch:0, note_type: {note_type}});//{"start": 0, "length": 0, "pitch":0, "noteType": {note_type}}
    const [notes, setNotes]=useState([]);//이렇게 초기화하는 게 맞는 건지..****
    // let [inputValue,setInputValue]=useState('');
    

    // class noteClass{
    //     constructor(start, length, pitch, note_type){
    //         this.start=start;
    //         this.length=length;
    //         this.pitch=pitch;
    //         this.note_type=note_type;
    //     }
    // }
    
    // const note=["C5, "]
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
    const [background, setBackground]=useState("#FFFFFF");
    const [border, setBorder]=useState("#000000")
    const [cells, setCells]=useState(Array(25*props.column).fill('#FFFFFF'));
    const [cellsBorder, setCellsBorder]=useState(Array(25*props.column).fill("#000000"));
    
    const noteLength=props.noteLength;
    let noteLengthIsOne=true;
    let squares=[...cells];
    let squaresBorder=[...cellsBorder];

    // console.log("Init: squares : ", squares)
    // console.log("Init: borders: ", squaresBorder)

    //noteLength 1 여부 확인하기
    console.log("noteLength : "+noteLength)
    
    if (noteLength===1)noteLengthIsOne=true;
    else noteLengthIsOne=false;

    //table column, row 그려주기
    const makeColumn= (j)=> {
        const column = [];
        for (let i = 0; i < props.column; i++) {
            column.push(<Cell num={10*j+i} noteLength={noteLength}/>);
        };
        return column;
    };
    const makeRow=()=>{
        const row=[];
        for (let j=24;j>=0;j--){
            row.push(<tr>
                <h3 className='note_name'>C</h3>
                {makeColumn(j)}
            </tr>);
        }
        return row;
    };

    //note 길이 1일때 : 각 Cell에 ClickListener 설정하기
    const handleClick=(num)=>{
        console.log("note 길이 1인 handleClick!!!!!")
        setNumberOfNotes(prevNumber=>prevNumber+1)
        // number_of_notes+=1;
        console.log("HANDLECLICK", number_of_notes);
        // total_length+=1;
        
        // const {start,length, pitch, note_type }=newNotes

        // setNewNotes({///이게 맞는 건지..********
        //     ...newNotes,
        //     start: num%props.column,
        //     length: 1,
        //     pitch:parseInt(num/(props.column)),
        //     note_type: note_type
        // });
        
        const notee={//id 추가해야??
            start: num%props.column,
            length: 1,
            pitch:parseInt(num/(props.column)),
            note_type: note_type
        };
        console.log("notee : ",notee)
        // setNotes([...notes, notee]);
        setNotes(notes.concat(notee));
        
        console.log("###############################################")
        // console.log("notes 배열!!!!"+JSON.stringify(notes[1]))
        console.log("notes concat 배열 : ",notes.concat(notee));
        // setNewNotes({
        //     "start": 0,
        //     "length": 0, 
        //     "pitch":0, 
        //     "noteType": {note_type}
        // });

        //************* */
        // let creatNoteClass=noteClass(num%props.column, 1, parseInt(num/(props.column)),note_type);
        // notes.add

        if(squares[num]==="#FFFFFF"){//note 추가
            squares[num]=colors[parseInt(num/10)%12]
            setBackground(squares[num])
        }else{//note 제거
            squares[num]="#FFFFFF"
            setBackground(squares[num])
        }
        squaresBorder[num]="#000000"
        // console.log("Click: squares : ", squares)
        // console.log("NoClick: borders: ", squaresBorder)

        setCells(squares)
        setCellsBorder(squaresBorder)
        // alert(num);
    }
    //note 길이 2 이상일 때
    const handleLongClick=(num, noteLength)=>{
        console.log("note 길이 2 이상인 handleLongClick")
        setNumberOfNotes(prevNumber=>prevNumber+1)
        console.log("HANDLECLICK", number_of_notes);

        const notee={//id 추가해야??
            start: num%props.column,
            length: noteLength,
            pitch:parseInt(num/(props.column)),
            note_type: note_type
        };
        console.log("notee : ",notee)
        // setNotes([...notes, notee]);
        setNotes(notes.concat(notee));
        
        console.log("###############################################")
        // console.log("notes 배열!!!!"+JSON.stringify(notes[1]))
        console.log("notes concat 배열 : ",notes.concat(notee));

        // number_of_notes+=1;
        // setNumberOfNotes(prevNumber=>prevNumber+1)
        // total_length+=noteLength;
        //background 설정
        if(squares[num]==="#FFFFFF"){//note 추가
            console.log("if에 있어!!!!note 추가")
            let newColor=colors[parseInt(num/10)%12]
            squares[num]=newColor
            squaresBorder[num]=newColor
            setBackground(squares[num])
            setBorder(squaresBorder[num])

            // for(let i=0;i<noteLength;i++){
            //     squares[num+i]=newColor
            //     squaresBorder[num+i]=newColor
            //     setBackground(squares[num+i])
            //     setBorder(squaresBorder[num+i])
            // }
            // setBackground(squares[num])
            // setBorder(squaresBorder[num])
            // console.log("longNewClick: squares : ", squares)
            // console.log("longNewClick: borders: ", squaresBorder)

        }else{//note 제거
            console.log("else에 있어!!!!note 제거")
            // for(let i=0;i<noteLength;i++){
            //     squares[num+i]="#FFFFFF"
            //     squaresBorder[num+i]="#000000"
            //     setBackground(squares[num+i])
            //     setBorder(squaresBorder[num+i])
            // }
            // setBackground(squares[num])
            // setBorder(squaresBorder[num])
            // console.log("longNoClick: squares : ", squares)
            // console.log("longNoClick: borders: ", squaresBorder)
            squares[num]="#FFFFFF"
            squaresBorder[num]="#000000"
            setBackground(squares[num])
            setBorder(squaresBorder[num])
        }
        setCells(squares)
        setCellsBorder(squaresBorder)
        // alert(num);
    }

    const Cell=({num}, {noteLength})=>{
        if (noteLengthIsOne){//note 길이가 1일 경우
        return <td 
        style={{
            background: cells[num],
            border:'1px solid '+cellsBorder[num]
        }}
        onClick={()=>
            handleClick(num)}></td>
    }
    else{//note 길이가 1보다 길 경우
        return <td 
        style={{
            background: cells[num],
            border:'1px solid '+cellsBorder[num]
        }}
        onClick={()=>
            handleLongClick(num, noteLength)}></td>
    }
}
    const sortArray=()=>{
        console.log("$$$$$$$$$$$$$$$$$$$$$$$$$4")
        console.log("node num:",number_of_notes)
        console.log(notes)
        //notes 배열 정렬
        const startAscending=[...notes].sort((a,b)=>a.start-b.start);
        console.log("startAscending:  ",startAscending) ///확인하기!!!!!//pitch까지는 구현 못함...

        //total_length
        console.log("total_length!!!: ",startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length-1-startAscending[0].start+1);
        // total_length=startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length-1-startAscending[0].start+1;
        setTotalLength(startAscending[number_of_notes-1].start+startAscending[number_of_notes-1].length-1-startAscending[0].start+1);
        console.log("TotalLength: ",total_length);

        return startAscending
    }
    async function postData(e){
        e.preventDefault();

        const startAscending=sortArray();
        
        console.log("TotalLength: ",total_length);
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
    // async function postData(e){
    //     e.preventDefault();
    //     try{
    //         const response=await axios.post("http://localhost:3000/api/audio_playtest",JSON.stringify({sdf:"33"})
    //         , {
    //             headers: {"Content-Type": 'application/json'}
    //         });
    //         console.log(response)
    //     }catch(error){
    //         console.error(error);
    //     }
    // }

    // tempo: 12,
    // total_length: 12,
    // number_of_notes: number_of_notes,
    // rhythm:rhythm,
    // notes:[{start: 5, length: 1, pitch: 0, note_type: 'saw'}]
    
    // const postData=async(e)=>{
    //     //page reload 방지
    //     e.preventDefault();

        // axios({
        //     method: "post",
        //     url: "http://192.249.18.201:443/audio_playtest",
        //     responseType: "text",
            // data:{
            //         tempo: 12,
            //         total_length: 12,
            //         number_of_notes: number_of_notes,
            //         rhythm:rhythm,
            //         notes:[{start: 5, length: 1, pitch: 0, note_type: 'saw'}]
            //     }
        // }).then(function (response) {
        //     // response Action
            
        //     console.log(response)
        // });
        


        // try{
        //     const response=await axios.post('http://192.249.18.201:443/audio_playtest',JSON.stringify({
        //     tempo: 12,
        //     total_length: 12,
        //     number_of_notes: number_of_notes,
        //     rhythm:rhythm,
        //     notes:[{start: 5, length: 1, pitch: 0, note_type: 'saw'}]
        // }),{
        //     headers: {
        //         "Access-Control-Allow-Origin": ["http://localhost:3000", "http://192.249.18.201:443"]
        //     }
        // });
        // } catch(err){
        //     if(!err?.response){
        //         console.log(err)
        //     }
        // }

        // axios.post('http://192.249.18.201:443/audio_playtest',JSON.stringify({
        //     tempo: 12,
        //     total_length: 12,
        //     number_of_notes: number_of_notes,
        //     rhythm:rhythm,
        //     notes:[{start: 5, length: 1, pitch: 0, note_type: 'saw'}]
        // }),{
        //     headers: {
        //         "Access-Control-Allow-Origin": ["http://localhost:3000", "http://192.249.18.201:443"]
        //     },
        // }).then(res=>console.log('Posting Data', res))
        // .catch(err=>console.log(err))
    // }   
    


  return (
    <div className='container' style={{background:"#FFFFFF"}}>
      <table cellpadding="0" cellspacing="0">
        <tbody>
            {makeRow()}
        </tbody>
      </table>
      <button onClick={postData}>Test Sound</button>
      <h1>ToolBar!!!</h1>
      <h1>End!!!!</h1>
    </div>
  )
}


export default SongMakerSelf
