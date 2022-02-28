import React, { useEffect, useState } from "react";
import Collection from "@arcgis/core/core/Collection";
import FeatureWidget from "@arcgis/core/widgets/Feature";

interface FeatureProps {
  view: __esri.MapView;
}

function Feature(props: FeatureProps) {
  const featureWidget = new FeatureWidget();
  const { view } = props;

  const [fLayer, setFLayer] = useState<__esri.FeatureLayer>(null);
  const [fLayerView, setFLayerView] = useState<__esri.FeatureLayerView>(null);
  const [graphic, setGrahpics] = useState<__esri.Collection<__esri.Graphic>>(
    new Collection()
  );
  const [currentFeature, setCurrentFeature] = useState<__esri.Feature>();

  useEffect(() => {
    view?.when(async () => {
      const webmap = view?.map as __esri.WebMap;
      const loadedMap = await webmap?.loadAll();
      const fLayer = loadedMap.allLayers
        .filter((layer) => layer.type === "feature")
        .getItemAt(0) as __esri.FeatureLayer;
      setFLayer(fLayer);
    });
  }, [view]);

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

  useEffect(() => {
    const queryFeatures = async () => {
      if (!fLayerView) {
        return;
      }
      const features = await fLayerView.queryFeatures();
      console.log(features);
    };

    queryFeatures();
  }, [fLayerView]);

  return (
    <div>
      <span>{fLayer?.title}</span>
      {featureWidget?.render()}
    </div>
  );
}

export default Feature;
