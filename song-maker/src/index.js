import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Show from "./score/show"
import AppSongMaker from "./SongMakerSelf/AppSongMaker"
import Test from "./FirstPage/show"
import Main from "./MainPage/main"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Main />
  </StrictMode>,
  rootElement
);