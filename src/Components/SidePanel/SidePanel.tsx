import React from "react";

import "@esri/calcite-components/dist/components/calcite-shell-panel";
import { CalciteShellPanel } from "@esri/calcite-components-react";

interface SidePanelProps {
  view: __esri.MapView;
}

function SidePanel(props: SidePanelProps) {
  return (
    <CalciteShellPanel slot="primary-panel" position="start">
      Component
    </CalciteShellPanel>
  );
}

export default SidePanel;
