import React, {useState, useEffect} from 'react'
import './SongMakerSelf.css'
const SongMakerSelf = (props) => {
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
    const [background, setBackground]=useState("#FFFFFFF")
    const [cells, setCells]=useState(Array(25*props.column).fill(''));

    //props로 column 수를 받아옴-> 업데이트 가능하게 추후 구현 필요
    const makeColumnfunction= (j)=> {
        const column = [];
        for (let i = 0; i < props.column; i++) {
            column.push(<Cell num={10*j+i}/>);
        };
        return column;
    };
    const makeRow=()=>{
        const row=[];
        for (let j=24;j>=0;j--){
            row.push(<tr>
                <h3 className='note_name'>C</h3>
                {makeColumnfunction(j)}
            </tr>);
        }
        return row;
    };

    const handleClick=(num)=>{
        let squares=[...cells];
        if(background=="#FFFFFFF"){
            squares[num]=colors[parseInt(num/10)%12]
            setBackground(squares[num])
        }else{
            squares[num]="#FFFFFFF"
            setBackground("#FFFFFFF")
        }
        // keyClassNAme=" clicked"
        setCells(squares)
        // alert(num);
    }

    const Cell=({num})=>{
        return <td 
        style={{
            background: cells[num], 
        }}
        onClick={()=>
            handleClick(num)}></td>
    }
  return (
    <div className='container' style={{background:"#FFFFFF"}}>
        <h1>HeadBar!!!</h1>
        <h1>Bar!!!</h1>
        
      <table>
        <tbody>
            {makeRow()}
        </tbody>
      </table>
      <h1>ToolBar!!!</h1>
      <h1>End!!!!</h1>
    </div>
  )
}

export default SongMakerSelf
