import React, { useEffect, useRef } from "react";

import "./View.scss";

interface ViewProps {
  view: __esri.MapView;
}

function View({ view }: ViewProps) {
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (view && viewRef?.current) {
      view.container = viewRef.current;
    }
  }, [view]);

  // Add Note
  // useEffect(() => {
  //   if (view) {
  //     const noteId = "ds-note";
  //     let note = view.ui.find(noteId) as HTMLElement;
  //     if (!note) {
  //       note = document.createElement("div");
  //       note.id = noteId;
  //       note.innerHTML = `<h1>Dev Summit</h1><img src="https://logos-download.com/wp-content/uploads/2016/11/ESRI_logo_logotype.png" />`;
  //       note.tabIndex = 0;
  //       view.ui.add(note, "bottom-left");
  //     }
  //   }
  // }, [view]);

  return <div ref={viewRef} id="viewDiv" />;
}

export default View;
