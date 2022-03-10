import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// STEP 1: Import styles and set asset path
// import "./index.scss";
// import { setAssetPath } from "@esri/calcite-components/dist/components";
// setAssetPath(window.location.href);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
