import React from "react";

import "@esri/calcite-components/dist/components/calcite-shell-panel";
import { CalciteShellPanel } from "@esri/calcite-components-react";

import Feature from "../Feature/Feature";

interface SidePanelProps {
  view: __esri.MapView;
}

function SidePanel(props: SidePanelProps) {
  return (
    <CalciteShellPanel slot="primary-panel" position="start">
      <Feature view={props.view} />
    </CalciteShellPanel>
  );
}

export default SidePanel;
