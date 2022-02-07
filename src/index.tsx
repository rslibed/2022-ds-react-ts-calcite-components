import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

// Calcite Components
import "@esri/calcite-components/dist/calcite/calcite.css";
import "@esri/calcite-components/dist";
import { applyPolyfills } from "@esri/calcite-components/dist/loader";

import {
  setAssetPath,
  defineCustomElements
} from "@esri/calcite-components/dist/custom-elements";

(async function init() {
  setAssetPath(window.location.href);

  await applyPolyfills();
  defineCustomElements(window);

  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
})();
