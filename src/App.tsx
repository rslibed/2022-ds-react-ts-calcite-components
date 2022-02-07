import { useEffect, useState } from "react";

import Header from "./Components/Header/Header";
import View from "./Components/View/View";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

import applicationjSON from "../src/config/application.json";

import esriConfig from "@arcgis/core/config";

function App() {
  const { webmap, title, portalUrl } = applicationjSON;
  esriConfig.portalUrl = portalUrl;

  const [view, setView] = useState<__esri.MapView | undefined>(undefined);

  useEffect(() => {
    const map = new WebMap({
      portalItem: {
        id: webmap
      }
    });
    const mapView = new MapView({
      map
    });
    setView(mapView);
  }, []);

  return (
    <calcite-shell>
      <Header title={title} />
      <calcite-shell-panel slot="primary-panel">
        / ** Feature pop up content with calcite components ** /
      </calcite-shell-panel>
      <View view={view} />
    </calcite-shell>
  );
}

export default App;
