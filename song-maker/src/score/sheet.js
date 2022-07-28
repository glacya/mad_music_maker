import { useState, useEffect } from "react";
import { show_sheet } from "./parse"
import "./styles.css";
import SheetMusic from "@slnsw/react-sheet-music";

export default function Sheet(props) {
  // console.log("################# sheet.js #####################")

  // console.log(props.json)
  
  
  //console.log(props.json.rhythm)
  

  //console.log("############ defaultValue : "+defaultValue);
  const [value, setValue] = useState("");
  
  const [isPlaying, setPlaying] = useState(false);
  
  // console.log("########## SHEET value: " + value);

  useEffect(()=>{
    // console.log("############################## USE EFFECT ###############################");
    // console.log(props.json)
    setValue(show_sheet(props.json))
  },[props])
  


  return (
    <div>
      <SheetMusic notation = {value} />
    </div>
  );
  //<Preview value={value}/>
}
