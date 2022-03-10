import React from "react";
import ReactDOM from "react-dom";
import { setAssetPath } from "@esri/calcite-components/dist/components";
import App from "./App";

import "./index.scss";
import "@esri/calcite-components/dist/calcite/calcite.css";

setAssetPath(window.location.href);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
