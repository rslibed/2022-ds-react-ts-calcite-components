import React, { useEffect, useState, useRef } from "react";
import FeatureWidget from "@arcgis/core/widgets/Feature";
import { whenFalseOnce, whenFalse } from "@arcgis/core/core/watchUtils";
import Handles from "@arcgis/core/core/Handles";

import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-loader";

import {
  CalcitePanel,
  CalciteAction,
  CalciteLoader
} from "@esri/calcite-components-react";

interface FeatureProps {
  view: __esri.MapView;
  layerId: string;
}

function Feature(props: FeatureProps) {
  const { view } = props;
  const handles = new Handles();
  const featureWidgetRef = useRef(null);

  const [fLayer, setFLayer] = useState<__esri.FeatureLayer>(null);
  const [fLayerView, setFLayerView] = useState<__esri.FeatureLayerView>(null);

  const [graphics, setGraphics] = useState<__esri.Graphic[]>(null);
  const [currentGraphic, setCurrentGraphic] = useState<__esri.Graphic>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(null);
  const [featureWidget, setFeatureWidget] = useState<__esri.Feature>(null);
  const [highlightedFeature, setHighlightedFeature] =
    useState<__esri.Handle>(null);
  const [viewClickListener, setViewClickListener] = useState(null);

  const handleHitTest = async e => {
    if (!graphics) {
      return;
    }

    const hitTestRes = await view.hitTest(e);
    const result = hitTestRes?.results?.[0];
    const graphic = result.graphic;
    const fLayer = graphic.layer as __esri.FeatureLayer;
    const oidField = fLayer.objectIdField;
    const oid = graphic.attributes[oidField];
    const graphicToUse = graphics.filter(
      graphic => graphic.attributes[oidField] === oid
    )[0];
    const index = graphics.indexOf(graphicToUse);
    setCurrentIndex(index);
    setCurrentGraphic(graphicToUse);
  };

  // SET FEATURE LAYER
  useEffect(() => {
    if (!view?.ready) {
      return;
    }

    view?.when(async () => {
      const webmap = view?.map as __esri.WebMap;
      const loadedMap = await webmap?.loadAll();
      const fLayer = loadedMap.allLayers.find(
        layer => layer.id === props.layerId
      ) as __esri.FeatureLayer;
      const loadedFlayer = await fLayer.load();
      fLayer.popupEnabled = false;
      setFLayer(loadedFlayer);
    });
  }, [view?.ready]);

  // SET FEATURE LAYER VIEW
  useEffect(() => {
    const loadLayerView = async () => {
      if (!view) {
        return;
      }

      const fLayerViewRes = await view.whenLayerView(fLayer);
      setFLayerView(fLayerViewRes);
    };

    loadLayerView();
  }, [fLayer]);

  // SET GRAPHICS
  useEffect(() => {
    if (!fLayerView) {
      return;
    }

    const queryFeatures = async () => {
      const queryRes = await fLayerView.queryFeatures({
        geometry: view.extent,
        returnGeometry: true
      });

      setGraphics(queryRes.features);
    };

    handles.add([
      whenFalseOnce(fLayerView, "updating", () => {
        queryFeatures();
      }),
      whenFalse(view, "interacting", () => {
        queryFeatures();
      })
    ]);
  }, [fLayerView, view]);

  // RE-SET GRAPHIC ON EXTENT CHANGE
  useEffect(() => {
    if (graphics?.length > 0) {
      const index = 0;
      setCurrentGraphic(graphics[index]);
      setCurrentIndex(index);
    }

    if (view) {
      if (viewClickListener) {
        viewClickListener.remove();
      }
      const updatedViewClickListener = view.on("click", e => handleHitTest(e));
      setViewClickListener(updatedViewClickListener);
    }
  }, [graphics]);

  // SET FEATURE WIDGET
  useEffect(() => {
    const container = featureWidgetRef?.current;
    if (container && view && currentGraphic) {
      if (!featureWidget) {
        setFeatureWidget(
          new FeatureWidget({
            view,
            container,
            graphic: currentGraphic
          })
        );
      } else {
        featureWidget.graphic = currentGraphic;
      }
    }
  }, [featureWidgetRef?.current, currentGraphic]);

  const updateFeature = (type: string) => {
    const lastIndex = graphics.length - 1;
    let updatedIndex = null;
    if (type === "previous") {
      if (currentIndex === 0) {
        updatedIndex = lastIndex;
      } else {
        updatedIndex = currentIndex - 1;
      }
    } else {
      if (currentIndex === lastIndex) {
        updatedIndex = 0;
      } else {
        updatedIndex = currentIndex + 1;
      }
    }
    setCurrentIndex(updatedIndex);
  };

  // SET GRAPHIC BASED ON INDEX
  useEffect(() => {
    const graphic = graphics?.[currentIndex];
    if (graphic) {
      setCurrentGraphic(graphic);
    }
  }, [currentIndex]);

  // SET HIGHLIGHT BASED ON CURRENT GRAPHIC
  useEffect(() => {
    if (fLayerView && currentGraphic) {
      if (highlightedFeature) {
        highlightedFeature.remove();
      }
      setHighlightedFeature(fLayerView.highlight(currentGraphic));
    }
  }, [fLayerView, currentGraphic]);

  return graphics?.length > 0 && currentGraphic ? (
    <CalcitePanel className="feature-panel">
      <div className="heading" slot="header-content">
        <h2>Feature: {`${currentIndex + 1} / ${graphics?.length}`}</h2>
      </div>
      <CalciteAction
        onClick={() => {
          updateFeature("previous");
        }}
        text="Previous feature"
        label="Previous feature"
        slot="header-actions-start"
        icon="chevron-left"
        appearance="solid"
        scale="m"
      ></CalciteAction>
      <CalciteAction
        onClick={() => {
          updateFeature("next");
        }}
        text="Next feature"
        label="Next feature"
        slot="header-actions-end"
        icon="chevron-right"
        appearance="solid"
        scale="m"
      ></CalciteAction>
      <div className="feature-content-container">
        <div ref={featureWidgetRef} />
      </div>
    </CalcitePanel>
  ) : (
    <CalciteLoader label="Loading..." active />
  );
}

export default Feature;
