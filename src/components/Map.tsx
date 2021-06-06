import * as React from "react";
import { useState } from "react";
import ReactMapGL, { Layer, Source } from "react-map-gl";
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
import { LayerProps } from "react-map-gl";

// @ts-ignore
mapboxgl.workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

function parsePolygon(polygons: string[] = []) {
  return polygons.map((v) => [
    v.split("_").map((set) => set.split(",").map(Number)),
  ]);
}

const layerStyleFill = {
  type: "fill" as LayerProps["type"],
  layout: {},
  paint: {
    "fill-color": "#008D9B",
    "fill-opacity": 0.1,
  },
};

const layerStyleLine = {
  type: "line" as LayerProps["type"],
  layout: {},
  paint: {
    "line-color": "#008D9B",
  },
};

function Map({ polygons }: { polygons?: string[] }) {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 37.5326,
    longitude: 127.024612,
    zoom: 10,
  });

  const coordinates = React.useMemo(() => {
    return parsePolygon(polygons);
  }, [polygons]);

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
    >
      <Source
        type="geojson"
        data={{
          type: "Feature",
          properties: {},
          geometry: {
            type: "MultiPolygon",
            coordinates,
          },
        }}
      >
        <Layer {...layerStyleFill} />
        <Layer {...layerStyleLine} />
      </Source>
    </ReactMapGL>
  );
}

export default Map;
