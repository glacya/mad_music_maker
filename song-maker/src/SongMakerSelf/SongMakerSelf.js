import React, {useState, useEffect} from 'react'
import './SongMakerSelf.css'


 //props로 column 수를 받아옴-> 업데이트 가능하게 추후 구현 필요*********
 //지금 짝수번 클릭시에만 색깔 칠해지게 구현됨***********
 //지금은 button 상관없이 입력하기만 하면 바로바로 업데이트 되고 있음*********
//10으로 적힌 부분들 props.column으로 바꿔주기

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
    const [background, setBackground]=useState("#FFFFFF");
    const [border, setBorder]=useState("#000000")
    const [cells, setCells]=useState(Array(25*props.column).fill('#FFFFFF'));
    const [cellsBorder, setCellsBorder]=useState(Array(25*props.column).fill("#000000"));
    
    const noteLength=props.noteLength;
    let noteLengthIsOne=true;
    let squares=[...cells];
    let squaresBorder=[...cellsBorder];

    console.log("Init: squares : ", squares)
    console.log("Init: borders: ", squaresBorder)

    //noteLength 1 여부 확인하기
    console.log(noteLength)
    
    if (noteLength==1)noteLengthIsOne=true;
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
        if(squares[num]=="#FFFFFF"){//note 추가
            squares[num]=colors[parseInt(num/10)%12]
            setBackground(squares[num])
        }else{//note 제거
            squares[num]="#FFFFFF"
            setBackground(squares[num])
        }
        squaresBorder[num]="#000000"
        console.log("Click: squares : ", squares)
        console.log("NoClick: borders: ", squaresBorder)

        setCells(squares)
        setCellsBorder(squaresBorder)
        // alert(num);
    }
    //note 길이 2 이상일 때
    const handleLongClick=(num, noteLength)=>{
        //background 설정
        if(squares[num]=="#FFFFFF"){//note 추가
            console.log("if에 있어!!!!")
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
            console.log("longNewClick: squares : ", squares)
            console.log("longNewClick: borders: ", squaresBorder)

        }else{//note 제거
            console.log("else에 있어!!!!")
            // for(let i=0;i<noteLength;i++){
            //     squares[num+i]="#FFFFFF"
            //     squaresBorder[num+i]="#000000"
            //     setBackground(squares[num+i])
            //     setBorder(squaresBorder[num+i])
            // }
            // setBackground(squares[num])
            // setBorder(squaresBorder[num])
            console.log("longNoClick: squares : ", squares)
            console.log("longNoClick: borders: ", squaresBorder)
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
    


  return (
    <div className='container' style={{background:"#FFFFFF"}}>
      <table cellpadding="0" cellspacing="0">
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
