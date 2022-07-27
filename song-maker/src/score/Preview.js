import SheetMusic from "@slnsw/react-sheet-music";

export default function Preview({value}) {
  console.log("############## Preview.js")
  console.log("value: "+value)
  return(
    <div>
      <SheetMusic notation = {value} />
    </div>
  )
}
