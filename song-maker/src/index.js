import { StrictMode } from "react";
import ReactDOM from "react-dom";
import Show from "./score/show"
import Test from "./test"

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <Show />
  </StrictMode>,
  rootElement
);