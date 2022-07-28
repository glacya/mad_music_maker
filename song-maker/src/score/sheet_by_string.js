import { useState, useEffect } from "react";
import "./styles.css";
import SheetMusic from "@slnsw/react-sheet-music";

export default function Sheet(props) {
  console.log("################# sheet.js #####################")

  console.log(props.string)
  
  
  //console.log(props.json.rhythm)
  
  //console.log("############ defaultValue : "+defaultValue);
  const [value, setValue] = useState("");
  
  const [isPlaying, setPlaying] = useState(false);
  
  console.log("########## SHEET value: " + value);

  useEffect(()=>{
    console.log("############################## USE EFFECT ###############################");
    console.log(props.string)
    setValue(props.string)
  },[props])
  
  return (
    <div>
      <SheetMusic notation = {value} id = {props.id}/> 
    </div>
  );

}