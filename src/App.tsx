import React, { useEffect, useState } from "react";
import "./App.scss";

import Header from "./Components/Header/Header";
import View from "./Components/View/View";
import SidePanel from "./Components/SidePanel/SidePanel";

import WebMap from "@arcgis/core/WebMap";
import MapView from "@arcgis/core/views/MapView";

import applicationJSON from "../src/config/application.json";

import esriConfig from "@arcgis/core/config";

import "@esri/calcite-components/dist/components/calcite-scrim";
import "@esri/calcite-components/dist/components/calcite-shell";
import { CalciteScrim, CalciteShell } from "@esri/calcite-components-react";

import InfoModal from "./Components/InfoModal/InfoModal";

function App() {
  const { webmap, portalUrl, layerId } = applicationJSON;
  esriConfig.portalUrl = portalUrl;

  const [view, setView] = useState(null);
  const [mapTitle, setMapTitle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

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

    mapView.when().then((view) => {
      setMapTitle(view.map.portalItem.title);
      setLoading(false);
    });
  }, []);

  function handleOpenInfoModal(): void {
    setOpenInfoModal(!openInfoModal);
  }

  return (
    <>
      {loading ? <CalciteScrim key="scrim" loading /> : null}
      {/* <InfoModal handleOpenInfoModal={() => handleOpenInfoModal()} active={openInfoModal} /> */}
      <CalciteShell key="shell">
        <Header title={loading ? "Loading..." : mapTitle} />
        <SidePanel view={view} layerId={layerId} handleOpenInfoModal={handleOpenInfoModal}/>
        <View view={view} />
      </CalciteShell>
    </>
  );
}

export default App;
