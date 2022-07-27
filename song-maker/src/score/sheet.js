import { useState, useEffect } from "react";
import Preview from "./Preview";
import { show_sheet } from "./parse"
import "./styles.css";

export default function Sheet(props) {
  console.log("################# sheet.js #####################")

  console.log(props.json)
  
  
  //console.log(props.json.rhythm)
  

  //console.log("############ defaultValue : "+defaultValue);
  const [value, setValue] = useState("");
  
  const [isPlaying, setPlaying] = useState(false);
  
  console.log("########## SHEET value: " + value);

  useEffect(()=>{
    console.log("USE EFFECT ???????????????????");
    setValue(show_sheet(props.json))
  },[props])
  


  return (
    <div>
      <Preview value={value}/>
    </div>
  );
  //<Preview value={value}/>
}
