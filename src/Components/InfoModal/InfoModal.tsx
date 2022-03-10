import React, { useEffect, useRef } from "react";

import { CalciteButton, CalciteModal } from "@esri/calcite-components-react";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-modal";

interface InfoModalProps {
  active: boolean;
  handleOpenInfoModal: () => void;
}

function InfoModal({ active, handleOpenInfoModal }: InfoModalProps) {
  const calciteModal = useRef<HTMLCalciteModalElement>(null);

  useEffect(() => {
    calciteModal.current.active = active;
  }, [active])

  return (
    <CalciteModal ref={calciteModal} aria-labelledby="modal-title" onCalciteModalClose={handleOpenInfoModal}>
      <div slot="header" id="modal-title">
        Information
      </div>
      <div slot="content">
        Modal content lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </div>
      <CalciteButton onClick={() => (calciteModal.current.active = false)} slot="primary" width="full">
        Close
      </CalciteButton>
    </CalciteModal>
  );
}

export default InfoModal;
