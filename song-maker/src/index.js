import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Show from "./score/show"
import Test from "./test"
import AppSongMaker from "./SongMakerSelf/AppSongMaker"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <AppSongMaker />
  </StrictMode>,
  rootElement
);