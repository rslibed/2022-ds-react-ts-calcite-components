import React from "react";

import { CalciteAction, CalciteActionGroup, CalciteActionPad } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-action-pad";
import "@esri/calcite-components/dist/components/calcite-action-group";
import "@esri/calcite-components/dist/components/calcite-action";

import "./ControlPanel.scss";

interface ControlPanelProps {
  handleInformation: () => void;
  handlePrevious: () => void;
  handleNext: () => void;
}

function ControlPanel({ handleInformation, handlePrevious, handleNext }: ControlPanelProps) {
  return (
    <CalciteActionPad expandDisabled layout="horizontal">
      <CalciteActionGroup layout="horizontal">
        <CalciteAction
          text="information"
          label="Information"
          icon="information"
          scale="s"
          onClick={handleInformation}
        />
      </CalciteActionGroup>
      <CalciteActionGroup layout="horizontal">
        <CalciteAction
          onClick={handlePrevious}
          text="Previous feature"
          label="Previous feature"
          icon="chevron-left"
          appearance="solid"
          scale="s"
        ></CalciteAction>
        <CalciteAction
          onClick={handleNext}
          text="Next feature"
          label="Next feature"
          icon="chevron-right"
          appearance="solid"
          scale="s"
        ></CalciteAction>
      </CalciteActionGroup>
    </CalciteActionPad>
  );
}

export default ControlPanel;
