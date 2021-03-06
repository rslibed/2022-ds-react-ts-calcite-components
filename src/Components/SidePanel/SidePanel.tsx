import React from "react";

import "@esri/calcite-components/dist/components/calcite-shell-panel";
import { CalciteShellPanel } from "@esri/calcite-components-react";

import Feature from "../Feature/Feature";

interface SidePanelProps {
  view: __esri.MapView;
  layerId: string;
  handleOpenInfoModal: Function;
}

function SidePanel(props: SidePanelProps) {
  return (
    <CalciteShellPanel slot="primary-panel" position="start">
      <Feature view={props.view} layerId={props.layerId} handleOpenInfoModal={props.handleOpenInfoModal}/>
    </CalciteShellPanel>
  );
}

export default SidePanel;
